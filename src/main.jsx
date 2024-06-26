import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import UserTable from './routes/UserTable';
import ServiceTable from './routes/ServiceTable';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="home" element={<Home />} />  
          <Route path="users" element={<UserTable />} />
          <Route path="products" element={<ServiceTable />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
