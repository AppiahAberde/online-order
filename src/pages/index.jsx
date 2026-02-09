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

  const goToScholarship = () => {
    navigate('/scholarship');
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
          <h2>Activities Payment</h2>
          <p>Make payments for Lincoln Fund, ASA, WAISAL, and summer camp</p>
        </div>

        <div className="service-card" onClick={goToRentalPage}>
          {/* <img src="laptop-icon.png" alt="Laptop Rentals" className="service-icon" /> */}
          <h2>Laptop Rentals</h2>
          <p>Rent a laptop for your projects</p>
        </div>

        <div className="service-card" onClick={goToIdCard}>
          {/* <img src="idcard-icon.png" alt="ID Card Replacement" className="service-icon" /> */}
          <h2>ID Card Replacement / Yearbook Payment</h2>
          <p>Request a replacement for your ID card</p>
        </div>

        <div className="service-card" onClick={goToScholarship}>
          {/* <img src="scholarship-icon.png" alt="DD Scholarship" className="service-icon" /> */}
          <h2>DDL Scholarship</h2>
          <p>Contribute to scholarships and Lincoln Fund</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
