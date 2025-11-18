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
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const isEmpty = cartItems.length === 0;

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleQuantityChange = (index, newQty) => {
    if (newQty > 0) updateQuantity(index, newQty);
  };

  if (isEmpty) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
        </div>

        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2 className="empty-title">Your cart is empty</h2>
          <p className="empty-desc">Start shopping to add items to your cart</p>
          <button className="btn-start-shopping" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <div className="header-top">
          <h1 className="cart-title">Shopping Cart</h1>
          <button className="btn-back-header" onClick={() => navigate(-1)}>
            ← Continue Shopping
          </button>
        </div>
        <div className="header-meta">
          <span className="item-count">{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-main">
        {/* Items List */}
        <div className="cart-items-section">
          <div className="items-header">
            <span>Items</span>
            <span className="qty-price-header">Quantity × Price</span>
          </div>

          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-unit-price">₵{Number(item.price).toFixed(2)} each</span>
                </div>

                <div className="item-controls">
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                      aria-label="Item quantity"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="item-total-price">₵{(item.price * (item.quantity || 1)).toFixed(2)}</span>

                  <button
                    className="remove-btn"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => handleRemove(index)}
                    title="Remove from cart"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="cart-summary-sidebar">
          <div className="summary-card">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Subtotal</span>
                <span>₵{totalPrice.toFixed(2)}</span>
              </div>
              <div className="breakdown-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="breakdown-row">
                <span>Tax</span>
                <span>₵0.00</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">₵{totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="btn-checkout"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <button
              className="btn-continue"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
