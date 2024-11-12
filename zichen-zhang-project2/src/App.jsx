import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Rules from './pages/Rules';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:difficulty" element={<Game />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;

