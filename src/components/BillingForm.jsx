import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BillingForm.css';

const server_url = process.env.REACT_APP_SERVER_URL;

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

    const card_handleSubmit = async (e) => {
        e.preventDefault();
        const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        try {
            const response = await axios.post(`${server_url}/stripeinitiate`, {
                email: billingDetails.email,
                amount: (parseFloat(total) * 100).toFixed(2),
                metadata: { ...billingDetails, cartItems, total },
            }, { headers: { 'Content-Type': 'application/json' } });

            if (response.data.url) {
                window.open(response.data.url, '_blank');
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
        }
    };

    const momo_handleSubmit = async (e) => {
        e.preventDefault();
        const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        try {
            const rateResponse = await axios.get(`${server_url}/ghsrate`);
            const rate = parseFloat(rateResponse.data.rate);
            if (isNaN(rate)) {
                throw new Error("Invalid exchange rate received.");
            }

            const response = await axios.post(`${server_url}/paystackinitiate`, {
                email: billingDetails.email,
                amount: (parseFloat(total) * rate * 100).toFixed(2),
                metadata: { ...billingDetails, cartItems, total },
            }, { headers: { 'Content-Type': 'application/json' } });

            const authorizationUrl = response.data.data.authorization_url;
            console.log("Authorization URL:", authorizationUrl);

            if (authorizationUrl) {
                window.open(authorizationUrl, '_blank');
            }
        } catch (error) {
            console.error("Error during payment initiation:", error.message);
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
                    <button type="button" onClick={card_handleSubmit} className="submit-btn">Pay with Card</button>
                    <button type="button" onClick={momo_handleSubmit} className="submit-btn">Pay with MoMo</button>
                </div>
                <div>
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default BillingForm;
