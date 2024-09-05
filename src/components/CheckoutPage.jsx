import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import BillingForm from './BillingForm';
import '../App.css';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const [setBillingDetails] = useState(null);

  const handleBillingSubmit = (details) => {
    setBillingDetails(details);
    // Here you can handle the billing details submission (e.g., sending to backend)
    console.log('Billing Details:', details);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
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
      <BillingForm onSubmit={handleBillingSubmit} />
      {/* {billingDetails && (
        <div className="billing-details">
          <h2>Billing Details</h2>
          <p>Name: {billingDetails.name}</p>
          <p>Address: {billingDetails.address}, {billingDetails.city}, {billingDetails.state}, {billingDetails.zip}</p>
          <p>Card Number: **** **** **** {billingDetails.cardNumber.slice(-4)}</p>
        </div>
      )} */}
    </div>
  );
};

export default CheckoutPage;
