import axios from 'axios';
import AuthService from './authService';

const API_URL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = AuthService.getAccessToken();
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login or refresh token
        }
        return Promise.reject(error);
    }
);

// Define your API functions using the Axios instance
const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/data/read');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const connectSSH = async (name, VM1) => {
    try {
        const response = await axiosInstance.post('/connect', { name, VM1 });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/user/user');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    fetchData,
    connectSSH,
    getCurrentUser
};
