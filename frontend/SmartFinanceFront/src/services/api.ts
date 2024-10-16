// api.js
import axios from 'axios';

//console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL); // Línea de depuración

const api = axios.create({
    baseURL: 'http://localhost:4000', // Usando la variable de entorno
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default api;
