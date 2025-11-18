import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BillingForm.css';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/lcs';

/**
 * BillingForm component handles the billing information form and payment initiation.
 * 
 * @component
 * @example
 * return (
 *   <BillingForm />
 * )
 * 
 * @returns {JSX.Element} The rendered BillingForm component.
 * 
 * @description
 * This component renders a form for collecting billing information including the student's first name, last name, grade, and payer's email.
 * It provides two payment options: Pay with Card and Pay with MoMo (Mobile Money).
 * 
 * @function handleChange
 * Handles changes to the form inputs and updates the billingDetails state.
 * 
 * @function card_handleSubmit
 * Initiates the payment process using Stripe when the "Pay with Card" button is clicked.
 * 
 * @function momo_handleSubmit
 * Initiates the payment process using Paystack when the "Pay with MoMo" button is clicked.
 * 
 * @returns {void}
 * 
 * @example
 * <button type="button" onClick={card_handleSubmit} className="submit-btn">Pay with Card</button>
 * <button type="button" onClick={momo_handleSubmit} className="submit-btn">Pay with MoMo</button>
 */
const BillingForm = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        grade: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleCardSubmit = async (e) => {
        e.preventDefault();
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
        }
    };

    const handleMomoSubmit = async (e) => {
        e.preventDefault();
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
        }
    };

    return (
        <div className="billing-form-container">
            <h2 className="form-title">Billing Information</h2>
            <form className="billing-form">
                <div className="form-row">
                    <div className="form-control col-md">
                        <label htmlFor="firstName">Student First Name</label>
                        <input type="text" id="firstName" name="firstName" value={billingDetails.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-control col-md">
                        <label htmlFor="lastName">Student Last Name</label>
                        <input type="text" id="lastName" name="lastName" value={billingDetails.lastName} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="grade">Grade</label>
                        <select name="grade" value={billingDetails.grade} onChange={handleChange} required>
                            <option value="" disabled>Select Grade</option>
                            {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Grade {i + 1}</option>)}
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div className="form-control col-md">
                        <label htmlFor="email">Payer Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email" value={billingDetails.email} onChange={handleChange} required />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" onClick={handleCardSubmit} className="submit-btn" disabled={cartItems.length === 0 || !billingDetails.email}>Pay with Card</button>
                    <button type="button" onClick={handleMomoSubmit} className="submit-btn" disabled={cartItems.length === 0 || !billingDetails.email}>Pay with MoMo</button>
                </div>
                <div>
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default BillingForm;
