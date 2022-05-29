import axios from "axios";

export const API_URL = "http://127.0.0.1:5000"
const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default api;