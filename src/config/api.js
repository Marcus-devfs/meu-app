import axios from "axios";

 const api = axios.create({
  baseURL: "http://192.168.14.131:3000",
});

export default api;
