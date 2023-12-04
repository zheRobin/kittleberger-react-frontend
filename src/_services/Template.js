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
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/compose/templates/filter/`,{
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

export const getTemplatesTypes = (token,success) => {
    setAuthToken(token)
    axios.get(`${process.env.REACT_APP_API_URL}api/v1/compose/pagedata/`)
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}

export const createTemplatesTypes = (templateInfo,token,success) => {
    setAuthToken(token)
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/compose/pagedata/`,templateInfo)
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}

export const deleteTemplatesTypes = (templateInfo,token,success) => {
    setAuthToken(token)
    console.log(templateInfo)
    axios.delete(`${process.env.REACT_APP_API_URL}api/v1/compose/pagedata/`,{data:templateInfo})
    .then((response) => {
        success(response)
    })
    .catch( (error) => {
        console.log(error)
    }
    )
}

export const editTemplatesTypes = (templateInfo,token,success) => {
    setAuthToken(token)
    axios.put(`${process.env.REACT_APP_API_URL}api/v1/compose/pagedata/`,templateInfo)
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
    const limit = 10
    const offset = (page - 1) * limit
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/compose/templates/filter?limit=${limit}&offset=${offset}`, {
        ...dependencies
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
    axios.post(`${process.env.REACT_APP_API_URL}api/v1/compose/templates/`,
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

export const updateTemplate = (formData,token,id,success) => {
    const language = 'en';
    setAuthToken(token)
    axios.put(`${process.env.REACT_APP_API_URL}api/v1/compose/templates/${id}/`,
        formData,{
            headers: {
            'Content-Type': 'multipart/form-data',
            }
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