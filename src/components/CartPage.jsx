import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import './CartPage.css'; // Use a dedicated CSS file

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const isEmpty = cartItems.length === 0;

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty > 0) updateQuantity(index, newQty);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {isEmpty ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item fade-in">
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <div className="cart-item-qty-price">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      className="quantity-input"
                    />
                    <span className="cart-item-price">Ghc {(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => handleRemove(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <span>Total: Ghc {totalPrice.toFixed(2)}</span>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      <div className="back-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default CartPage;
