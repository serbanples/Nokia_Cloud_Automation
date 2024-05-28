import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens && tokens.access_token) {
        config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle responses
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login or refresh token
    }
    return Promise.reject(error);
});

const register = (username, email, password) => {
    return axiosInstance.post('/user/register', {
        username,
        email,
        password
    });
};

const login = (email, password, rememberMe) => {
    return axios.post(`${API_URL}/user/login`, {
        email,
        password
    }).then(response => {
        if (response.data.access_token) {
            const { access_token, refresh_token } = response.data;
            if (rememberMe) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_token', refresh_token);
            }
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
};

const getAccessToken = () => {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || null;

};

export default {
    register,
    login,
    logout,
    getAccessToken
};
