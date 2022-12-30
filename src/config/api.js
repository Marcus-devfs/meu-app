import axios from "axios";

 const api = axios.create({
  baseURL: "http:/192.168.68.108:3000",
});

export default api;
