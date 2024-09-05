import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from '../images/Receivables listing for Paystack - website_Home Banner.jpg'
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
    navigate('/rental')
  }

  const goToIdCard = () => {
    navigate('idcard')
  }

  // go to rental and id card page

  return (
    <div className="index-container" style ={{
      backgroundImage: `url(${bgImg})`
    }}>
      <h1 className="display-5" style={{color: 'white'}}>Welcome</h1>
      <div className="button-row">
        <button className="custom-button" onClick={goToTripPage}><p className='lead'>FieldTrips</p></button>
        <button className="custom-button" onClick={goToAsaPage}><p className='lead'>After School Activity</p></button>
        <button className="custom-button" onClick={goToRentalPage}><p className='lead'>Laptop Rentals</p></button>
        <button className="custom-button" onClick={goToIdCard}><p className='lead'>ID Card Replacement</p></button>
      </div>
      {/* <div className="button-row">
        <button className="custom-button" onClick={goToTripPage}><p className='lead'>FieldTrips</p></button>
        <button className="custom-button" onClick={goToAsaPage}><p className='lead'>After School Activity</p></button>
        <button className="custom-button" onClick={goToRentalPage}><p className='lead'>Laptop Rentals</p></button>
      </div> */}
    </div>
  );
}

export default Index;
