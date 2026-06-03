import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import UseAuth from "./useAuth";


const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, Logout} = UseAuth();
  const navigate = useNavigate();
  

  useEffect(() => {

    // Add a request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = user?.accessToken;

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // response interceptor for handling unauthorized access
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorResponse = error.response;
        if (errorResponse?.status === 401 || errorResponse?.status === 403) {
          
          Logout().then(() => {
            navigate("/auth/login");
          }); 
        } 
        return Promise.reject(error);
      }
    );

    // Eject the interceptor when the component unmounts
        return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };

  }, [user, Logout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
