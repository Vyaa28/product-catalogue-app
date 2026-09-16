import axios from 'axios';

const DEFAULT_TIMEOUT = 10000; // 10 seconds

export const createAxiosHttpClient = () => {
    const instance = axios.create({
        
        baseURL: "https://dummyjson.com",
        timeout: DEFAULT_TIMEOUT,
    });
    return instance;
};