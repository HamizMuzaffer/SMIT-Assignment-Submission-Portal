import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'https://smit-server.vercel.app', 
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
