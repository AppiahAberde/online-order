import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import '../App.css'; // Ensure you import your CSS file

const BillingForm = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        grade: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value
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
                total
            }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://lincolnpay.lincoln.edu.gh/api/lcs/initiate',
            headers: {
                'Content-Type': 'application/json',
            },
            data
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-row mb-5'>
                    <div className='form-floating col-md'>
                        <span><label>Student First Name</label></span>
                        <input
                            className='form-control'
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={billingDetails.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-floating col-md'>
                        <span><label>Student Last Name</label></span>
                        <input
                            className='form-control'
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={billingDetails.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <span><label>Grade</label></span>
                        <select
                            className="form-select form-select-lg mb-3"
                            aria-label="Select Grade"
                            name="grade"
                            value={billingDetails.grade}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Grade</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                            <option value="Staff">Staff</option>
                        </select>
                    </div>
                    <div className='form-floating col-md'>
                        <span><label>Email</label></span>
                        <input
                            className='form-control'
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email'
                            value={billingDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='row'>
                    <button type="submit">Pay</button>
                    {isModalOpen && <Modal url={modalUrl} onClose={() => setIsModalOpen(false)} />}
                </div>
                <button type="button" className="back-button" onClick={() => navigate(-1)}>Back</button>
            </form>
        </div>
    );
};

export default BillingForm;
