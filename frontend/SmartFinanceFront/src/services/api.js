import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:27017', // Cambia esto al puerto y la dirección correcta de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
