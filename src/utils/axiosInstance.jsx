import axios from 'axios';
import { notyfError } from './notyf';

const axiosInstance = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        
        notyfError("SESI BERAKHIR. SILAKAN LOGIN KEMBALI.");

        setTimeout(() => {
          window.location.href = '/login'; 
        }, 2000);
      }
    }
    
    return Promise.reject(error);
  },
);

export default axiosInstance;