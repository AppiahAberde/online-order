import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

const server_url = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/lcs'

const AsaActivityList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${server_url}/asaactivity`, { signal: controller.signal })
        if (!mounted) return
        setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!mounted) return
        setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()

    return () => {
      mounted = false
      controller.abort()
    }
  }, [])

  if (loading) return <div className="product-list">Loading...</div>
  if (error) return <div className="product-list">Error loading activities.</div>

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={product.id ?? product.name ?? index} product={product} />
      ))}
    </div>
  )
}

export default AsaActivityList
