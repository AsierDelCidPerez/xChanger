import MyModal from "./MyModal"
import { useEffect, useState } from "react"
import {TextField, Box, MenuItem, Select, Button, Typography, InputLabel, FormControl} from '@mui/material'
import useGruposService from "../services/grupos"
import useOfertasService from "../services/ofertas"


const AddOferta = ({setNotification, groups, setGroups, ofertas, setOfertas, gatillo, setGatillo}) => {

    const [open, setOpen] = useState(0)

    const [origin, setOrigin] = useState(0)
    const [destino, setDestino] = useState(0)

    const ofertaService = useOfertasService()
    const groupService = useGruposService()

    const onChangeDestino = e => {
        console.log(e.target)
        setDestino(e.target.value)
    }

    const onChangeOrigin = e => {
        console.log(e.target)
        setOrigin(e.target.value)
    }

    const inscribirme = async e => {
        e.preventDefault()
        const email = e.target.email.value
        if(origin !== 0 & destino !== 0 & origin !== destino){
            try{
                const res = await ofertaService.addOferta(email, origin, destino)
                setNotification({notification: res.data.msg, isSuccess: true})
                setOfertas([...ofertas, {origen: destino, destino: origin, id: res.data.oferta.id}])
                console.log(ofertas)
                setOpen(0)
            }catch(er) {
                setNotification({notification: er?.response?.data?.msg, isSuccess: false})
                setOpen(0)
            }
        }else{
            setNotification({notification: "Datos introducidos incorrectos", isSuccess: false})
            setOpen(0)
        }
    }

    const crearOfertaBody = () => (
                <Box component="form" onSubmit={inscribirme}>
                    <Typography sx={{textAlign: 'center'}} variant="h5">Crear oferta</Typography><hr/><br/>
                    <TextField fullWidth type="email" variant="outlined" name="email" required label="Email de contacto"/><br/><br/>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Grupo en el que estoy</InputLabel>
                    <Select labelId="demo-simple-select-filled-label" variant="outlined" value={origin} onChange={onChangeOrigin} label="Grupo en el que estoy" required fullWidth>
                        {groups.map(el => (
                            <MenuItem value={el.name}>{el.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </FormControl>
                    
                    <br/><br/>

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Grupo en el que deseo estar</InputLabel>
                    <Select labelId="demo-simple-select-filled-label" onChange={onChangeDestino} value={destino} variant="outlined" label="Grupo en el que deseo estar" required fullWidth>
                        {groups.map(el => (
                            <MenuItem value={el.name}>{el.name}</MenuItem>
                        ))}
                    </Select>
                    
                    </FormControl>

                    <br/><br/>
                    <Button fullWidth variant="contained" type="submit">Crear la oferta</Button>
                </Box>
            )
        
    

    const cerrarModales = () => setOpen(0)


    return (
        <>
            <Button onClick={() => setOpen(1)} fullWidth variant="contained">Crear oferta</Button>
            <MyModal getBody={crearOfertaBody} open={open} handleClose={cerrarModales}/>
        </>
    )
}

export default AddOferta