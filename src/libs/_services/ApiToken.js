import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }

export const tokenList = (token, success) => {
    setAuthToken(token);
    axios.get(`${process.env.REACT_APP_API_URL}api/v1/core/apikey/`)
    .then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}

export const createToken = (name,token, success) => {
    setAuthToken(token);
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/core/apikey/`,{
        name
    })
    .then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}

export const deleteToken = (id,token, success) => {
    setAuthToken(token);
    axios.delete(`${process.env.REACT_APP_API_URL}api/v1/core/apikey/${id}`)
    .then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}