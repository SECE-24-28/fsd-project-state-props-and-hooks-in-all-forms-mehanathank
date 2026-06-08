import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppTable from '../../components/AppTable'
import { apiUrl } from '../../api'

const statusColors = { Pending: '#e67e22', Processing: '#2980b9', Shipped: '#8b4513', Delivered: '#27ae60', Cancelled: '#c0392b' }

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(apiUrl('/api/orders')).then(r => r.json()).then(d => setOrders(Array.isArray(d) ? d : [])).catch(() => {})
    fetch(apiUrl('/api/users')).then(r => r.json()).then(d => setUsers(Array.isArray(d) ? d : [])).catch(() => {})
    fetch(apiUrl('/api/products')).then(r => r.json()).then(d => setProducts(Array.isArray(d) ? d : [])).catch(() => {})
  }, [])

  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0)

  const stats = [
    { label: 'Total Products', value: products.length, icon: '👕', color: '#8b4513', path: '/admin/products' },
    { label: 'Total Orders', value: orders.length, icon: '📦', color: '#2980b9', path: '/admin/orders' },
    { label: 'Total Users', value: users.length, icon: '👥', color: '#27ae60', path: '/admin/users' },
    { label: 'Revenue', value: `Rs. ${revenue}`, icon: '💰', color: '#e67e22', path: null },
  ]

  const cols = [
    { key: '_id', label: 'Order ID', render: v => `#${v.slice(-8).toUpperCase()}` },
    { key: 'userName', label: 'Customer' },
    { key: 'total', label: 'Amount', render: v => `Rs. ${v}` },
    { key: 'status', label: 'Status', render: v => <span style={{ background: statusColors[v] || '#888', color: '#fff', padding: '3px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{v}</span> },
    { key: 'createdAt', label: 'Date', render: v => new Date(v).toLocaleDateString() },
  ]

  return (
    <div style={{ padding: '20px 16px' }}>
      <h2 style={{ fontFamily: 'Playfair Display,serif', color: '#6b3a2a', marginBottom: 8 }}>Dashboard</h2>
      <p style={{ color: '#888', marginBottom: 32 }}>Welcome back! Here's what's happening.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map(({ label, value, icon, color, path }) => (
          <div key={label}
            onClick={() => path && navigate(path)}
            style={{
              background: '#fff', borderRadius: 14, padding: 24,
              border: '1px solid #e0c9a6', borderLeft: `4px solid ${color}`,
              cursor: path ? 'pointer' : 'default',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={e => { if (path) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)' }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <p style={{ color, fontWeight: 700, fontSize: 24, margin: 0 }}>{value}</p>
            <p style={{ color: '#888', fontSize: 13, margin: '4px 0 0' }}>{label}</p>
            {path && <p style={{ color, fontSize: 11, margin: '8px 0 0', opacity: 0.7 }}>View all →</p>}
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e0c9a6', padding: 24 }}>
        <h4 style={{ color: '#6b3a2a', marginBottom: 20, fontFamily: 'Playfair Display,serif' }}>Recent Orders</h4>
        <AppTable columns={cols} data={orders.slice(0, 10)} emptyMsg="No orders yet." />
      </div>
    </div>
  )
}
