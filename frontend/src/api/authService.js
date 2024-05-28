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

const login = async (email, password, rememberMe) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, {
            email,
            password
        });

        if (response.data.access_token) {
            const { access_token, refresh_token } = response.data;

            if (rememberMe) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_token', refresh_token);
            }

            await fetchAdminStatus(rememberMe);
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const fetchAdminStatus = async (rememberMe) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        const response = await axios.get(`${API_URL}/user/isAdmin`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const isAdmin = response.data.is_admin;
        if (rememberMe) {
            localStorage.setItem('is_admin', isAdmin);
        } else {
            sessionStorage.setItem('is_admin', isAdmin);
        }
    }
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_admin');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('is_admin');
};

const getAccessToken = () => {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || null;
};

const getAdminState = () => {
    const isAdmin = localStorage.getItem('is_admin') === 'true' || sessionStorage.getItem('is_admin') === 'true';
    return isAdmin;
};

export default {
    register,
    login,
    logout,
    getAccessToken,
    getAdminState
};
