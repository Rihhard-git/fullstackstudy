import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}
const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    console.log(newObject)
    console.log(`using update service for id ${id} and new data is: ${newObject}`)
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    console.log(req)
    return req.then(res => res.data)
}

export default { getAll, create, deletePerson, update}

