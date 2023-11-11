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

export const getTemplateListbyFilter = (token,success,templateArgs={}) => {
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/compose/templates/filter/`,{
        templateArgs
    })
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}
export const infiniteTemplate = (token,page,dependencies,success) => {
    setAuthToken(token)
    const limit = 15
    const offset = (page - 1) * limit
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/compose/templates/filter?limit=${limit}&offset=${offset}`, {
        dependencies
    })
    .then(res => {
        success(res)
    })
    .catch(error => {
        console.error("Error:", error);
    })
}

export const createTemplate = (formData,token,success) => {
    const language = 'en';
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/compose/templates/`,
        formData,{
            headers: {
            'Content-Type': 'multipart/form-data',
            },
            params: {
                language: language,
            },
        }
    )
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}
