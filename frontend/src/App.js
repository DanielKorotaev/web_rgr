import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Register from './pages/Register'; // Импортируйте компонент регистрации

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Добавьте маршрут для регистрации */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
