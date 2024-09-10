import axios from 'axios';
const BASE_URL = 'https://crisp-popular-pheasant.ngrok-free.app';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;