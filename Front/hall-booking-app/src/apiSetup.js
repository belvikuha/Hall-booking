import axios from "axios";


const apiUrl = 'http://localhost:8000'  


export const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization : `Bearer ${(localStorage.getItem('token') || '')}`
    }
  });



axiosInstance.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}` || '';
              return config;
          },
          error => { return Promise.reject(error);}
      );