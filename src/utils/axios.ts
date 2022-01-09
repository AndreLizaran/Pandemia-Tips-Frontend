import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pandemia-tips-backend.herokuapp.com',
});

export default axiosInstance;
