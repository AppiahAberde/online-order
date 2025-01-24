import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2'
import '../App.css'; // Ensure you import your CSS file

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [price, setPrice] = useState(product.price); // Track user-defined price

  // Handle price input change
  const handlePriceChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    if (inputValue >= 0) {
      setPrice(inputValue); // Only allow positive values
    }
  };

  const handleAddToCart = () => {
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
        <p className="product-price">Price: &#8373; {product.price.toFixed(2)}</p>
        <label htmlFor="price-input">Amount to Pay (In Ghc):</label>
        <div className="form-floating col-sm">          
          <input
            className="form-control"
            type="number"
            id="price-input"
            name="price"
            value={price}
            placeholder="Enter your price"
            onChange={handlePriceChange}
            required
          />
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
