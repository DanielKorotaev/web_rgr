import React, { useState } from 'react'; // Добавьте этот импорт
import { register } from '../api'; // Создайте функцию регистрации в api.js

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Пароли не совпадают.');
            return;
        }

        try {
            await register(username, password);
            alert('Регистрация прошла успешна, теперь вы можете войти в систему!');
            window.location.href = '/login'; // Перенаправьте пользователя на страницу логина
        } catch (error) {
            setError('Ошибка при регистрации. Попробуйте еще раз.');
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Подтверждение пароля"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}
