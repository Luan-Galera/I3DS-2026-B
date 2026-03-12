import { Route, Routes } from "react-router";
import "./App.css";

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Contato from "./pages/Contato";
import NãoEncontrado from "./pages/NãoEncontrado";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="containerApp">
      <Routes>
        {/* Identifica todas as rotas do sistema */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} /> {/* uma rota do sistema */}
        <Route path="/contato" element={<Contato />} />
        <Route path="/naoencontrado" element={<NãoEncontrado />} />
      </Routes>
      </div>

      <Footer link={"https://github.com/Luan-Galera"}>Luan-Galera</Footer>
    </>
  );
}

export default App;
