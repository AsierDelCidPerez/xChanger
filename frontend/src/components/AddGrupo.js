import {TextField, Box, MenuItem, Select, Button, Typography, InputLabel, FormControl} from '@mui/material'
import MyModal from './MyModal'
import { useState } from 'react'
import useGruposService from '../services/grupos'

const AddGrupo = ({setNotification, groups, setGroups, ofertas, setOfertas}) => {

    const [open, setOpen] = useState(0)

    const groupService = useGruposService()
    const cerrarModales = () => setOpen(0)

    const crearGrupo = async e => {
        e.preventDefault()
        const name = e.target.grupo.value
        try{
            const res = await groupService.crearGrupo(name)
            setNotification({notification: res.data.msg, isSuccess: true})
            setGroups([...groups, {name}])
            setOpen(0)
        }catch(e){
            setNotification({notification: e.response.data.msg, isSuccess: false})
            setOpen(0)
        }
    }

    const crearOfertaBody = () => (
        <Box component="form" onSubmit={crearGrupo}>
            <Typography sx={{textAlign: 'center'}} variant="h5">Crear oferta</Typography><hr/><br/>
            <TextField fullWidth type="text" variant="outlined" name="grupo" required label="Nombre del grupo"/>
            <br/><br/>
            <Button fullWidth variant="contained" type="submit">Inscribirme a la oferta</Button>
        </Box>
    )

    return (
        <>
            <Button fullWidth onClick={() => setOpen(1)} variant="contained">Añadir grupo</Button>
            <MyModal getBody={crearOfertaBody} open={open} handleClose={cerrarModales}/>
        </>
    )
}

export default AddGrupo