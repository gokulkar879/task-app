import React, { useState } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useUserContext } from './UserContext';
import AuthRoute from './components/AuthRoute';

function App() {
  const {sessionId} = useUserContext();
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute sessionId={sessionId}><HomePage /></ProtectedRoute>}/>
            <Route path="/login" element={<AuthRoute sessionId={sessionId}><LoginPage /></AuthRoute>}/>
            <Route path="/register" element={<AuthRoute sessionId={sessionId}><RegisterPage /></AuthRoute>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
