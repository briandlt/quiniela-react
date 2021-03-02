import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Timer from '../Timer'
import './index.css'

const ImageHome = () => {  
  return (
    <Container fluid className="imageHome d-flex justify-content-center">
      <Timer variant={'black'} />
    </Container>
  )
}

export default ImageHome