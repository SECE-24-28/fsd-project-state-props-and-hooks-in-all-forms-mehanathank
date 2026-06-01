import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div style={{ height: '92vh', backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1)), url('/image/home/homeback.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 80px' }}>
        <div>
          <div style={{ background: '#8b4513', color: '#fff', fontSize: 12, letterSpacing: 3, padding: '6px 16px', borderRadius: 20, display: 'inline-block', marginBottom: 20 }}>NEW COLLECTION 2025</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>Elevate Your<br />Everyday Style</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}>Discover the latest trends in fashion.<br />Timeless pieces, modern designs, just for you.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/products" style={{ background: '#8b4513', color: '#fff', border: 'none', padding: '14px 36px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Shop Now</Link>
            <Link to="/about" style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '14px 36px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Our Story</Link>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div style={{ background: '#8b4513' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center' }}>
          {[['🚚', 'Free Shipping on orders over Rs. 999'], ['↩️', 'Easy 30-Day Returns'], ['💎', '100% Authentic Products'], ['🔒', 'Secure Payments']].map(([icon, text]) => (
            <div key={text} style={{ color: '#fff', fontSize: 14, padding: '18px 0' }}><span style={{ fontSize: 20, marginRight: 8 }}>{icon}</span>{text}</div>
          ))}
        </div>
      </div>

      {/* Shop by Category */}
      <div style={{ padding: '60px' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>BROWSE</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Shop by Category</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['men.png', 'Men'], ['woman.png', 'Women'], ['kids.png', 'Kids'], ['baby.png', 'Baby']].map(([img, label]) => (
            <Link to="/products" key={label} style={{ textDecoration: 'none', position: 'relative', borderRadius: 14, overflow: 'hidden', display: 'block' }}>
              <img src={`/image/home/${img}`} alt={label} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.65))', padding: '24px 20px 20px' }}>
                <h5 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 22, margin: 0 }}>{label}</h5>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: 0 }}>Explore collection →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '60px', background: '#fff' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>HAND PICKED</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Featured Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[['men jacket.png', 'Classic Men Jacket', 899], ['men dress.png', 'Men Dress', 749], ['kids 1.png', 'Kids Dress', 499], ['sale.png', 'Sale Special', 299]].map(([img, name, price]) => (
            <div key={name} style={{ borderRadius: 14, overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(139,69,19,0.08)' }}>
              <img src={`/image/home/${img}`} alt={name} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
              <div style={{ padding: 16, background: '#f0dfc0' }}>
                <h5 style={{ color: '#6b3a2a', fontWeight: 600, marginBottom: 4, fontSize: 15 }}>{name}</h5>
                <p style={{ color: '#8b4513', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Rs. {price}</p>
                <Link to="/products" style={{ display: 'block', background: '#8b4513', color: '#fff', border: 'none', width: '100%', padding: 9, borderRadius: 8, fontSize: 14, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>Shop Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner */}
      <div style={{ padding: '60px' }}>
        <div style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('/image/home/homeback.jpg')", backgroundSize: 'cover', backgroundPosition: 'center top', borderRadius: 16, padding: '80px 60px', color: '#fff' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase' }}>LIMITED TIME</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, marginBottom: 12 }}>Up to 50% Off<br />Sale Collection</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28 }}>Don't miss out on our biggest sale of the season.</p>
          <Link to="/products" style={{ background: '#fff', color: '#8b4513', fontWeight: 700, border: 'none', padding: '12px 36px', borderRadius: 8, fontSize: 15, textDecoration: 'none' }}>Shop the Sale</Link>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '60px', background: '#fff' }}>
        <p style={{ color: '#8b4513', letterSpacing: 3, fontSize: 13, textTransform: 'uppercase', textAlign: 'center' }}>WHAT THEY SAY</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#6b3a2a', textAlign: 'center', fontSize: 32, marginBottom: 40 }}>Customer Reviews</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[['Amazing quality and fast delivery. StyleHub is my go-to for fashion. Highly recommend!', 'Sara A.'], ['Love the kids collection! Great fabric, perfect sizing, and the prices are unbeatable.', 'Omar K.'], ["Ordered twice already. The men's jacket is exactly as shown. Will definitely order again.", 'Yusuf M.']].map(([text, name]) => (
            <div key={name} style={{ background: '#fff', borderRadius: 14, padding: 28, borderLeft: '4px solid #8b4513', boxShadow: '0 2px 12px rgba(139,69,19,0.08)' }}>
              <div style={{ color: '#e0a800', fontSize: 14, marginBottom: 12 }}>★★★★★</div>
              <p style={{ color: '#6b3a2a', fontSize: 14, lineHeight: 1.8 }}>"{text}"</p>
              <h6 style={{ color: '#8b4513', fontWeight: 600, margin: '12px 0 0' }}>— {name}</h6>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
