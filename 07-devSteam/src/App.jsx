import Header from './components/Header/Header'
import PromoCard from './components/PromoCard/PromoCard'
import OutrosJogosCard from './components/OutrosJogosCard/OutrosJogosCard'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      
      <h2 className='promoText'>Promoções</h2>
      <PromoCard/>
      
      <h2 className='outrosJogosText'>Outros Jogos</h2>
      <OutrosJogosCard/>
    </>
  )
}

export default App
