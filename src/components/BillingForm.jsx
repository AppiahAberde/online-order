import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
//import '../App.css'; // Ensure you import your custom CSS file
import './BillingForm.css'; // Additional CSS for enhanced styling

const BillingForm = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        grade: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
        const data = JSON.stringify({
            email: billingDetails.email,
            amount: (parseFloat(total) * 100).toFixed(2),
            metadata: {
                ...billingDetails,
                cartItems,
                total,
            },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://lincolnpay.lincoln.edu.gh/api/lcs/initiate',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };

        axios.request(config)
            .then((response) => {
                setModalUrl(response.data.rawResponse.data.authorization_url);
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="billing-form-container">
            <h2 className="form-title">Billing Information</h2>
            <form onSubmit={handleSubmit} className="billing-form">
                <div className="form-row">
                    <div className="form-control col-md">
                        <label htmlFor="firstName">Student First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={billingDetails.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control col-md">
                        <span><label htmlFor="lastName">Student Last Name</label></span>
                        <input
                            className="form-control"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={billingDetails.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md">
                        <label htmlFor="grade">Grade</label>
                        <select
                            className="form-control"
                            name="grade"
                            value={billingDetails.grade}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Grade</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Grade {i + 1}
                                </option>
                            ))}
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div className="form-control col-md">
                        <label htmlFor="email">Payer Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={billingDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        Proceed to Pay
                    </button>
                    {isModalOpen && (
                        <Modal url={modalUrl} onClose={() => setIsModalOpen(false)} />
                    )}
                </div>
                <div>
                <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BillingForm;
