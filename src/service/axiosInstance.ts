import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://34.207.136.206:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
