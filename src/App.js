import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import FieldTrips from './pages/FieldTrips';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Index from './pages/Index'
import AsaPage from './pages/Asa';
import RentalPage from './pages/Rental';
import IdCard from './pages/IdCard';

import './App.css';

const App = () => {
  const { pathname } = useLocation
  const history = createBrowserHistory()
  return (
    <div className='App'>
      <CartProvider>
        <Router history={history}>
          <Navbar />
          <Routes>
            {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
            <Route exact path='/' element={<Index />} />
            <Route exact path='/asa' element={<AsaPage />} />
            <Route path="/fieldtrips" element={<FieldTrips />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rental" element={<RentalPage />} />
            <Route path="/idcard" element={<IdCard />} />
            {/* <Redirect from="*" to="/" /> */}
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;

