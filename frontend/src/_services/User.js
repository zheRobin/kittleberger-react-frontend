import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }

export const userCreate = ({name, email, password} ,token,  success) => {
    
    setAuthToken(token);
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/manage/`,{
        name , email, password
    }).then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}

export const userEdit = (id,{name, email, password} ,token ,success) => {
    setAuthToken(token);
    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/user/manage/${id}/`,{
        username:name , email, password
    }).then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}

export const userDelete = (id,token ,success) => {
    setAuthToken(token);
    axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/user/manage/${id}/`).then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}

export const userList = (token, success) => {
    setAuthToken(token);
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/manage/`)
    .then((response) => {
        success(response)
    }).catch((error) => console.log(error))
}


export const changePassword = ({oldpass , newpass }, token ,success) => {
    setAuthToken(token);
    axios.put(`${process.env.REACT_APP_API_URL}/api/v1/user/change-password/`, {
        old_password:oldpass, new_password:newpass
    }).then((response) => {
        success(response)
    }).catch((error) => {
        console.log(error)
    })
}
