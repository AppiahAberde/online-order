import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import BillingForm from './BillingForm';
import ConfirmModal from './ConfirmModal';
import '../App.css';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const billingRef = useRef(null);
  const [confirm, setConfirm] = useState({ open: false, method: null });

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const isEmpty = cartItems.length === 0;

  const proceedToCard = () => setConfirm({ open: true, method: 'card' });
  const proceedToMomo = () => setConfirm({ open: true, method: 'momo' });

  const onCancelConfirm = () => setConfirm({ open: false, method: null });

  const onConfirm = () => {
    if (confirm.method === 'card' && billingRef.current?.submitCard) 
      billingRef.current.submitCard();
    if (confirm.method === 'momo' && billingRef.current?.submitMomo) 
      billingRef.current.submitMomo();
    setConfirm({ open: false, method: null });
  };

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <div className="header-content">
          <div className="breadcrumb">Cart → <strong>Checkout</strong> → Payment</div>
          <h1 className="header-title">Complete Your Order</h1>
          <p className="header-subtitle">Fill in your details and choose your payment method</p>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <div className="empty-icon">🛒</div>
            <h2 className="empty-title">Your cart is empty</h2>
            <p className="empty-desc">Add items to get started with your order</p>
            <button className="btn-continue" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Main checkout grid */}
          <div className="checkout-main">
            {/* Left: Billing Form */}
            <div className="checkout-left">
              <div className="form-card">
                <div className="form-card-header">
                  <div className="step-badge">Step 1</div>
                  <h2 className="form-title">Billing Information</h2>
                  <p className="form-subtitle">Enter your details to proceed</p>
                </div>
                <BillingForm ref={billingRef} hideSummary={true} />
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="checkout-right">
              <div className="summary-card sticky-summary">
                <div className="summary-card-header">
                  <div className="step-badge">Step 2</div>
                  <h2 className="summary-title">Order Summary</h2>
                </div>

                {/* Items */}
                <div className="summary-items">
                  <div className="items-list">
                    {cartItems.map((item, index) => (
                      <div key={index} className="summary-item">
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                        </div>
                        <span className="item-price">₵{Number(item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Subtotal</span>
                    <span>₵{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Tax & Fees</span>
                    <span>₵0.00</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span className="total-amount">₵{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="payment-methods">
                  <p className="methods-label">Choose Payment Method</p>
                  <button 
                    className="payment-btn card-btn" 
                    onClick={proceedToCard}
                  >
                    <span className="btn-icon">💳</span>
                    <span className="btn-label">Pay with Card</span>
                    <span className="btn-arrow">→</span>
                  </button>
                  <button 
                    className="payment-btn momo-btn" 
                    onClick={proceedToMomo}
                  >
                    <span className="btn-icon">📱</span>
                    <span className="btn-label">Pay with Mobile Money</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>

                {/* Trust badges */}
                <div className="trust-badges">
                  <div className="badge">🔒 Secure</div>
                  <div className="badge">✓ Fast</div>
                  <div className="badge">💯 Trusted</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ConfirmModal 
        open={confirm.open} 
        title="Confirm Payment" 
        message={confirm.method === 'card' 
          ? 'You will be redirected to Stripe to complete your payment securely.' 
          : 'You will be redirected to Paystack to complete your Mobile Money payment.'}
        onCancel={onCancelConfirm} 
        onConfirm={onConfirm} 
      />
    </div>
  );
};

export default CheckoutPage;
