import React from 'react'
import './style.css'
import imageLogo from '../../assets/imgs/logo2.png'

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap');
</style>

const Rules = () => {
  return (
    <section>
      <h2>Reglamento de Quiniela Mamalona</h2>
      <div className='section-rules'>
        <p>
          1. La fecha y hora límite para subir la quiniela es 15 minutos antes de que de inicio el primer partido de la jornada, cabe mencionar que hay jornadas que inician en jueves.
        </p>
        <p>
          2. En caso de no poder iniciar sesión o no poder subir la quiniela deberán de reportar el problema en ese instante ya que de presentar la queja después de la hora válida para subir la quiniela no se les podrá ayudar y quedará sin registro de esa jornada.
        </p>
        <p>
          3. Usted podrá cambiar su contraseña si así lo decide, para ello tiene que iniciar sesión con el usuario y contraseña que se les proporcionó y después en la opción que tiene su nombre en la parte superior.
        </p>
        <p>
          3. La contabilización de los aciertos por jornada pueden tardar en verse reflejados, pero una vez que esto suceda, automáticamente se contabilizará en los aciertos totales.
        </p>
        <p>
          4. Usted no podrá visualizar los resultados de los demás participantes, solo el suyo. Una vez que termine el plazo para subir la quiniela se mostrarán todos los resultados de los participantes que hayan subido su quiniela.
        </p>
        <p>
          5. Una vez que haya subido sus resultados de la jornada no podrá actualizarlos, así es que asegúrese de revisarlos antes de guardarlos evitando así errores y molestias.
        </p>
        <p>
          6. El total del acumulado $ será el total de participantes multiplicado por 300 menos el 10% de gastos de administración, soporte técnico etc.
        </p>
        <p>
          7. En caso de q haya 2 o más participantes en 1er lugar se dividirán entre ellos el 100% del total acumulado. En caso de que sólo haya un sólo participante ganador recibirá el 80% del total acumulado y el 2do lugar el 20%, en caso de que haya 2 o más participantes en segundo lugar se dividirán el 20% del total acumulado.
        </p>
        <p>
          8. En caso de cancelación de la liga, el ganador sera el lider o lideres en el momento de la cancelación con los parametros de premiación previamente difinido.
        </p>
        <p>
          9. En dado caso de modificación del resultado final de un partido por cuestiones de la liga (triunfos en la mesa por alguna penalización o similar), el resultado valido sera el que se haya dado en el terreno de juego.
        </p>
        <p>
          10. Cualquier duda o aclaración quedo a sus ordenes en el grupo de whatsapp.
        </p>
        <div className='firma'>
          <img src={imageLogo} alt="logo-quiniela-mamalona" />
          <p>Atentamente</p>
        </div>
      </div>
    </section>
  )
}

export default Rules