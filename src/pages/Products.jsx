import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import products from '../data/products'

const categories = ['all', 'men', 'women', 'kids', 'baby', 'sale']

export default function Products() {
  const [filter, setFilter] = useState('all')
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

  function handleAddToCart(e, product) {
    e.stopPropagation()
    addToCart(product, 'M', 'Default', product.img)
    alert(product.name + ' added to cart!')
  }

  return (
    <>
      <Navbar />
      <div className="section-pad bg-white" style={{ paddingBottom: 20 }}>
        <p className="section-title">OUR COLLECTION</p>
        <h2 className="section-heading" style={{ marginBottom: 0 }}>All Products</h2>
      </div>
      <div className="filter-bar">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`filter-btn${filter === cat ? ' active' : ''}`}>
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="section-pad">
        <div className="grid-4">
          {filtered.map(product => (
            <div key={product.id} onClick={() => product.colours ? navigate(`/product/${product.id}`) : null} className="product-card" style={{ cursor: product.colours ? 'pointer' : 'default' }}>
              <img src={product.img} alt={product.name} className="product-img" />
              <div className="product-info">
                <p className="product-cat">{product.category}</p>
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">Rs. {product.price}</p>
                <button onClick={e => handleAddToCart(e, product)} className="product-add-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
