import { useState } from 'react'
import Logo, { Brand } from './Logo'

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState('login') // login | signup | forgot
  const [f, setF] = useState({ name: '', email: '', pw: '' })
  const [msg, setMsg] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })

  const submit = e => {
    e.preventDefault()
    if (!f.email.includes('@') && mode !== 'login') return setMsg('Enter a valid email address.')
    if (mode === 'forgot') return setMsg('Demo only: a real app would email a reset link here.')
    if (!f.email || f.pw.length < 4) return setMsg('Enter an email and a password (4+ characters).')
    onLogin({ email: f.email, ...(f.name && { name: f.name }) })
  }

  return (
    <div className="auth">
      <div className="hero">
        <Logo size={110} />
        <h1 className="brand-lg">🦋 Avni Chat 🦋</h1>
        <p>Connect • Chat • Share</p>
        <p className="tag">Har baat khaas hoti hai…<br />jab wo Avni Chat par ho ❤️</p>
      </div>
      <form className="card" onSubmit={submit}>
        <h2>{mode === 'login' ? 'Welcome back! 👋' : mode === 'signup' ? 'Create your account' : 'Reset password'}</h2>
        <button type="button" className="google" onClick={() => onLogin({ name: 'Avni', email: 'demo@gmail.com' })}>
          <b style={{ color: '#4285f4' }}>G</b> Continue with Google (demo)
        </button>
        <div className="or"><span>or</span></div>
        {mode === 'signup' && <input placeholder="Full name" value={f.name} onChange={set('name')} />}
        <input type="email" placeholder="Email" value={f.email} onChange={set('email')} />
        {mode !== 'forgot' && <input type="password" placeholder="Password" value={f.pw} onChange={set('pw')} />}
        {mode === 'login' && <button type="button" className="link right" onClick={() => { setMode('forgot'); setMsg('') }}>Forgot password?</button>}
        {msg && <p className="note">{msg}</p>}
        <button className="primary">{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign up' : 'Send reset link'}</button>
        <p className="small">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" className="link" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMsg('') }}>
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
        <p className="demo">⚠️ Demo mode: no server, no real accounts. Any email + password works.</p>
      </form>
    </div>
  )
}
