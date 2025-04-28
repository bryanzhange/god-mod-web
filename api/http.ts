import axios from 'axios';

const HTTP = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

HTTP.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default HTTP;
