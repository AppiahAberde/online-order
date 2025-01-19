import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';  // Make sure to create and import the CSS file

function Index() {
  const navigate = useNavigate();

  const goToTripPage = () => {
    navigate('/fieldtrips');
  };

  const goToAsaPage = () => {
    navigate('/asa');
  };

  const goToRentalPage = () => {
    navigate('/rental');
  };

  const goToIdCard = () => {
    navigate('idcard');
  };

  return (
    <div className="index-container">
      {/* Header Section with Logo */}
      <header className="header">
      <h1 className="display-5 text-white">Welcome to Our Services</h1>
      </header>

      {/* Interactive Button Section */}
      <div className="services-grid">
        <div className="service-card" onClick={goToTripPage}>
          {/* <img src="" alt="FieldTrips" className="service-icon" /> */}
          <h2>Field Trips</h2>
          <p>Explore and manage field trips</p>
        </div>

        <div className="service-card" onClick={goToAsaPage}>
          {/* <img src="https://lincolnpay.lincoln.edu.gh/static/media/Receivables%20listing%20for%20Paystack%20Tabs-07.jpg" alt="After School Activity" className="service-icon" /> */}
          <h2>After School Activities</h2>
          <p>Sign up for after-school programs</p>
        </div>

        <div className="service-card" onClick={goToRentalPage}>
          {/* <img src="laptop-icon.png" alt="Laptop Rentals" className="service-icon" /> */}
          <h2>Laptop Rentals</h2>
          <p>Rent a laptop for your projects</p>
        </div>

        <div className="service-card" onClick={goToIdCard}>
          {/* <img src="idcard-icon.png" alt="ID Card Replacement" className="service-icon" /> */}
          <h2>ID Card Replacement</h2>
          <p>Request a replacement for your ID card</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
