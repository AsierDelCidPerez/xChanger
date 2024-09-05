import Logo from './components/Logo';
import './App.css';
import {Box, Container, TableContainer, Typography} from '@mui/material'
import TablaOfertas from './components/TablaOfertas';
import AddGrupo from './components/AddGrupo';
import AddOferta from './components/AddOferta';

function App() {

  

  return (
    <div>
      <Container>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Cambio de grupos Ingeniería Informática</Typography><hr/>
        <Logo/><br/>

        <Box sx={{display: {md: 'flex', sm: 'block'}, justifyContent: 'center', gap: "1%"}}>
          <AddGrupo/><br/><br/>
          <AddOferta/>
        </Box><br/>
        <p>Se busca gente interesada en los siguientes cambios:</p>
        <TablaOfertas/>
        <br/><br/><hr/>
        <Typography variant="h6" sx={{textAlign: 'center'}}>Creado por Asier Del Cid Pérez</Typography><hr/>
        <footer style={{textAlign: 'center'}}>Atención: esta web carece de validez a nivel institucional (es decir, de la Universidad de Cantabria). Esta web simplemente ha sido creada como medio de comunicación entre los alumnos para que puedan coordinar cambios en los grupos. Se ruega que se use un correo al menos accesible ya que nos pondremos en contacto con usted <a href="mailto:cambio.grupos.informatica@gmail.com">cambio.grupos.informatica@gmail.com</a> cuando haya algún interesado en la oferta.</footer>
      </Container>
    </div>
  );
}

export default App;
