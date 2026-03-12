import { Route, Routes } from "react-router";
import "./App.css";

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Header from "./components/header/Header";

function App() {


  return (
    <>
    <Header />
     <Routes> {/* Identifica todas as rotas do sistema */}
      <Route path="/"  element={<Home />}/>
      <Route path="/sobre" element={<Sobre />} /> {/* uma rota do sistema */}
     </Routes>
    </>
  );
}

export default App;
