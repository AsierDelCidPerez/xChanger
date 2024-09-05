import Logo from './components/Logo';
import './App.css';
import {Box, Container, TableContainer, Typography} from '@mui/material'
import TablaOfertas from './components/TablaOfertas';
import AddGrupo from './components/AddOferta';
import AddOferta from './components/AddGrupo';
import { useNotification } from './components/Notification';
import { useEffect, useState } from 'react';
import useOfertasService from './services/ofertas';
import useGruposService from './services/grupos';

function App() {
  const [ofertas, setOfertas] = useState([])
  const [getNotification, setNotification] = useNotification()
  const [groups, setGroups] = useState([])
  const [gatillo, setGatillo] = useState(false)
  const ofertasService = useOfertasService()
  const groupService = useGruposService()


  useEffect(() => {
    ofertasService.getAllOfertas().then(res => {
        const newOfertas = res.data.map(elem => {
            return {
                origen: elem.destino,
                destino: elem.origen,
                id: elem.id
            }
        })
        setOfertas(newOfertas)
    }).catch(error => {
         setNotification({notification: error.response.data.msg, isSuccess: false})
    })
}, [gatillo])

  useEffect(() => {
    groupService.getAllGroups().then(res => {
      setGroups(res.data)
  })
  }, [])

  return (
    <div>
      <Container>
        <Typography variant="h4" sx={{textAlign: 'center'}}>Cambio de grupos Ingeniería Informática</Typography><hr/>
        {getNotification()}<br/>
        <Logo/><br/>

        <Box sx={{display: {md: 'flex', sm: 'block'}, justifyContent: 'center', gap: "1%"}}>
          <AddGrupo setOfertas={setOfertas} ofertas={ofertas} setGroups={setGroups} groups={groups} setNotification={setNotification}/><br/><br/>
          <AddOferta gatillo={gatillo} setGatillo={setGatillo} setOfertas={setOfertas} ofertas={ofertas} setGroups={setGroups} groups={groups} setNotification={setNotification}/>
        </Box><br/>
        <p>Se busca gente que:</p>
        <TablaOfertas setOfertas={setOfertas} ofertas={ofertas} setGroups={setGroups} groups={groups} setNotification={setNotification}/>
        <br/><br/><hr/>
        <Typography variant="h6" sx={{textAlign: 'center'}}>Creado por Asier Del Cid Pérez</Typography><hr/>
        <footer style={{textAlign: 'center'}}>Atención: esta web carece de validez a nivel institucional (es decir, de la Universidad de Cantabria). Esta web simplemente ha sido creada como medio de comunicación entre los alumnos para que puedan coordinar cambios en los grupos. Se ruega que se use un correo al menos accesible ya que nos pondremos en contacto con usted <a href="mailto:cambio.grupos.informatica@gmail.com">cambio.grupos.informatica@gmail.com</a> cuando haya algún interesado en la oferta.</footer>
        <div style={{textAlign: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <a href="https://github.com/AsierDelCidPerez/xChanger" target="_blank"><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png" width="50"/></a>
        <a href="https://opensource.org/" target="_blank"><img width="50" src="https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/240_Opensource_Open_Source-256.png"/></a>
        </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
