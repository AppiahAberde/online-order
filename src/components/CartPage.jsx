import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import '../App.css'; // Ensure you import your CSS file

/**
 * CartPage component displays the items added to the cart and provides options to remove items or proceed to checkout.
 *
 * @component
 * @example
 * return (
 *   <CartPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @description
 * - Uses `useContext` to access `cartItems` and `removeFromCart` from `CartContext`.
 * - Uses `useNavigate` from `react-router-dom` for navigation.
 * - Displays a message if the cart is empty.
 * - Lists all items in the cart with their name and price.
 * - Provides a button to remove items from the cart.
 * - Provides a button to proceed to the checkout page if there are items in the cart.
 * - Provides a button to navigate back to the previous page.
 */
const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-price">${item.price}</span>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-actions">
        {cartItems.length > 0 && (
          <button
            className="checkout-button"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
      <br />
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default CartPage;
