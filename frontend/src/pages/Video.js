import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Video.css'; // Создайте этот файл для стилей

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/videos/${id}/`);
        console.log('Данные видео:', response.data); // Для отладки
        setVideo(response.data);
      } catch (err) {
        console.error('Ошибка загрузки видео:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="loading">Загрузка видео...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!video) return <div className="not-found">Видео не найдено</div>;

  return (
    <div className="video-container">
      <h1 className="video-title">{video.title}</h1>
      
      <div className="video-player-wrapper">
        <video 
          controls 
          className="video-player"
          poster={video.thumbnail ? `http://localhost:8000${video.thumbnail}` : undefined}
        >
          <source 
            src={`http://localhost:8000${video.file}`} 
            type={`video/${video.file.split('.').pop()}`} 
          />
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      </div>

      <div className="video-meta">
        <p className="video-description">{video.description}</p>
        <div className="video-views">Просмотров: {video.views}</div>
        <div className="video-author">Автор: {video.author}</div>
      </div>
    </div>
  );
}

export default Video;