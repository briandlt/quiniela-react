import { useState, useEffect } from "react";

const useGetCorrectResults = (journey) => {
  const BASE_URL = 'http://localhost/api-quiniela'
  const [correctResults, setCorrectResults] = useState(null)

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/resultadosCorrectos/jornadaId/${journey}`)
    const data = await response.json();
    if (data.length) {
      const results = data[0]
      delete results.idJornada
      delete results.idResCorrec
      setCorrectResults(results)
    }
  }

  useEffect(() => {
    fetchData()
  }, [journey])

  return { correctResults }
}

export default useGetCorrectResults