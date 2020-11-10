import axios from 'axios'

// This module handles methods for communicating with the server.

const baseUrl = 'http://localhost:3002/api/tickets/'

const getPage = (pageNumber) => {
    const request = axios.get(baseUrl + pageNumber)
    console.log(request)
  console.log(request)
  
    return request.then(response => response)
    .catch(response => response)

}

const getAmount = () => {
    const request = axios.get('http://localhost:3002/api/count/')

    return request.then(response => response)
}

const getTicketById = (id) => {
    const request = axios.get(`http://localhost:3002/api/${id}`)

    return request.then(response => response)
}



export default { getPage, getAmount, getTicketById }