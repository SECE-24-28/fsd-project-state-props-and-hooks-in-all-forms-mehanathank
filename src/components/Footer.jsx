import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#3b1f10', color: 'rgba(255,255,255,0.7)', fontSize: 14, padding: '60px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: 32, marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 22, marginBottom: 12 }}>StyleHub</div>
          <p>Your one-stop destination for fashion. Timeless pieces, modern designs, for everyone.</p>
        </div>
        <div>
          <h6 style={{ color: '#fff', fontWeight: 600, marginBottom: 14 }}>Shop</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Men', 'Women', 'Kids', 'Baby', 'Sale'].map(c => (
              <Link key={c} to="/products" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{c}</Link>
            ))}
          </div>
        </div>
        <div>
          <h6 style={{ color: '#fff', fontWeight: 600, marginBottom: 14 }}>Company</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About Us</Link>
            <Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Contact</Link>
            <Link to="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Careers</Link>
          </div>
        </div>
        <div>
          <h6 style={{ color: '#fff', fontWeight: 600, marginBottom: 14 }}>Stay in the Loop</h6>
          <p style={{ marginBottom: 10 }}>Subscribe for new arrivals and exclusive offers.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Your email" style={{ flex: 1, padding: '8px 12px', border: '1px solid #5a3020', background: '#4a2510', color: '#fff', borderRadius: 6 }} />
            <button style={{ background: '#8b4513', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap' }}>Subscribe</button>
          </div>
        </div>
      </div>
      <hr style={{ borderColor: '#5a3020', marginBottom: 16 }} />
      <div style={{ textAlign: 'center' }}>© 2025 StyleHub. All rights reserved.</div>
    </footer>
  )
}
