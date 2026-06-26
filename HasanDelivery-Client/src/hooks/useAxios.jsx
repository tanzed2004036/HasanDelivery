import axios from 'axios';
import React from 'react'

const axiosInstance = axios.create({
<<<<<<< HEAD
   baseURL: "https://hasvery-server.onrender.com",
 // baseURL:"http://localhost:5174/",
=======
  baseURL: "https://hasvery-server.onrender.com",
  // baseURL:"http://localhost:5174/",
>>>>>>> 153db39 (upadte)
});
export default function useAxios() {
  return axiosInstance;
}
