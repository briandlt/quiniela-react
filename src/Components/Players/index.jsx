import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import images from '../../assets/imagesPlayers.js';
import { Table, Container } from 'react-bootstrap';

const Players = () => {
  const [totalHits, setTotalHits] = useState([]);

  const fetchData = async () => {
    const response = await fetch('http://localhost/api-quiniela/aciertosTotales');
    const data = await response.json();
    setTotalHits(data)
  }

  function capitalizeString(string) {
    return string.split(" ").map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container fluid="md" className='p-0 my-4'>
      <Table striped bordered hover responsive="sm" variant="dark" className='mt-3'>
        <thead>
          <tr>
            <th></th>
            <th>Participantes</th>
            <th>Aciertos Totales</th>
          </tr>
        </thead>
        <tbody>
          {totalHits.map(player => (
            <tr key={player.idParticipante}>
              <td><img src={images[player.userName]} alt=""/></td>
              <td>{capitalizeString(`${player.nombre} ${player.apellido}`)}</td>
              <td>{ player.aciertosTotales }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Players;