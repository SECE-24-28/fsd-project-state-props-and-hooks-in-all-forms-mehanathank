import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    
    // Clear previous errors
    setEmailError('')
    setPasswordError('')
    
    let isValid = true
    
    // Validate email
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address')
      isValid = false
    }
    
    // Validate password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    }
    
    if (!isValid) return
    
    // Try to login
    const result = login(email, password, rememberMe)
    
    if (result.ok) {
      toast('Login successful! Welcome back.')
      navigate('/')
    } else {
      setPasswordError(result.msg)
    }
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
              <input 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email"
                className={emailError ? 'form-input error-border' : 'form-input'}
              />
              {emailError && <p className="error-msg">{emailError}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="Enter your password"
                className={passwordError ? 'form-input error-border' : 'form-input'}
              />
              {passwordError && <p className="error-msg">{passwordError}</p>}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <label style={{ fontSize: 14, color: '#6b3a2a', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={e => setRememberMe(e.target.checked)} 
                />
                Remember me
              </label>
              <Link to="/forgot" className="auth-link">Forgot password?</Link>
            </div>
            
            <button type="submit" className="auth-submit">Login</button>
            
          </form>
          
          <p className="auth-footer">
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  )
}
