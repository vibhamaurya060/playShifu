import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductPage.css';

const ProductPage = () => {
  // State for products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using the correct URL for your API
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.data && response.data.products) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);
        } else {
          throw new Error('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // filters, sorting and search
  useEffect(() => {
    let result = [...products];
    
    //  search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.disc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    //  sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, sortBy]);

  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortBy('default');

  };

  // Format price for display
  const formatPrice = (price) => {
    return `₹${(price / 100).toFixed(2)}`;
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-page">
      <h1>Products</h1>
      
      <div className="filters-container">
        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        {/* Sorting */}
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>
        
        
        {/* Reset Filters */}
        <button onClick={handleResetFilters} className="reset-button">
          Reset Filters
        </button>
      </div>
      
      {/* Results count */}
      <div className="results-count">
        {filteredProducts.length} products found
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">No products found matching your criteria</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-description">{product.disc}</p>
                <p className="product-price">{formatPrice(product.price)}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;