import React from 'react'
import imagesTeams from '../../assets/imagesTeams'
import useTimer from '../../Hooks/useTimer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const Timer = ({variant}) => {
  const { teamsStartJourney, days, hours, minutes, seconds } = useTimer()
  return (
    <div className={variant === 'black' ? 'chronometer' : 'chronometer2'}>
      <div className='mt-3'>
        <img src={imagesTeams[teamsStartJourney[0]]} alt={teamsStartJourney[0]} />
        VS
        <img src={imagesTeams[teamsStartJourney[1]]} alt={teamsStartJourney[1]} />
      </div>
      <h3 className='m-3'>{days >= 2 ? 'Faltan ' : 'Falta '}
        <span>{days}</span> {days >= 2 ? 'días' : 'día'}
        <span> {hours}</span>:
        <span>{minutes}</span>:
        <span>{seconds}</span> hrs.
        <p className='h5'>Para el inicio de la jornada</p>
      </h3>
    </div>
  )
}

export default Timer;