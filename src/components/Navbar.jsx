import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import './Navbar.css'; // Make sure to create and import the CSS file

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
