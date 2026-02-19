import React from 'react'
import "./Rodape.module.css"

const Rodape = ({ children }) => {
  return (
    <footer>
      <p>Feito com 🤍 por <a href="https://github.com/Luan-Galera">{children}</a></p>
    </footer>
  )
}

export default Rodape
