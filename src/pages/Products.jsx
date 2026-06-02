import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import defaultProducts from '../data/products'

function getProducts() {
  const stored = localStorage.getItem('sh_products')
  if (stored) {
    return JSON.parse(stored)
  }
  localStorage.setItem('sh_products', JSON.stringify(defaultProducts))
  return defaultProducts
}

export default function Products() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const toast = useToast()
  
  const [filter, setFilter] = useState('all')
  
  const allProducts = getProducts()
  
  // Filter products by category
  let filteredProducts = []
  if (filter === 'all') {
    filteredProducts = allProducts
  } else {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].category === filter) {
        filteredProducts.push(allProducts[i])
      }
    }
  }

  function handleAddToCart(e, product) {
    e.stopPropagation()
    
    const size = product.sizes ? product.sizes[0] : 'M'
    const colour = product.colours ? product.colours[0].name : 'Default'
    
    addToCart(product, size, colour, product.img)
    toast(product.name + ' added to cart!')
  }

  function handleWishlist(e, product) {
    e.stopPropagation()
    
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      toast('Removed from wishlist.', 'info')
    } else {
      addToWishlist(product)
      toast(product.name + ' added to wishlist!')
    }
  }
  
  function handleProductClick(product) {
    if (product.colours) {
      navigate('/product/' + product.id)
    }
  }

  return (
    <>
      <Navbar />
      
      <div className="section-pad bg-white" style={{ paddingBottom: 20 }}>
        <p className="section-title">OUR COLLECTION</p>
        <h2 className="section-heading" style={{ marginBottom: 0 }}>All Products</h2>
      </div>
      
      <div className="filter-bar">
        <button 
          onClick={() => setFilter('all')} 
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}>
          All
        </button>
        <button 
          onClick={() => setFilter('men')} 
          className={filter === 'men' ? 'filter-btn active' : 'filter-btn'}>
          Men
        </button>
        <button 
          onClick={() => setFilter('women')} 
          className={filter === 'women' ? 'filter-btn active' : 'filter-btn'}>
          Women
        </button>
        <button 
          onClick={() => setFilter('kids')} 
          className={filter === 'kids' ? 'filter-btn active' : 'filter-btn'}>
          Kids
        </button>
        <button 
          onClick={() => setFilter('baby')} 
          className={filter === 'baby' ? 'filter-btn active' : 'filter-btn'}>
          Baby
        </button>
        <button 
          onClick={() => setFilter('sale')} 
          className={filter === 'sale' ? 'filter-btn active' : 'filter-btn'}>
          Sale
        </button>
      </div>
      
      <div className="section-pad">
        {filteredProducts.length === 0 && (
          <p style={{ color: '#8b4513', textAlign: 'center' }}>No products found.</p>
        )}
        
        <div className="grid-4">
          {filteredProducts.map(product => {
            const wishlisted = isWishlisted(product.id)
            const clickable = product.colours ? true : false
            
            return (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product)} 
                className="product-card" 
                style={{ cursor: clickable ? 'pointer' : 'default', position: 'relative' }}>
                
                <button 
                  onClick={e => handleWishlist(e, product)} 
                  style={{
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    background: '#fff', 
                    border: '1px solid #e0c9a6',
                    borderRadius: '50%', 
                    width: 34, 
                    height: 34, 
                    cursor: 'pointer', 
                    fontSize: 16, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1
                  }}>
                  {wishlisted ? '❤️' : '🤍'}
                </button>
                
                <img src={product.img} alt={product.name} className="product-img" />
                
                <div className="product-info">
                  <p className="product-cat">{product.category}</p>
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">Rs. {product.price}</p>
                  <button onClick={e => handleAddToCart(e, product)} className="product-add-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <Footer />
    </>
  )
}
