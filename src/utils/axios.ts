import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('jwt');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosInstance };
