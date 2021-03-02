import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import useGetCorrectResults from '../../Hooks/useGetCorrectResults'
import imagesPlayers from '../../assets/imagesPlayers.js';
import imagesTeams from '../../assets/imagesTeams.js';
import { Table, Container, Form } from 'react-bootstrap';
import SessionContext from "../../Context/SessionContext";


const Results = () => {
  const BASE_URL = 'http://localhost/api-quiniela'
  const { session } = useContext(SessionContext)
  const [results, setResults] = useState([])
  const [numberDate, setNumberDate] = useState(1)
  const { correctResults } = useGetCorrectResults(numberDate)
  const [journey, setJourney] = useState([])
  const totalJourneys = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

  const fetchJourney = async () => {
    const response = await fetch(`${BASE_URL}/jornadas/jornadaActual`)
    const data = await response.json();
    setNumberDate(Object.values(data)[0])
  }

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/resultados/all/${numberDate}/${session ? session.idParticipante : session}`)
    const data = await response.json();
    setResults(data)
    const res = await fetch(`${BASE_URL}/jornadas/jornadaId/${numberDate}`)
    const info = await res.json();
    setJourney(Object.values(info).map((item, index) => (item.indexOf(' ') > -1 && index > 0 && index < 19) ? item.replace(' ', '') : item))
  }

  const handleChange = async (e) => {
    setNumberDate(e.target.value)
  }

  const checkAcerts = (score, correctScore) => {
    if (score === correctScore) {
      return 'doubleAcert'
    } else if (score[0] === correctScore[0]) {
      return 'singleAcert'
    }
    return ''
  }
  
  useEffect(() => {
    fetchJourney()
  }, [])

  useEffect(() => {
    fetchData()
  }, [numberDate])

  return (
      <Container fluid="md" className='p-0 my-5'>
        <div className="col-12 text-center mb-2 mt-4 row justify-content-center">
          <Form.Control as="select" className='mb-2' custom id="jornada" value={numberDate} onChange={handleChange}>
            {totalJourneys.map(j => (
              <option key={j} value={j}>Jornada {j}</option>
            ))}
          </Form.Control>
        </div>
        <Table striped bordered hover responsive="sm" variant="dark">
          <thead>
            <tr>
              <th></th>
              <th>
                <img src={imagesTeams[journey[1]]} alt="" />
                vs
                <img src={imagesTeams[journey[2]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[3]]} alt="" />
                vs
                <img src={imagesTeams[journey[4]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[5]]} alt="" />
                vs
                <img src={imagesTeams[journey[6]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[7]]} alt="" />
                vs
                <img src={imagesTeams[journey[8]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[9]]} alt="" />
                vs
                <img src={imagesTeams[journey[10]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[11]]} alt="" />
                vs
                <img src={imagesTeams[journey[12]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[13]]} alt="" />
                vs
                <img src={imagesTeams[journey[14]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[15]]} alt="" />
                vs
                <img src={imagesTeams[journey[16]]} alt="" />
              </th>
              <th>
                <img src={imagesTeams[journey[17]]} alt="" />
                vs
                <img src={imagesTeams[journey[18]]} alt="" />
              </th>
            </tr>
          </thead>
          <tbody>
          {results.length
            ? results.map(result => (
              <tr key={result.idResultado}>
                <td><img src={imagesPlayers[result.userName]} alt="" /></td>
                <td className={checkAcerts(result.j1, correctResults.j1)}>{result.j1.substring(1)}</td>
                <td className={checkAcerts(result.j2, correctResults.j2)}>{result.j2.substring(1)}</td>
                <td className={checkAcerts(result.j3, correctResults.j3)}>{result.j3.substring(1)}</td>
                <td className={checkAcerts(result.j4, correctResults.j4)}>{result.j4.substring(1)}</td>
                <td className={checkAcerts(result.j5, correctResults.j5)}>{result.j5.substring(1)}</td>
                <td className={checkAcerts(result.j6, correctResults.j6)}>{result.j6.substring(1)}</td>
                <td className={checkAcerts(result.j7, correctResults.j7)}>{result.j7.substring(1)}</td>
                <td className={checkAcerts(result.j8, correctResults.j8)}>{result.j8.substring(1)}</td>
                <td className={checkAcerts(result.j9, correctResults.j9)}>{result.j9.substring(1)}</td>
              </tr>
            ))
            : <tr>
              <td colSpan='10' className='text-center withoutResult'>No se encontraron resultados</td>
            </tr>
          }
          </tbody>
        </Table>
      </Container>
  )
}

export default Results;
