import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IdCardProductList from './IdCardProductCard'
const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/lcs'


const IdCardList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${server_url}/idcard`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <IdCardProductList key={index} product={product} />
      ))}
    </div>
  );
};

export default IdCardList;
