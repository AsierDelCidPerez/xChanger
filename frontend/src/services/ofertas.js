import axios from 'axios'
const { default: prefix } = require('./prefix')

const useOfertasService = () => {

    const getAllOfertas = () => {
        return axios.get(`${prefix}/api/ofertas/verOfertas`, {})
    }

    const addOferta = (email, origen, destino) => {
        return axios.post(`${prefix}/api/ofertas/addOferta`, {email, origen, destino})
    }

    const inscribirmeOferta = (id,email) => {
        return axios.post(`${prefix}/api/ofertas/inscribirse`, {id, email})
    }

    return {
        getAllOfertas, addOferta,inscribirmeOferta
    }
}

export default useOfertasService