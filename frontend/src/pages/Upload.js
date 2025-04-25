import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

export default function VideoUpload() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/api/videos/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Видео успешно загружено как Аноним.');
        } catch (error) {
            setMessage('Ошибка загрузки видео.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Загрузить видео</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Название видео"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Загрузить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Upload;