import { useState, useEffect } from "react";
import SessionContext from '../Context/SessionContext'

const useGetSession = () => {
  const [session, setSession] = useState(null)
  // const { setSession } = useContext(SessionContext)

  useEffect(() => {
    const data = (async function () {
      const response = await fetch(`http://localhost/api-quiniela/participantes/getSession`, {
        credentials: 'include'
      })
      const info = await response.json()
      debugger
      setSession(info)
      return info
    })();

    // const data = sessionStorage.getItem('manager')
    // console.log('estamos obteniendo la sesion para refrescarla', data)
    // setSession(data);
  }, [])
  return {session}
}

export default useGetSession;