// api.js
import axios from 'axios';

//console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL); // Línea de depuración

const api = axios.create({
    baseURL: 'https://smartfinance-api.onrender.com', // Usando la variable de entorno
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default api;
