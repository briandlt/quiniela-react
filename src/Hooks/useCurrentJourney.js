import { useState, useEffect } from "react";

const useCurrentJourney = () => {
  const BASE_URL = 'http://localhost/api-quiniela'
  const [currentJourney, setCurrentJourney] = useState(null)
  const [currentDateStart, setCurrentDateStart] = useState(null)
  const [currentDateEnd, setCurrentDateEnd] = useState(null)
  const [currentMatches, setCurrentMatches] = useState(null)

  const fetchData = async () => {
    const URL = currentJourney
      ? `${BASE_URL}/jornadas/jornadaId/${currentJourney}`
      : `${BASE_URL}/jornadas/jornadaActual`
    const response = await fetch(URL)
    const data = await response.json();
    setCurrentJourney(data.idJornada)
    setCurrentDateStart(data.fechaInicio)
    setCurrentDateEnd(data.fechaFin)
    delete data.idJornada
    delete data.fechaInicio
    delete data.fechaFin
    setCurrentMatches(data)
  }

  useEffect(() => {
    fetchData()
  }, [currentJourney])

  return { currentJourney, currentDateStart, currentDateEnd, currentMatches, setCurrentJourney}
}

export default useCurrentJourney