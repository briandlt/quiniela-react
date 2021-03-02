import { useState, useEffect } from "react";

const useTimer = () => {
  const BASE_URL = 'http://localhost/api-quiniela'
  const [deadline, setDeadline] = useState(null)
  const [teamsStartJourney, setTeamsStartJourney] = useState([])
  const [days, setDays] = useState(null)
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [seconds, setSeconds] = useState(null)

  const fetchData = async () => {
    const response = await fetch(`${BASE_URL}/jornadas/jornadaProxima`)
    const data = await response.json();
    setTeamsStartJourney(Object.values(data).filter((item, index) => index === 1 || index === 2)
      .map(team => team.indexOf(' ') > -1 ? team.replace(' ', '') : team))
    const datetime = Object.values(data)[20].split(' ')
    setDeadline(new Date(`${datetime[0].split('-').join('/')} ${datetime[1]}`))
  }

  const MILLISECONDS_OF_A_SECOND = 1000;
  const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
  const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
  const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24

  function updateCountdown() {
    const NOW = new Date()
    const DURATION = deadline - NOW
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY)
    const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR)
    const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE)
    const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND)

    setDays(REMAINING_DAYS)
    setHours(REMAINING_HOURS <= 9 ? `0${REMAINING_HOURS}` : REMAINING_HOURS)
    setMinutes(REMAINING_MINUTES <= 9 ? `0${REMAINING_MINUTES}` : REMAINING_MINUTES)
    setSeconds(REMAINING_SECONDS <= 9 ? `0${REMAINING_SECONDS}` : REMAINING_SECONDS)
  }

  useEffect(() => {
    fetchData()
  }, [])
  setTimeout(updateCountdown, MILLISECONDS_OF_A_SECOND);

  return {deadline, teamsStartJourney, days, hours, minutes, seconds}
}

export default useTimer;