import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 2000
})

export default API