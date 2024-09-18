import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Dashboard from './pages/DashBoard/Dashboard';
import Sobre from './pages/Sobre/Sobre';



function App() { 
  const renderizarBotoes = () => (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>
    </div>
  );

  return (
        <Router>
          {renderizarBotoes()}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </Router>
  );
}

export default App;
