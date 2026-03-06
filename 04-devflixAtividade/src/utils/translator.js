const translationCache = new Map();

export const translateAutoText = async (text, targetLanguage = "pt") => {
  if (!text || text === "N/A") return text;

  const cacheKey = `${targetLanguage}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    const data = await response.json();

    const translated = Array.isArray(data?.[0])
      ? data[0].map((chunk) => chunk?.[0] || "").join("")
      : text;

    const result = translated || text;
    translationCache.set(cacheKey, result);
    return result;
  } catch {
    return text;
  }
};
