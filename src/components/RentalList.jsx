import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/lcs'


/**
 * AsaActivityList component fetches a list of rental products from the server
 * and displays them using the ProductCard component.
 *
 * @component
 * @example
 * return (
 *   <AsaActivityList />
 * )
 *
 * @returns {JSX.Element} A div containing a list of ProductCard components.
 */
const AsaActivityList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${server_url}/rental`)
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
