const STORAGE_KEY = "devflix.translation.cache.v2";
const MAX_CHUNK_LENGTH = 450;

const memoryCache = new Map();

const readPersistentCache = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const entries = JSON.parse(raw);
    if (!Array.isArray(entries)) return;
    entries.forEach(([key, value]) => {
      if (typeof key === "string" && typeof value === "string") {
        memoryCache.set(key, value);
      }
    });
  } catch {
    // Fallback silently if localStorage is unavailable.
  }
};

const writePersistentCache = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(memoryCache.entries())));
  } catch {
    // Ignore storage write errors.
  }
};

readPersistentCache();

const splitInChunks = (text) => {
  if (text.length <= MAX_CHUNK_LENGTH) return [text];

  const chunks = [];
  let current = "";
  const parts = text.split(/(?<=[.!?])\s+/);

  parts.forEach((part) => {
    const candidate = current ? `${current} ${part}` : part;
    if (candidate.length <= MAX_CHUNK_LENGTH) {
      current = candidate;
      return;
    }

    if (current) {
      chunks.push(current);
    }

    if (part.length <= MAX_CHUNK_LENGTH) {
      current = part;
      return;
    }

    for (let i = 0; i < part.length; i += MAX_CHUNK_LENGTH) {
      chunks.push(part.slice(i, i + MAX_CHUNK_LENGTH));
    }
    current = "";
  });

  if (current) {
    chunks.push(current);
  }

  return chunks.length > 0 ? chunks : [text];
};

const requestTranslation = async (text, targetLanguage) => {
  const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(endpoint);
  const data = await response.json();

  if (!Array.isArray(data?.[0])) {
    return text;
  }

  const translated = data[0].map((chunk) => chunk?.[0] || "").join("");
  return (translated || text).normalize("NFC");
};

export const translateAutoText = async (text, targetLanguage = "pt") => {
  if (!text || text === "N/A" || targetLanguage === "en") return text;

  const cacheKey = `${targetLanguage}:${text}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  try {
    const chunks = splitInChunks(text);
    const translatedChunks = await Promise.all(
      chunks.map((chunk) => requestTranslation(chunk, targetLanguage)),
    );

    const result = translatedChunks.join(" ").replace(/\s+/g, " ").trim() || text;
    memoryCache.set(cacheKey, result);
    writePersistentCache();
    return result;
  } catch {
    return text;
  }
};

export const translateBatch = async (texts, targetLanguage = "pt") => {
  const tasks = texts.map((text) => translateAutoText(text, targetLanguage));
  return Promise.all(tasks);
};
