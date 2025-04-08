
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navber-container">
            <Link to="/" className="navbar-log">
            <span className="logo-text">PlayShifu</span>
            </Link>
            <Link to="/products" className="nav-link">Products</Link>
        </div>
    </nav>
  )
}

export default Navbar;