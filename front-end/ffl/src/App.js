import './App.css';
import DraftBoard from './components/draftboard.js';
import { useEffect, useState } from 'react';
import { BrowserRouter as HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/login.js';
import HomePage from './components/home.js';
import NavBar from './components/navbar.js';
import MyTeam from './components/myteam.js';
import DraftDialog from './components/draftdialog.js';
import { SignalRProvider } from './playerssocket.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamID] = useState(localStorage.getItem("teamID"))

  useEffect(() => {
    const teamID = localStorage.getItem('teamID');
    if (teamID) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogin = (teamID, admin) => {
    localStorage.setItem('teamID', teamID);
    localStorage.setItem('admin', admin);
    setIsLoggedIn(true);
    window.location = "/draftboard";
  };
  const handleLogout = () => {
    localStorage.removeItem('teamID');
    localStorage.removeItem('admin');
    setIsLoggedIn(false);
    window.location = "/login";
  };
  const logoClick = () => {
    window.location = "/"
  }
  return (
      <SignalRProvider>
      {isLoggedIn && <NavBar logoClick={logoClick} onLogout={handleLogout} />}
      <HashRouter>
        <Routes>
        {!teamID ? (
        <>
          <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {/* Redirect logged-in users away from /login or /register */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path='/' element={<HomePage />} />
          <Route path="/draftboard" element={<DraftBoard />} />
          <Route path="/myteam" element={<MyTeam />} />
          <Route path="/dialog" element={<DraftDialog/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />

        </>
      )}

        </Routes>
      </HashRouter>
      </SignalRProvider>
  );
}

export default App;
