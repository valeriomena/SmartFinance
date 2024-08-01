import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2151', // Cambia esto a la URL de tu backend si es diferente
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default api;
