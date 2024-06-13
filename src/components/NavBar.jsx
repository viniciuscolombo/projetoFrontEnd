import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import './NavBar.css'

function NavBar() {
    return (
        <div>
            <span style={{padding: '8px'}}><NavLink to={'/'} className={({isActive}) => (isActive ? 'active': '')}>Home</NavLink></span>
            <span style={{padding: '8px'}}><NavLink to={'/products'} className={({isActive}) => (isActive ? 'active': '')}>Produtos</NavLink></span>
        </div>
    )
}

export default NavBar