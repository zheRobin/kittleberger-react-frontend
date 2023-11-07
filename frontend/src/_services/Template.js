import axios from 'axios';
 
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

const token = JSON.parse(localStorage.getItem("token"));
if (token) {
    setAuthToken(token);
}

export const getTemplateList = (success) => {
    axios.get(`${process.env.REACT_APP_LOCAL_API_URL}/api/v1/compose/templates/`)
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}