import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageLogo from '../../assets/imgs/logo2.png'
import './style.css'
import { Navbar, Nav, NavDropdown, Form, Button, Alert } from 'react-bootstrap';
import useLogin from '../../Hooks/useLogin'
import useLogout from '../../Hooks/useLogout'
import SessionContext from '../../Context/SessionContext'

const Navigation = () => {
  const closeSession = useLogout().handleSubmit;
  const { session } = useContext(SessionContext)
  const [isValidForm, setIsValidForm] = useState(false)
  const { handleSubmit } = useLogin(setIsValidForm);

  const handleChangePassword = (e) => {
    e.preventDefault()
    const npass1 = e.target[0].value
    const npass2 = e.target[1].value
    const regExp = /^[a-zA-ZñÑ0-9_-]{6,20}$/g
    if (npass1.length && npass2.length) {
      if (regExp.test(npass1) && regExp.test(npass2)) {
        if (npass1 !== npass2) console.log('Las contraseñas deben ser iguales')
      } else {
        console.log('La nueva contraseña debe de estar compuesta por letras, numeros, "-" o "_"')
      }
    } else {
      console.log('Los campos no deben estar vacios')
    }
  }

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="./"><img className='imageLogo' src={imageLogo} alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
          <Nav.Link href="./Home">Inicio</Nav.Link>
          <NavDropdown title={session ? session.nombre.charAt(0).toUpperCase() + session.nombre.slice(1) : "Iniciar Sesión"} id="collasible-nav-dropdown">
            {session
              ? <div>
                <NavDropdown.Item onClick={closeSession}>Cerrar Sesión</NavDropdown.Item>
                  <NavDropdown title="Cambiar Contraseña" id="nav-dropdown">
                    <Form className="m-3" onSubmit={handleChangePassword}>
                      <Form.Group>
                        <Form.Label>Nueva Contraseña</Form.Label>
                      <Form.Control type="password" name="npass" placeholder="Nueva Contraseña" />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Confirme Contraseña</Form.Label>
                      <Form.Control type="password" name="npass2" placeholder="Confirme Contraseña" />
                      </Form.Group>
                    <Button variant="light" type="submit">Cambiar</Button>
                    </Form>
                  </NavDropdown>
              </div>
              : <div>
                <Form className="m-3 bg-dark" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" name="user" placeholder="Usuario" />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Contraseña" />
                  </Form.Group>
                  {
                    isValidForm && !isValidForm.isValid &&
                    <Alert variant='danger' className="mt-3 text-center">
                      {isValidForm.message}
                    </Alert>
                  }
                  <Button variant="light" type="submit">Iniciar Sesión</Button>
                </Form>
                <NavDropdown.Divider />
                <NavDropdown.Item>Registrate ahora!</NavDropdown.Item>
              </div>
            }
          </NavDropdown>
          <Nav.Link href="./Positions">Posiciones</Nav.Link>
          <Nav.Link href="./Regulation">Reglamento</Nav.Link>
          {(session && Number(session.idParticipante) === 1) &&
            <Nav.Link href="./AddResults">Agregar resultado</Nav.Link>
          }
          <Nav.Link href="./Quiniela">Quiniela</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;
