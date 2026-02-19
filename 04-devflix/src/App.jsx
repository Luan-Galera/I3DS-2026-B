import "./App.css";

import logo from "./assets/devflix.png";
import lupa from "./assets/search.svg";
import Rodape from "./components/Rodape/Rodape";

const App = () => {
  return (
    <div id="App">
      <img
        id="logo"
        src={logo}
        alt="Logotipo do serviço de streaming DEVFLIX em fundo preto com letras vermelhas, destaque na plataforma de entretenimento digital."
      />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes e séries..." />
        <img src={lupa} alt="Botão pesquisar!" />
      </div>

      <Rodape link="https://github.com/Luan-Galera">Luan-Galera</Rodape>
    </div>
  );
};

export default App;
