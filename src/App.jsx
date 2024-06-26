import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const location = useLocation();

  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginRoute && <NavBar />}
      <main className="main-content">
        <Outlet />
      </main>
      {!isLoginRoute && <Footer />}
    </div>
  );
}

export default App;
