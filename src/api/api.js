import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_URL = "http://68.183.222.195:8080/api/v1/";

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${cookies.get("access")}`
    };
    // you can also do other modification in config
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response
    .use(response => {
            if(response && response.data && response.status === 200 || response.status === 201 || response.status === 202){
                return response.data;
            }
        },
        async  (error) => {
            const originalRequest = error.config;
            if(error.response.status === 401 && error.config){
                // eslint-disable-next-line no-unused-expressions
                try{
                    let response = await axios.post(`${API_URL}token/refresh`, {
                        refresh: cookies.get("refresh")
                    });
                    cookies.set("access", response.data.access, { path: '/' });
                    return await api.request(originalRequest)
                }catch (e) {
                    console.log("Не авторизован")
                }
            }
            throw error;
        });
