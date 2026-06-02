import { useState } from 'react'
import AppTable from '../../components/AppTable'
import Modal from '../../components/Modal'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'

export default function AdminUsers() {
  const { user: me } = useAuth()
  const toast = useToast()
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('sh_users') || '[]').filter(u => u.role !== 'admin'))
  const [confirmId, setConfirmId] = useState(null)
  const [search, setSearch] = useState('')

  function deleteUser(id) {
    if (id === me.id) { toast('Cannot delete your own account.', 'error'); return }
    const allUsers = JSON.parse(localStorage.getItem('sh_users') || '[]')
    const updated = allUsers.filter(u => u.id !== id)
    localStorage.setItem('sh_users', JSON.stringify(updated))
    setUsers(updated.filter(u => u.role !== 'admin'))
    toast('User deleted.', 'info')
    setConfirmId(null)
  }

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const cols = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'createdAt', label: 'Joined', render: v => new Date(v).toLocaleDateString() },
    { key: 'id', label: 'Actions', render: (id) => (
      <button onClick={() => setConfirmId(id)} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '5px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Delete</button>
    )}
  ]

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontFamily: 'Playfair Display,serif', color: '#6b3a2a', margin: 0 }}>Users</h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
          style={{ padding: '9px 14px', border: '1px solid #e0c9a6', borderRadius: 8, fontSize: 14, fontFamily: 'Poppins,sans-serif', outline: 'none', width: 240 }} />
      </div>
      <AppTable columns={cols} data={filtered} emptyMsg="No users found." />

      {confirmId && (
        <Modal title="Delete User" onClose={() => setConfirmId(null)} width={360}>
          <p style={{ color: '#6b3a2a', marginBottom: 24 }}>Are you sure you want to delete this user?</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => deleteUser(confirmId)} style={{ flex: 1, background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
            <button onClick={() => setConfirmId(null)} style={{ flex: 1, background: '#f0dfc0', color: '#6b3a2a', border: 'none', borderRadius: 8, padding: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
