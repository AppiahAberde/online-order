import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const AsaActivityList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://182.246.109.208.host.secureserver.net/api/lcs/rental')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default AsaActivityList;
