import { useState, useContext, useEffect } from "react";
import SessionContext from '../Context/SessionContext'
import useGetSession from './useGetSession'

const useLogin = (setIsValidForm) => {
  const [player, setPlayer] = useState()
  const { setSession } = useContext(SessionContext)
  const {session} = useGetSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dataform = new FormData;
    dataform.append('user', e.target[0].value);
    dataform.append('password', e.target[1].value);
    dataform.append('METHOD', 'POST');
    const response = await fetch(`http://localhost/api-quiniela/participantes/login`, {
      method: 'post',
      body: dataform
    })
    const data = await response.json()
    if (data) {
      sessionStorage.setItem('manager', JSON.stringify(data))
      setPlayer(data);
      setSession(data);
      const buttonMenu = document.querySelector('.navbar-toggler');
      buttonMenu.click();
      setIsValidForm(false)
    } else {
      setIsValidForm({ isValid: false, message: 'Credenciales incorrectas!' })
    }
  }

  return { handleSubmit, player }
}

export default useLogin;

