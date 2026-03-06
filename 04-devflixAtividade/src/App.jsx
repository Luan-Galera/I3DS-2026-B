import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/ljflix.png";
import lupa from "./assets/search.svg";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [translateEnabled, setTranslateEnabled] = useState(false);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spider-Man"); // termo para pesquisa ao carregar o site
  }, []);

  return (
    <div id="App">
      <button
        className={`translateToggle ${translateEnabled ? "flagPt" : "flagEn"}`}
        onClick={() => setTranslateEnabled((prev) => !prev)}
        title={translateEnabled ? "Idioma exibido: Português (Brasil)" : "Idioma exibido: English"}
        aria-label={translateEnabled ? "Idioma exibido: Português (Brasil)" : "Idioma exibido: English"}
      />

      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming DEVFLIX em fundo preto com letras vermelhas, destaque na plataforma de entretenimento digital."
      />

      <div className="search">
        <input onKeyDown={(e) => e.key === "Enter" && searchMovies(search)} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Pesquise por filmes e séries..." />
        <img onClick={() => searchMovies(search)} src={lupa} alt="Botão pesquisar!" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} translateEnabled={translateEnabled}/>
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
