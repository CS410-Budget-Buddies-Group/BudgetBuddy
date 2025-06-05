import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const isLoggedIn = true; // Replace with real auth logic

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white px-6 py-4 text-2xl font-bold">💰 Budget Buddy</header>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
