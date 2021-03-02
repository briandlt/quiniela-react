import React, { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import imagesTeams from '../../assets/imagesTeams'
import { onlyNumbers, allRequired, validationContainer } from '../../helpers/validate'
import SessionContext from "../../Context/SessionContext";

const FormQuiniela = () => {
  const journey = {
    j1L: '',
    j1V: '',
    j2L: '',
    j2V: '',
    j3L: '',
    j3V: '',
    j4L: '',
    j4V: '',
    j5L: '',
    j5V: '',
    j6L: '',
    j6V: '',
    j7L: '',
    j7V: '',
    j8L: '',
    j8V: '',
    j9L: '',
    j9V: '',
  } 
  const { session } = useContext(SessionContext)
  const BASE_URL = 'http://localhost/api-quiniela'
  const [journeyTeams, setJourneyTeams] = useState([])
  const [quiniela, setQuiniela] = useState(false)
  const [formJourney, setFormJourney] = useState(journey)
  const [journeyNow, setJourneyNow] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/jornadas/jornadaProxima`)
    const data = await response.json();
    setJourneyNow(Object.values(data)[0])
    let teams = Object.values(data).filter((item, index) => (index > 0 && index < 19))
    teams = (teams.map(item => item.indexOf(' ') >= 0 ? item.replace(' ', '') : item))
    let locals = teams.filter((team, index) => !(index % 2))
    let visits = teams.filter((team, index) => (index % 2))
    teams = []
    for (let i = 0; i < locals.length; i++) {
      teams.push([locals[i], visits[i]])
    }
    setJourneyTeams(teams)
    if (session) {
      const res = await fetch(`${BASE_URL}/resultados/quiniela/${Object.values(data)[0]}/${session.idParticipante}`)
      const info = await res.json();
      const quiniela = Object.values(info).map((item, index) => (index > 2 && index < 12) ? item.slice(1) : false).filter(item => item)
      setQuiniela(quiniela);
    }
  } 
  useEffect(() => {
    fetchData()
  }, [session])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validateForm = []
    validateForm.push(onlyNumbers(Object.values(formJourney)))
    validateForm.push(allRequired(Object.values(formJourney)))
    setIsValidForm(validationContainer(validateForm))
    if (validationContainer(validateForm).isValid) {
      let dataform = new FormData()
      dataform.append('METHOD', 'POST');
      dataform.append('idParticipante', session.idParticipante);
      dataform.append('idJornada', journeyNow);
      const results = Object.values(formJourney)
      const scores = results.map((value, index) => {
        if (index % 2 === 0) {
          if (Number(value) > Number(results[index + 1])) {
            return `g${value}-${results[index + 1]}`
          } else if (Number(value) < Number(results[index + 1])) {
            return `p${value}-${results[index + 1]}`
          } else {
            return `e${value}-${results[index + 1]}`
          }
        } else {
          return false
        }
      }).filter(value => value)
      scores.map((score, index) => dataform.append(`j${index+1}`, score));
      const response = await fetch(`${BASE_URL}/resultados`, {
        method: 'post',
        body: dataform
      })
      const data = await response.json();
      fetchData()
    }
  }
  const handleChange = (e) => {
    setFormJourney({
      ...formJourney,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container fluid='md' className='addResults py-3'>
      {session ?
        <>
          <h3 className='text-white mb-3'>Jornada {journeyNow}</h3>
          {quiniela.length ?
            <div>
              {journeyTeams.map((team, index) => (
                <Row key={index}>
                  <Col>
                    <label htmlFor="" className='text-light mr-2 h5'>{quiniela[index].split('-')[0] }</label>
                    <img src={imagesTeams[team[0]]} alt="" height='35' />
                  </Col>
                  <b className='text-white'>vs</b>
                  <Col>
                    <img src={imagesTeams[team[1]]} alt="" height='35' />
                    <label htmlFor="" className='text-light ml-2 h5'>{quiniela[index].split('-')[1]}</label>
                  </Col>
                </Row>
              ))}
            </div>
            :
            <Form onSubmit={handleSubmit}>
              {journeyTeams.map((team, index) => (
                <Row key={index}>
                  <Col>
                    <label className="text-white mr-2">*</label>
                    <input type="number" min="0" max="10" name={`j${index + 1}L`} onChange={handleChange} />
                    <img src={imagesTeams[team[0]]} alt="" height='35' />
                  </Col>
                  <b className='text-white'>vs</b>
                  <Col>
                    <img src={imagesTeams[team[1]]} alt="" height='35' />
                    <input type="number" min="0" max="10" name={`j${index + 1}V`} onChange={handleChange} />
                    <label className="text-white ml-2">*</label>
                  </Col>
                </Row>
              ))}
              {
                isValidForm && !isValidForm.isValid &&
                <Alert variant='danger' className="mt-3">
                  {isValidForm.message}
                </Alert>
              }
              <Button variant="light" className="mt-3" type='submit'>Guardar</Button>
            </Form>
          }
          
        </>
        :
        <h3 className="text-light">Inicia sesión para subir tu quiniela</h3>
      }
    </Container>
  )
}

export default FormQuiniela