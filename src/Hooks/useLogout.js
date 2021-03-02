import useLogin from "./useLogin"

import {useContext} from 'react'
import SessionContext from '../Context/SessionContext'

const useLogout = () => {
  const { setSession } = useContext(SessionContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('manager')
    setSession(null);
  }
  return {handleSubmit}
}

export default useLogout;