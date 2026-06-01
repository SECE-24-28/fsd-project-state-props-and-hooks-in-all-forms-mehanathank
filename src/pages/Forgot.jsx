import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/

export default function Forgot() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!emailPattern.test(email)) { setError('Please enter a valid email address'); return }
    setError('')
    sessionStorage.setItem('resetEmail', email)
    alert('Reset link sent to ' + email)
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url('/image/home/back.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '50px 60px', width: 440, borderTop: '4px solid #8b4513' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8b4513', marginBottom: 4 }}>StyleHub</h1>
          <p style={{ color: '#888', marginBottom: 24 }}>Enter your email to reset password</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: '#6b3a2a', fontWeight: 500, fontSize: 14, display: 'block', marginBottom: 6 }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ width: '100%', padding: '10px 14px', border: `1px solid ${error ? 'red' : '#e0c9a6'}`, background: '#fdf6ee', borderRadius: 8, fontSize: 14, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              {error && <p style={{ color: 'red', fontSize: 13, marginTop: 4 }}>{error}</p>}
            </div>
            <button type="submit" style={{ width: '100%', background: '#8b4513', color: '#fff', border: 'none', height: 50, fontSize: 17, fontWeight: 600, borderRadius: 8, cursor: 'pointer' }}>Send Reset Link</button>
          </form>
          <p style={{ textAlign: 'center', color: '#888', marginTop: 16 }}>Remember your password? <Link to="/login" style={{ color: '#8b4513', fontWeight: 600, textDecoration: 'none' }}>Login</Link></p>
        </div>
      </div>
    </>
  )
}
