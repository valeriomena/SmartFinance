import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
