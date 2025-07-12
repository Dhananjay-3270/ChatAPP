import axios from 'axios';
import {StatusCode} from "../core/utils/enum"
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
const DEFAULT_TIMEOUT = 60 * 1000 * 3;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const domain = import.meta.env.VITE_DOMAIN;
const apiClient = axios.create({
    baseURL: baseUrl,
    timeout: DEFAULT_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    config.headers.domain = domain;
    config.withCredentials = true;
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
        return config;
    } else {
        return config;
    }
});

apiClient.interceptors.response.use(
    (response) => {
        return { ...response.data, status: response.status };
    },
    (error) => {
        if (error?.response?.data?.errorCode === StatusCode.UNAUTHORIZED) {
            localStorage.removeItem('user');
            window.location.href = window.location.origin + '/login';
            return Promise.reject({ ...error.response });
        } else {
            return Promise.reject(error);
        }
    },
);

export class NetworkManager {
    static MyInstance: NetworkManager;
    static getInstance(): NetworkManager {
        if (!NetworkManager.MyInstance) {
            NetworkManager.MyInstance = new NetworkManager();
        }
        return NetworkManager.MyInstance;
    }
    apiClient = apiClient;

    appRequest = async (options: AxiosRequestConfig) => {
        return apiClient(options) as Promise<AxiosResponse | any>;
    };
}