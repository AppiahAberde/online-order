import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2'
import '../App.css'; // Ensure you import your CSS file

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [price, setPrice] = useState(Number(product.price || 0));

  const handlePriceChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    if (inputValue >= 0 || e.target.value === '') {
      setPrice(inputValue || 0);
    }
  };

  const handleAddToCart = () => {
    if (price <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Amount',
        text: 'Please enter a valid amount greater than 0',
      });
      return;
    }
    addToCart({ ...product, price });
    Swal.fire({
      icon: 'success',
      title: 'Item Added to Cart',
      text: `${product.name} has been successfully added to your cart!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="product-card">
      <img src={product.image} className="product-img" alt={product.name} />
      <div className="product-details">
        <p className="product-name">{product.name}</p>
        <h5 className="product-category">{product.description}</h5>
        <p className="product-category">Sessions: {product.sessions}</p>
        <p className="product-category">Dates: {product.dates}</p>
        
        <div className="price-input-wrapper">
          <label htmlFor={`price-input-${product.id}`} className="price-input-label">
            💰 Enter Amount
          </label>
          <div className="price-input-container">
            <span className="currency-symbol">GHS</span>
            <input
              className="price-input"
              type="number"
              id={`price-input-${product.id}`}
              name="price"
              value={price}
              placeholder="0.00"
              onChange={handlePriceChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <span>Add to Cart</span>
          <span className="btn-icon">🛒</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
