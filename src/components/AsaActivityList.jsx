import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
const server_url = process.env.REACT_APP_SERVER_URL

const AsaActivityList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${server_url}/asaactivity`)
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
