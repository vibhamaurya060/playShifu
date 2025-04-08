
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">PlayShifu</span>
                </Link>
                <Link to="/products" className="nav-link">
                    Products
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;