import { Paper, Table, TableContainer, TableCell, TableHead, TableRow, TableBody, Button, TextField, Box, Typography, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import useOfertasService from "../services/ofertas"
import MyModal from "./MyModal"
import useGruposService from "../services/grupos"

const resultados = []

const TablaOfertas = ({setNotification, groups, setGroups, ofertas, setOfertas}) => {

    const [open, setOpen] = useState(0) // 0-> ninguno, 1-> inscripcion, 2-> crear grupo, 3-> crear oferta
    const [interes, setInteres] = useState(0)

    const ofertasService = useOfertasService()

    const cerrarModales = () => setOpen(0)

    const inscribirse = async e => {
        console.log(ofertas)
        console.log(interes)
        e.preventDefault()
        try{
            const res = await ofertasService.inscribirmeOferta(interes, e.target.email.value)
            setNotification({notification: res.data.msg, isSuccess: true})
            setOfertas(ofertas.filter(oferta => oferta.id !== interes))
        }catch(e){
            setNotification({notification: e.response.data.msg, isSuccess: false})
        }
        setOpen(0)
    }

    const inscripcionBody = () => (
        <Box component="form" onSubmit={inscribirse}>
            <Typography sx={{textAlign: 'center'}} variant="h5">Inscribirse a oferta</Typography><hr/><br/>
            <TextField required type="email" fullWidth variant="outlined" name="email" label="Email de contacto"/><br/><br/>
            <Button type="submit" fullWidth variant="contained">Inscribirme a la oferta</Button>
        </Box>
    )

   

    const inscribirseAOferta = idOferta => () => {
        setOpen(1)
        setInteres(idOferta)
    }

    return (
        <TableContainer component={Paper}>
            <MyModal getBody={inscripcionBody} open={open === 1} handleClose={cerrarModales}/>

            <Table>
        <TableHead>
          <TableRow>
            <TableCell>Está en el grupo</TableCell>
            <TableCell>Quiere cambiarse al grupo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {ofertas.map((row,key) => (
                <TableRow
              key={key}
            >
              <TableCell>{row.origen}</TableCell>
              <TableCell>{row.destino}</TableCell>
              <TableCell><Button onClick={inscribirseAOferta(row.id)}>Inscribirme a la oferta</Button></TableCell>

            </TableRow>
            ))}
        </TableBody>
      </Table>
        </TableContainer>
    )
}

export default TablaOfertas