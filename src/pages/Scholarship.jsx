import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import '../App.css';

const Scholarship = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [amount, setAmount] = useState('');
  const selectedType = 'DD Scholarship / Lincoln Fund';

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || parseFloat(value) >= 0) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const parsedAmount = parseFloat(amount);
    
    if (!amount || parsedAmount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount greater than 0',
      });
      return;
    }

    // Create a scholarship product to add to cart
    const scholarshipProduct = {
      id: `scholarship-${Date.now()}`,
      name: selectedType,
      description: `Contribution to ${selectedType}`,
      price: parsedAmount,
      category: 'Scholarship',
      image: 'https://via.placeholder.com/300x220?text=Scholarship'
    };

    // Add to cart
    addToCart(scholarshipProduct);

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${selectedType} contribution of GHS ${parsedAmount.toFixed(2)} has been added to your cart!`,
      timer: 1500,
      showConfirmButton: false,
    });

    // Navigate to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 1500);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">DDL Scholarship </h1>
        {/* <p className="page-description">
          Support education through DD Scholarship and Lincoln Fund contributions
        </p> */}
      </header>

      <div className="scholarship-form-container">
        <form onSubmit={handleSubmit} className="scholarship-form">
          <div className="form-section">
            <h3 className="form-section-title">Enter Contribution Amount</h3>
            <div className="amount-input-section">
              <div className="price-input-container scholarship-input">
                <span className="currency-symbol">GHS</span>
                <input
                  className="price-input"
                  type="number"
                  name="amount"
                  value={amount}
                  placeholder="0.00"
                  onChange={handleAmountChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="amount-note">
                Enter any amount you wish to contribute. Every contribution makes a difference! 💙
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <span>Proceed to Checkout</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Scholarship;
