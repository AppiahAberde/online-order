import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IdCardProductList from './IdCardProductCard'

const IdCardList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://208.109.246.182:3000/lcs/idcard')
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
