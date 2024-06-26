import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className="navbar">
            <span><NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : undefined)}>Home</NavLink></span>
            <span><NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : undefined)}>Serviços</NavLink></span>
            <span><NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : undefined)}>Usuários</NavLink></span>
            <span><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : undefined)}>Login</NavLink></span>
        </nav>
    );
}

export default NavBar;
