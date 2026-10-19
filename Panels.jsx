import { useState } from 'react'
import { Avatar } from './Logo'
import { contacts } from '../data'

export function Contacts({ onOpen }) {
  const [q, setQ] = useState('')
  return (
    <>
      <div className="side-head"><h3>Contacts</h3></div>
      <input className="search" placeholder="🔍 Search contacts…" value={q} onChange={e => setQ(e.target.value)} />
      <div className="list">
        {contacts.filter(c => c.name.toLowerCase().includes(q.toLowerCase())).map(c => (
          <button key={c.name} className="row" onClick={() => onOpen(c)}>
            <Avatar name={c.name} online={c.online} />
            <span className="mid"><b>{c.name}</b><small>{c.phone}</small></span>
            <small>{c.online ? 'Online' : 'Offline'}</small>
          </button>))}
      </div>
    </>
  )
}

export function GroupModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const [sel, setSel] = useState([])
  const toggle = n => setSel(s => (s.includes(n) ? s.filter(x => x !== n) : [...s, n]))
  return (
    <div className="modal" onClick={onClose}>
      <div className="card" onClick={e => e.stopPropagation()}>
        <h2>Create group</h2>
        <input placeholder="Group name" value={name} onChange={e => setName(e.target.value)} />
        <div className="picks">
          {contacts.map(c => (
            <label key={c.name}><input type="checkbox" checked={sel.includes(c.name)} onChange={() => toggle(c.name)} /> {c.name}</label>))}
        </div>
        <button className="primary" disabled={!name.trim() || !sel.length} onClick={() => onCreate(name.trim(), sel)}>Create group</button>
        <button className="link" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

const Toggle = ({ label, on, set }) => (
  <label className="tog"><span>{label}</span><input type="checkbox" checked={on} onChange={e => set(e.target.checked)} /></label>
)

export function Settings({ user, onSave, onLogout, onBack }) {
  const [tab, setTab] = useState('Account')
  const [f, setF] = useState(user)
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState({ lastSeen: true, receipts: true, photo: true, sound: true, preview: false, group: true })
  const p = k => v => setPrefs({ ...prefs, [k]: v })
  const set = k => e => { setF({ ...f, [k]: e.target.value }); setSaved(false) }
  const pick = e => {
    const file = e.target.files[0]; if (!file) return
    const r = new FileReader(); r.onload = () => setF(x => ({ ...x, photo: r.result })); r.readAsDataURL(file)
  }
  return (
    <div className="settings">
      <button className="icon back" onClick={onBack}>← Back</button>
      <div className="tabs">{['Account', 'Privacy', 'Notifications'].map(t =>
        <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === 'Account' && <div className="pane">
        <div className="center"><Avatar name={f.name} photo={f.photo} online size={96} />
          <label className="link">Change photo<input type="file" accept="image/*" hidden onChange={pick} /></label></div>
        <label>Name<input value={f.name} onChange={set('name')} /></label>
        <label>Username<input value={f.username} onChange={set('username')} /></label>
        <label>About<input value={f.about} onChange={set('about')} /></label>
        <label>Phone<input value={f.phone} onChange={set('phone')} /></label>
        <button className="primary" onClick={() => { onSave(f); setSaved(true) }}>Save changes</button>
        {saved && <p className="note">Saved (this browser session only).</p>}
      </div>}
      {tab === 'Privacy' && <div className="pane">
        <Toggle label="Show last seen" on={prefs.lastSeen} set={p('lastSeen')} />
        <Toggle label="Read receipts" on={prefs.receipts} set={p('receipts')} />
        <Toggle label="Profile photo visible to everyone" on={prefs.photo} set={p('photo')} />
      </div>}
      {tab === 'Notifications' && <div className="pane">
        <Toggle label="Message sounds" on={prefs.sound} set={p('sound')} />
        <Toggle label="Show message preview" on={prefs.preview} set={p('preview')} />
        <Toggle label="Group notifications" on={prefs.group} set={p('group')} />
      </div>}
      <button className="logout" onClick={onLogout}>Logout</button>
    </div>
  )
}
