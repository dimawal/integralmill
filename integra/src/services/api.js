import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:51428/api"
});


api.interceptors.request.use(async config => {
  const token = getToken();
  config.headers.common['Content-Type'] ='application/x-www-form-urlencoded';
  if (token) {
    //config.headers.common['Authorization'] =  `Bearer ${token}`;
  }
  return config;
});

export default api;