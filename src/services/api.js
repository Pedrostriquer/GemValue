import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendgemas.softwarehousecaiuademello.com.br/api/',
});

export default api;