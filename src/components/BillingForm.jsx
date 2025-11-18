import React, { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BillingForm.css';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/lcs';

// BillingForm component - collects student/payer info and initiates payment via Stripe or Paystack
const BillingForm = forwardRef(({ hideSummary = false }, ref) => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        grade: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleCardSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!billingDetails.email || cartItems.length === 0) return;
        setIsSubmitting(true);
        const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
        const amountInCents = Math.round(total * 100);

        try {
            const response = await axios.post(
                `${server_url}/stripeinitiate`,
                {
                    email: billingDetails.email,
                    amount: amountInCents,
                    metadata: { ...billingDetails, cartItems, total }
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const redirectUrl = (response.data && (response.data.url || response.data.checkout_url || response.data.sessionUrl)) || null;
            if (redirectUrl) {
                window.open(redirectUrl, '_blank');
            } else {
                console.warn('No redirect URL returned from stripe initiation', response.data);
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMomoSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!billingDetails.email || cartItems.length === 0) return;
        setIsSubmitting(true);
        const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
        const amountInCents = Math.round(total * 100);

        try {
            const response = await axios.post(
                `${server_url}/paystackinitiate`,
                {
                    email: billingDetails.email,
                    amount: amountInCents,
                    metadata: { ...billingDetails, cartItems, total }
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const authorizationUrl = response?.data?.data?.authorization_url;
            if (authorizationUrl) {
                window.open(authorizationUrl, '_blank');
            } else {
                console.warn('No authorization_url returned from paystack initiation', response.data);
            }
        } catch (error) {
            console.error('Error during payment initiation:', error.message || error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // expose methods to parent via ref
    useImperativeHandle(ref, () => ({
        submitCard: () => handleCardSubmit && handleCardSubmit(),
        submitMomo: () => handleMomoSubmit && handleMomoSubmit(),
    }));

    return (
        <form className="billing-form" onSubmit={(e) => e.preventDefault()}>
            {/* Personal Information Section */}
            <div className="form-section">
                <h3 className="section-label">Personal Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={billingDetails.firstName} 
                            onChange={handleChange} 
                            placeholder="John"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={billingDetails.lastName} 
                            onChange={handleChange} 
                            placeholder="Doe"
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* School Information Section */}
            <div className="form-section">
                <h3 className="section-label">School Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="grade">Grade / Level</label>
                        <select 
                            name="grade" 
                            id="grade"
                            value={billingDetails.grade} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="" disabled>Select your grade</option>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Grade {i + 1}</option>)}
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="you@example.com"
                            value={billingDetails.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
            </div>

            {/* Payment Actions */}
            {/* <div className="form-actions">
                <button 
                    type="button" 
                    onClick={handleCardSubmit} 
                    className="btn-action btn-card"
                    disabled={isSubmitting || cartItems.length === 0 || !billingDetails.email} 
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Proceed to Card Payment'}
                </button>
                <button 
                    type="button" 
                    onClick={handleMomoSubmit} 
                    className="btn-action btn-momo"
                    disabled={isSubmitting || cartItems.length === 0 || !billingDetails.email} 
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Proceed to Mobile Money'}
                </button>
            </div> */}

            {/* Back Button */}
            <button 
                type="button" 
                className="btn-back" 
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
            >
                ← Back to Cart
            </button>
        </form>
    );
});

export default BillingForm;
