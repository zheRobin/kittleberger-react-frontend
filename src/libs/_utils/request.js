import API from './api';
class AxiosWrapper {
  static async get(url, options = {}) {
    return this.request('get', url, options);
  }

  static async post(url, body, options = {}) {
    return this.request('post', url, {...options, data: body});
  }

  static async put(url, body, options = {}) {
    return this.request('put', url, {...options, data: body});
  }

  static async delete(url, options = {}) {
    return this.request('delete', url, options);
  }

  static async request(method, url, options = {}) {
    options.headers = options.headers || {}; 
    try {
      const response = await API({method, url, ...options});
      return response.data;
    } catch (error) {
      console.error(error)
      if(error?.response?.status === 401){
        localStorage.removeItem('token');
      }
      window.location.assign("/");
    }
  }
}

export const Request = AxiosWrapper;

export const handleRequest = async (method, url, data = {}) => {
  try {
    const response = await Request[method](`${process.env.REACT_APP_API_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export const handleFormRequest = async (method, url, data = {}) => {
  try {
    const response = await Request[method](`${process.env.REACT_APP_API_URL}${url}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}