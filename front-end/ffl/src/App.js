import './App.css';
import Table from './components/table.js';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/login.js';
import HomePage from './components/home.js';
import NavBar from './components/navbar.js';
import MyTeam from './components/myteam.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token] = useState(localStorage.getItem("token"))

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    window.location = "/table";
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location = "/login";
  };
  const logoClick = () => {
    window.location = "/"
  }
  return (
    <div>
      {isLoggedIn && <NavBar logoClick={logoClick} onLogout={handleLogout} />}
      <Router>
        <Routes>
        {!token ? (
        <>
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* Redirect logged-in users away from /login or /register */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/table" element={<Table />} />
          <Route path="/myteam" element={<MyTeam />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </>
      )}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
