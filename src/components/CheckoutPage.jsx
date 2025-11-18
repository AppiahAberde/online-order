import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import BillingForm from './BillingForm';
import '../App.css';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const [billingDetails, setBillingDetails] = useState(null);

  const handleBillingSubmit = (details) => {
    setBillingDetails(details);
    console.log('Billing Details:', details);
    // TODO: Call your payment initiation here
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-content">
        {/* Cart Items Section */}
        <div className="checkout-items">
          <h2>Order Summary</h2>
          <ul className="checkout-item-list">
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">Ghc {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <strong>Total: Ghc {totalPrice.toFixed(2)}</strong>
          </div>
        </div>

        {/* Billing Form Section */}
        <div className="checkout-billing">
          
          <BillingForm onSubmit={handleBillingSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
