import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import BillingForm from './BillingForm';
import '../App.css';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const [billingDetails, setBillingDetails] = useState(null);

  const handleBillingSubmit = (details) => {
    setBillingDetails(details);
    console.log('Billing Details:', details);
  };

  return (
    <div className="checkout-container">
      <h1 className='display-5'>Checkout</h1>

      <div className="checkout-content">
        {/* Cart Items Section */}
        <div className="checkout-items">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <span>{item.name}</span>
                <span>&#8373; {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout-total">
            Total: &#8373; {cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </p>
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
