
import axios from 'axios';
import { API_URL } from '../constants/server-const';

export const axiosPublic = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});