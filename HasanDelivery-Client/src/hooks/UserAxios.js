
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  // timeout: 2000,
  // headers: { 'X-Custom-Header': 'foobar' }
});

export default axiosInstance;