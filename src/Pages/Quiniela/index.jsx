import React from "react";
import Navigation from '../../Components/Navigation'
import Timer from '../../Components/Timer'
import FormQuiniela from '../../Components/FormQuiniela'
import Footer from '../../Components/Footer'

const Quiniela = () => {
  return (
    <>
      <Navigation />
      <Timer variant={'white'} />
      <FormQuiniela />
      <Footer />
    </>
  )
}

export default Quiniela