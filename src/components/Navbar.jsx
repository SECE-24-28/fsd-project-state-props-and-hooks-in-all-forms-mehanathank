import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ background: '#fff', borderBottom: '2px solid #e0c9a6', padding: '16px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to="/" style={{ color: '#6b3a2a', fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, textDecoration: 'none' }}>StyleHub</Link>
      <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0 }}>
        {[['/', 'Home'], ['/products', 'Shop'], ['/about', 'About'], ['#', 'Contact'], ['#', 'Profile'], ['/login', 'Login']].map(([to, label]) => (
          <li key={label}><Link to={to} style={{ color: '#8b4513', fontSize: 15, padding: '0 14px', textDecoration: 'none' }}>{label}</Link></li>
        ))}
        <li>
          <Link to="/cart" style={{ background: '#8b4513', color: '#fff', borderRadius: 20, padding: '6px 20px', textDecoration: 'none', fontSize: 15 }}>🛒 Cart</Link>
        </li>
      </ul>
    </nav>
  )
}
