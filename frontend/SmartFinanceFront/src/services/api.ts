// api.ts

import axios from 'axios';

/**
 * Axios instance for making HTTP requests to the backend API.
 * Configured with a base URL, default headers, and a request timeout.
 * Adds an Authorization token to each request if it exists in localStorage.
 *
 * @constant
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:4000', // Base URL for the API requests
  timeout: 1000,                    // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

/**
 * Axios request interceptor to include Authorization header with a Bearer token.
 * Reads token from localStorage and attaches it to request headers.
 *
 * @function
 * @param {AxiosRequestConfig} config - The configuration of the outgoing Axios request.
 * @returns {AxiosRequestConfig} Updated request configuration with Authorization header if token is available.
 * @throws {Promise} Rejected promise if the request fails.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('== Interceptor - Token from localStorage:', token); // Log 1: Verificar si el token está presente
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('== Interceptor - Authorization Header set:', config.headers.Authorization); // Log 2
    } else {
      console.warn('== Interceptor - No token found, request may be rejected');
    }
    return config;
  },
  (error) => {
    console.error('== Interceptor Error:', error); // Log 3
    return Promise.reject(error);
  }
);

export default api;