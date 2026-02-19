import { useEffect, useState } from "react";
import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";

const App = () => {
  const [movies, setMovies] = useState([]);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json;

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div id="App">
      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming DEVFLIX em fundo preto com letras vermelhas, destaque na plataforma de entretenimento digital."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries..." />
        <img src={lupa} alt="Botão pesquisar!" />
      </div>

      <div className="container">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie}></MovieCard>
        ))}
      </div>

      <Rodape link="https://github.com/Luan-Galera">Luan-Galera</Rodape>
    </div>
  );
};

export default App;
