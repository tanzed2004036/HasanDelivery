import axios from 'axios';
import React from 'react'

const axiosInstance = axios.create({
  baseURL: "https://hasvery-server.onrender.com",
});
export default function useAxios() {
  return axiosInstance;
}
