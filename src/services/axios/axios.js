import axios from 'axios'
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
console.log(SERVER_URL)
const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {  
        'Content-Type': 'application/json',

    }
});
export const axiosFormData = axios.create({
    baseURL: SERVER_URL,
});

export function SetHeaderToken(token)
{
    axiosInstance.defaults.headers.common['Authorization'] ="Bearer "+token;
    axiosFormData.defaults.headers.common['Authorization'] ="Bearer "+token;
    axiosFormData.defaults.headers.common['Content-Type'] ="multipart/form-data";
}
export default axiosInstance;
