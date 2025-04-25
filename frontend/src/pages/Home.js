import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Создайте этот файл для стилей

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos/', {
          params: { search: searchQuery }
        });
        setVideos(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Ошибка загрузки видео:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery]);

  if (loading) return <div className="loading">Загрузка видео...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Видео Платформа</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск видео..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <nav>
          <Link to="/upload" className="upload-button">Загрузить видео</Link>
        </nav>
      </header>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-card">
              <Link to={`/video/${video.id}`}>
                <div className="video-thumbnail">
                  {video.thumbnail ? (
                    <img src={`http://localhost:8000${video.thumbnail}`} alt={video.title} />
                  ) : (
                    <div className="thumbnail-placeholder">No thumbnail</div>
                  )}
                </div>
                <h3 className="video-title">{video.title}</h3>
                <p className="video-author">Автор: {video.author}</p>
                <p className="video-views">Просмотров: {video.views}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-videos">Видео не найдены</div>
        )}
      </div>
    </div>
  );
}

export default Home;