import React, { useState, useEffect } from 'react'
import imagesTeams from '../../assets/imagesTeams.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import useCurrentJourney from '../../Hooks/useCurrentJourney'
import { allRequired } from '../../helpers/validate'

const FormCorrectScores = () => {
  const BASE_URL = 'http://localhost/api-quiniela'
  const totalJourneys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
  const { currentJourney, currentMatches, setCurrentJourney } = useCurrentJourney() // Jornada actual y sus juegos
  const [journey, setJourney] = useState(null) // jornada elegida por el usuario en el select option
  const [scores, setScores] = useState(null) // resultados correctos
  const [score, setScore] = useState({ journey: currentJourney, local: '', visitor: '', match: '' })

  const handleChangeJourney = (e) => {
    setCurrentJourney(e.target.value)
    setJourney(e.target.value)
  }

  const fetchDataScores = async () => {
    const response = await fetch(`${BASE_URL}/resultadosCorrectos/jornadaId/${journey || currentJourney}`)
    const data = await response.json();
    if (data.length) {
      const results = data[0]
      delete results.idJornada
      delete results.idResCorrec
      setScores(Object.values(results).map(item => item.replace(item[0], '')))
    }
  }

  useEffect(() => {
    fetchDataScores()
    setScore({
      ...score,
      journey: journey || currentJourney
    })
  }, [journey, currentJourney])

  const handleChange = (e) => {
    setScore({
      ...score,
      match: e.target.name.slice(0, -1),
      local: (e.target.name.slice(-1) === 'L') ? e.target.value : score.local,
      visitor: (e.target.name.slice(-1) === 'V') ? e.target.value : score.visitor
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { isValid } = allRequired(Object.values(score))
    if (isValid) {
      let dataform = new FormData
      dataform.append('METHOD', 'PUT')
      dataform.append('jornada', score.journey)
      dataform.append('juego', score.match)
      if (Number(score.local) > Number(score.visitor)) {
        dataform.append('resultado', `g${score.local}-${score.visitor}`)
      } else if (Number(score.local) < Number(score.visitor)) {
        dataform.append('resultado', `p${score.local}-${score.visitor}`)
      } else {
        dataform.append('resultado', `e${score.local}-${score.visitor}`)
      }
      const response = fetch(`${BASE_URL}/resultadosCorrectos`, {
        method: 'post',
        body: dataform
      })
      console.log(currentJourney)
      // Mostrar alerta de exito
      fetchDataScores()
      setScore({
        ...score,
        local: '',
        visitor: '',
        match: ''
      })
    } else {
      console.log('hay valores vacios')
    }
  }

  return (
    <Container className='mb-5 section'>
      <h4 className='text-light my-5'>Agregar resultado correcto</h4>
      <div className="col-12 text-center mb-3 mt-4 row justify-content-center">
        <Form.Control as="select" custom id="jornada" value={journey || currentJourney} onChange={handleChangeJourney}>
          {totalJourneys.map(j => (
            <option key={j} value={j}>Jornada {j}</option>
          ))}
        </Form.Control>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          {currentMatches && Object.values(currentMatches).map((team, index) => (
            <>
              {!(index % 2)
                ? <>
                  <Col className='col-5 mb-2'>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      name={`j${index / 2 + 1}L`}
                      disabled={(scores && scores[index / 2] || ((score.local.length || score.visitor.length) && score.match !== `j${index / 2 + 1}`)) ? true : false}
                      onChange={handleChange}
                      defaultValue={scores ? scores[index / 2].split('-')[0] : ''}
                    />
                    <img src={imagesTeams[team.replace(' ', '')]} alt="" height='35' />
                  </Col>
                  <b className='text-white col-2'>vs</b>
                </>
                : <>
                  <Col className='col-5 mb-2'>
                    <img src={imagesTeams[team.replace(' ', '')]} alt="" height='35' />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      name={`j${(index + 1) / 2}V`}
                      disabled={(scores && scores[(index - 1) / 2] || ((score.local.length || score.visitor.length) && score.match !== `j${(index + 1) / 2}`)) ? true : false}
                      onChange={handleChange}
                      defaultValue={scores ? scores[(index - 1) / 2].split('-')[1] : ''}
                    />
                  </Col>
                </>
              }
            </>
          ))}
        </Row>
        <Button variant="light" className="mt-2" type='submit'>Guardar</Button>
      </Form>
    </Container>
  )
}

export default FormCorrectScores