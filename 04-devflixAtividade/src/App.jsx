import { useCallback, useEffect, useState } from "react";
import "./App.css";

import logoLight from "./assets/ljflix.png";
import logoDark from "./assets/ljflix_dark.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

const TEXTS = {
  en: { 
    menuTitle: "Options", 
    languageLabel: "Language", 
    themeLabel: "Theme", 
    searchPlaceholder: "Search for movies and series...", 
    langOpts: { en: "English", pt: "Portuguese", es: "Spanish" }, 
    themeOpts: { light: "Light", dark: "Dark" } 
  },
  pt: { 
    menuTitle: "Opções", 
    languageLabel: "Idioma", 
    themeLabel: "Tema", 
    searchPlaceholder: "Pesquise por filmes e séries...", 
    langOpts: { en: "Inglês", pt: "Português", es: "Espanhol" }, 
    themeOpts: { light: "Claro", dark: "Escuro" } 
  },
  es: { 
    menuTitle: "Opciones", 
    languageLabel: "Idioma", 
    themeLabel: "Tema", 
    searchPlaceholder: "Busca películas y series...", 
    langOpts: { en: "Inglés", pt: "Portugués", es: "Español" }, 
    themeOpts: { light: "Claro", dark: "Oscuro" } 
  }
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  
  const saved = JSON.parse(localStorage.getItem("ljflix.prefs") || '{"language":"pt","theme":"dark"}');
  const [language, setLanguage] = useState(saved.language);
  const [isLight, setIsLight] = useState(saved.theme === "light");
  const theme = isLight ? "light" : "dark";

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = useCallback(async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //Alimentando a variavel movies
    setMovies(data.Search);
  }, [apiUrl]);

  // Carregamento inicial dos filmes
  useEffect(() => {
    const loadInitialMovies = async () => {
      const response = await fetch(`${apiUrl}&s=Spider-Man`);
      const data = await response.json();
      setMovies(data.Search);
    };
    loadInitialMovies();
  }, [apiUrl]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ljflix.prefs", JSON.stringify({ language, theme }));
  }, [isLight, language, theme]);

  const logo = isLight ? logoLight : logoDark;
  const t = TEXTS[language];

  return (
    <div id="App">
      <ThemeToggle
        title={t.menuTitle}
        languageLabel={t.languageLabel}
        themeLabel={t.themeLabel}
        language={language}
        theme={theme}
        languageOptions={t.langOpts}
        themeOptions={t.themeOpts}
        onChangeLanguage={setLanguage}
        onChangeTheme={(value) => setIsLight(value === "light")}
      />

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming LJFLIX."
      />

      <div className="search">
        <input onKeyDown={(e) => e.key === "Enter" && searchMovies(search)} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={t.searchPlaceholder} />
        <img onClick={() => searchMovies(search)} src={lupa} alt="Botão pesquisar!" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} language={language}/>
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link="https://github.com/Luan-Galera">Luan-Galera</Rodape>
    </div>
  );
};

export default App;