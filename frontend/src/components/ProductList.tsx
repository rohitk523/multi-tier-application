import React, { useState, useEffect } from 'react';
import { productsAPI, Product } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getProducts();
        setProducts(response.data.products);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Products</h1>
        <button className="btn btn-primary">
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="card">
          <p>No products available.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div style={{ marginBottom: '1rem' }}>
                  <small>Stock: {product.stock} units</small>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1 }}>
                    Edit
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 