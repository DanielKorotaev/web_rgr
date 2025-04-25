import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Добавляем токен в заголовки по умолчанию
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      
      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Неверное имя пользователя или пароль');
      } else {
        setError('Ошибка сервера. Попробуйте позже.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;