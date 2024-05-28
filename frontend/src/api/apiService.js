import axios from 'axios';
import AuthService from './authService';

axios.interceptors.request.use(
    config => {
        const access_token = AuthService.getAccessToken();
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const API_URL = 'http://127.0.0.1:5000';

const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const connectSSH = async (name, VM1) => {
    try {
        const response = await axios.post(`${API_URL}/connect`, { name, VM1 });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/user`);
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
