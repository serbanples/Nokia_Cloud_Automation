import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const register = (username, email, password) => {
    return axios.post(`${API_URL}/user/register`, {
        username,
        email,
        password
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/user/login`, {
        email,
        password
    }).then(response => {
        if (response.data.access_token) {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('tokens', JSON.stringify({ access_token, refresh_token }));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
};

const getAccessToken = () => {
    const tokens =  JSON.parse(localStorage.getItem('tokens'));
    return tokens ? tokens.access_token : null;
}

export default {
    register,
    login,
    logout,
    getAccessToken
};
