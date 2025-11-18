import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2'
import '../App.css'; // Ensure you import your CSS file

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const price = Number(product.price || 0);

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
        <p className="product-price"><span>Price: Ghc {price.toFixed(2)}</span></p>

        <div className="product-actions">
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
