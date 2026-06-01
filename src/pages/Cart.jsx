import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const validPromos = { 'STYLE10': 10, 'HUB20': 20, 'SAVE50': 50 }

export default function Cart() {
  const { cart, changeQty, removeItem, clearCart } = useCart()
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMsg, setPromoMsg] = useState({ text: '', type: '' })

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const total = subtotal - discount

  function applyPromo() {
    const code = promo.trim().toUpperCase()
    if (validPromos[code]) {
      setDiscount(validPromos[code])
      setPromoMsg({ text: `Promo applied! Rs. ${validPromos[code]} off`, type: 'success' })
    } else {
      setDiscount(0)
      setPromoMsg({ text: 'Promo code not found', type: 'error' })
    }
  }

  function checkout() {
    if (cart.length === 0) { alert('Your cart is empty!'); return }
    alert(`Order placed successfully! Total: Rs. ${total}`)
    clearCart()
    setDiscount(0)
    setPromoMsg({ text: '', type: '' })
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 60px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

        {/* Cart Items */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', marginBottom: 4 }}>Your Cart</h2>
          <p style={{ color: '#888', marginBottom: 24 }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</p>

          {cart.length === 0 && <p style={{ color: '#8b4513' }}>Your cart is empty.</p>}

          {cart.map(item => (
            <div key={`${item.id}-${item.size}-${item.colour}`} style={{ background: '#fff', border: '1px solid #e0c9a6', borderRadius: 14, padding: 16, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 24 }}>
              <img src={item.img} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 10 }} />
              <div style={{ flex: 1 }}>
                <h5 style={{ color: '#6b3a2a', marginBottom: 4 }}>{item.name}</h5>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 10 }}>Size: {item.size} | Colour: {item.colour}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => changeQty(item.id, item.size, item.colour, -1)} style={{ width: 32, height: 32, border: '1px solid #e0c9a6', background: '#fff', borderRadius: 6, color: '#8b4513', cursor: 'pointer', fontSize: 16 }}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, item.size, item.colour, 1)} style={{ width: 32, height: 32, border: '1px solid #e0c9a6', background: '#fff', borderRadius: 6, color: '#8b4513', cursor: 'pointer', fontSize: 16 }}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#8b4513', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Rs. {item.price * item.qty}</p>
                <p onClick={() => removeItem(item.id, item.size, item.colour)} style={{ color: '#c0392b', fontSize: 14, cursor: 'pointer' }}>Remove</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ width: 360, background: '#fff', border: '1px solid #e0c9a6', borderRadius: 16, padding: 24 }}>
          <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', marginBottom: 24 }}>Order Summary</h4>
          {[['Subtotal', `Rs. ${subtotal}`], ['Shipping', 'Free'], ['Discount', `- Rs. ${discount}`]].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span>{label}</span><span>{val}</span>
            </div>
          ))}
          <hr style={{ borderColor: '#e0c9a6', margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <strong style={{ color: '#6b3a2a' }}>Total</strong>
            <strong style={{ color: '#6b3a2a' }}>Rs. {total}</strong>
          </div>
          <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Promo code"
            style={{ width: '100%', padding: '8px 12px', border: '1px solid #e0c9a6', borderRadius: 8, marginBottom: 6, fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }} />
          {promoMsg.text && <p style={{ color: promoMsg.type === 'success' ? 'green' : 'red', fontSize: 13, marginBottom: 8 }}>{promoMsg.text}</p>}
          <button onClick={applyPromo} style={{ width: '100%', padding: 10, border: '2px solid #8b4513', background: '#fff', color: '#8b4513', borderRadius: 8, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>Apply Promo</button>
          <button onClick={checkout} style={{ width: '100%', padding: 13, background: '#8b4513', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Checkout</button>
        </div>
      </div>
      <Footer />
    </>
  )
}
