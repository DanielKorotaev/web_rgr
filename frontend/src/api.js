import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login/`, {
            username,
            password,
        });
        return response.data; // Возвращаем данные (токены)
    } catch (error) {
        throw error.response.data;  // Возвращаем ошибку если что-то не так
    }
};

export const fetchVideos = async () => {
    const response = await axios.get(`${API_URL}/videos/`);
    return response.data;
};
export const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/register/`, { // Обновите на правильный URL вашего API
        username,
        password,
    });
    return response.data;
};
export const uploadVideo = async (videoData, token) => {
    const response = await axios.post(`${API_URL}/videos/`, videoData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};