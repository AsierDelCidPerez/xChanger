import axios from 'axios'
const { default: prefix } = require('./prefix')

const useGruposService = () => {

    const getAllGroups = () => {
        return axios.get(`${prefix}/api/grupos/verGrupos`, {})
    }

    const crearGrupo = name => {
        return axios.post(`${prefix}/api/grupos/addGroup`, {name})
    }

    return {
        getAllGroups,crearGrupo
    }
}

export default useGruposService