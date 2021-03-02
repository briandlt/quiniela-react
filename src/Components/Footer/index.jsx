import React from 'react'
import "./style.css";
// import {Section} from 'react-bootstrap'

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <b>©{ date.getFullYear() } Derechos reservados - Brian Esparza</b>
    </footer>
  )
}

export default Footer