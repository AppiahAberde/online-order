import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FieldProductCard from './fieldTripProcductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://lincolnpay.lincoln.edu.gh/api/lcs/fieldtrips')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <FieldProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
