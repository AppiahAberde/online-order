import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../App.css'; // Ensure you import your CSS file

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [size] = useState('Regular');
  const [price] = useState(product.price);

  // const handleSizeChange = (e) => {
  //   const selectedSize = e.target.value;
  //   setSize(selectedSize);
  //   if (selectedSize === 'Large') {
  //     setPrice(product.price * 1.1);
  //   } else if (selectedSize === 'Extra Large') {
  //     setPrice(product.price * 1.2);
  //   } else {
  //     setPrice(product.price);
  //   }
  // };
  // console.log(product)

  return (
    <div className="product-card">
      <img src={product.image} className="product-img" alt={product.name} />
      <div className="product-details">
        <p className="product-name">{product.name}</p>
        <h5 className="product-category">{product.description}</h5>
        {/* <p className='product-category'>Sessions: {product.sessions}</p>
        <p className="product-category">Dates: {product.dates}</p> */}
        <p className="product-price">Price: &#8373; {price.toFixed(2)}</p>
        {/* <div className="form-group">
          <label htmlFor={`size-select-${product.id}`} className="size-label">Size:</label>
          <select
            id={`size-select-${product.id}`}
            className="size-select"
            value={size}
            onChange={handleSizeChange}
          >
            <option value="Regular">Regular</option>
            <option value="Large">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
        </div> */}
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart({ ...product, size, price })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
