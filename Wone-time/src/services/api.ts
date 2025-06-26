// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL:  import.meta.env.VITE_BASE_API_URL, // Replace with your real base URL

});

export default api;