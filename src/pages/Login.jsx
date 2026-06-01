import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/
const passwordPattern = /^[a-zA-Z0-9@#$%]{6,}$/

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!emailPattern.test(form.email)) e.email = 'Please enter a valid email address'
    if (!passwordPattern.test(form.password)) e.password = 'Password must be at least 6 characters'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    localStorage.setItem('email', form.email)
    sessionStorage.setItem('loggedIn', 'true')
    alert('Login Successful! Welcome to StyleHub')
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className="auth-bg">
        <div className="auth-card">
          <h1 className="auth-brand">StyleHub</h1>
          <p className="auth-sub">Login to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter your email"
                className={`form-input${errors.email ? ' error-border' : ''}`} />
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Enter your password"
                className={`form-input${errors.password ? ' error-border' : ''}`} />
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>
            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <Link to="/forgot" className="auth-link">Forgot password?</Link>
            </div>
            <button type="submit" className="auth-submit">Login</button>
          </form>
          <p className="auth-footer">Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>
      </div>
    </>
  )
}
