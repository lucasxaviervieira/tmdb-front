import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer `;
    return config;
});


export default api;