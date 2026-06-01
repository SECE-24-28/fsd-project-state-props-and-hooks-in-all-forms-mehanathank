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

      <div style={{ background: '#fff', padding: '40px 60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase' }}>OUR COLLECTION</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', fontSize: 32 }}>All Products</h2>
      </div>

      <div style={{ background: '#fff', padding: '0 60px 24px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{ background: filter === cat ? '#8b4513' : '#fff', border: '2px solid', borderColor: filter === cat ? '#8b4513' : '#e0c9a6', color: filter === cat ? '#fff' : '#6b3a2a', borderRadius: 25, padding: '8px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize' }}>
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ padding: '40px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {filtered.map(product => (
            <div key={product.id} onClick={() => product.colours ? navigate(`/product/${product.id}`) : null}
              style={{ background: '#f0dfc0', borderRadius: 12, overflow: 'hidden', cursor: product.colours ? 'pointer' : 'default', transition: 'transform 0.2s', boxShadow: '0 2px 8px rgba(139,69,19,0.1)' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
              <div style={{ padding: 16 }}>
                <p style={{ color: '#a07850', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{product.category}</p>
                <h5 style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{product.name}</h5>
                <p style={{ color: '#8b4513', fontWeight: 600, fontSize: 16, marginBottom: 12 }}>Rs. {product.price}</p>
                <button onClick={e => handleAddToCart(e, product)}
                  style={{ background: '#8b4513', color: '#fff', border: 'none', width: '100%', padding: 10, borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
