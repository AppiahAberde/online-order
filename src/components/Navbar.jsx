import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import './Navbar.css'; // Ensure the CSS file is created and updated

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link className="logo-link" to="/">
        {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
        {/* <h1 className="logo-text">MyStore</h1> */}
      </Link>

      {/* Menu Icon for Mobile */}
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Navigation Links */}
      <ul className={isMobileMenuOpen ? 'nav-links active' : 'nav-links'}>
        <li>
          <Link className="nav-link" to="/" onClick={toggleMobileMenu}>Home</Link>
        </li>
        {/* <li>
          <Link className="nav-link" to="/products" onClick={toggleMobileMenu}>Products</Link>
        </li>
        <li>
          <Link className="nav-link" to="/about" onClick={toggleMobileMenu}>About</Link>
        </li> */}
        {/* <li>
          <Link className="nav-link" to="/contact" onClick={toggleMobileMenu}>Contact</Link>
        </li> */}
        <li>
          <Link className="nav-link cart-link" to="/cart" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

