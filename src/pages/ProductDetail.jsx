import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import products from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === parseInt(id))

  const [mainImg, setMainImg] = useState(product?.frontImg || product?.colours?.[0]?.img || product?.img)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M')
  const [selectedColour, setSelectedColour] = useState(product?.colours?.[0]?.name || 'Default')

  if (!product) return <><Navbar /><p style={{ padding: 60 }}>Product not found.</p><Footer /></>

  function handleColour(c) {
    setMainImg(c.img)
    setSelectedColour(c.name)
  }

  function handleAddToCart() {
    addToCart(product, selectedSize, selectedColour, mainImg)
    alert(`${product.name} (Size: ${selectedSize}${product.colours ? ', ' + selectedColour : ''}) added to cart!`)
  }

  const thumbStyle = (active) => ({
    width: 90, height: 90, objectFit: 'contain', background: '#fff', borderRadius: 8,
    border: active ? '2px solid #8b4513' : '2px solid transparent', cursor: 'pointer'
  })

  const sizeBtnStyle = (active) => ({
    border: '2px solid', borderColor: active ? '#8b4513' : '#e0c9a6',
    background: active ? '#8b4513' : '#fff', color: active ? '#fff' : '#6b3a2a',
    borderRadius: 8, padding: '6px 18px', fontWeight: 500, cursor: 'pointer'
  })

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 60px' }}>
        <button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', color: '#8b4513', cursor: 'pointer', fontSize: 15, marginBottom: 24 }}>← Back to Shop</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>

          {/* Images */}
          <div>
            <img src={mainImg} alt={product.name} style={{ width: '100%', height: 480, objectFit: 'contain', background: '#fff', borderRadius: 14, border: '2px solid #e0c9a6', marginBottom: 12 }} />
            {product.colours && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.colours.map(c => (
                  <img key={c.name} src={c.img} alt={c.name} style={thumbStyle(mainImg === c.img)} onClick={() => handleColour(c)} />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ background: '#e0c9a6', color: '#6b3a2a', fontSize: 12, letterSpacing: 1, padding: '5px 14px', borderRadius: 20, display: 'inline-block', width: 'fit-content' }}>
              {product.category.toUpperCase()}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', fontSize: 28, margin: 0 }}>{product.name}</h1>
            <p style={{ color: '#8b4513', fontSize: 24, fontWeight: 700, margin: 0 }}>Rs. {product.price}</p>
            <p style={{ color: '#7a5c3a', fontSize: 14, lineHeight: 1.8 }}>{product.description}</p>

            {product.colours && (
              <div>
                <p style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 8 }}>Select Colour</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colours.map(c => (
                    <img key={c.name} src={c.img} alt={c.name} title={c.name} style={thumbStyle(selectedColour === c.name)} onClick={() => handleColour(c)} />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <p style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 8 }}>Select Size</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.sizes.map(s => (
                    <button key={s} style={sizeBtnStyle(selectedSize === s)} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleAddToCart} style={{ background: '#8b4513', color: '#fff', border: 'none', padding: 13, borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              Add to Cart
            </button>

            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e0c9a6', padding: 20 }}>
              <p style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 8 }}>Product Details</p>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {product.details?.map(d => <li key={d} style={{ color: '#5a3a1a', fontSize: 14, marginBottom: 6 }}>{d}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
