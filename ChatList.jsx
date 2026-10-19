import { useState } from 'react'
import { Avatar } from './Logo'

export default function ChatList({ chats, active, onOpen, title, onNew }) {
  const [q, setQ] = useState('')
  const shown = chats.filter(c => c.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="side-head">
        <h3>{title}</h3>{onNew && <button className="plus" onClick={onNew} aria-label="New group">+</button>}
      </div>
      <input className="search" placeholder="🔍 Search or start new chat…" value={q} onChange={e => setQ(e.target.value)} />
      <div className="list">
        {shown.length === 0 && <p className="empty">No chats found. Try another name.</p>}
        {shown.map(c => {
          const last = [...c.msgs].reverse().find(x => !x.system)
          return (
            <button key={c.id} className={'row' + (c.id === active ? ' on' : '')} onClick={() => onOpen(c.id)}>
              <Avatar name={c.name} online={c.online} />
              <span className="mid"><b>{c.name}</b><small>{last ? (last.me ? 'You: ' : '') + last.text : 'Say hi 👋'}</small></span>
              <span className="end"><small>{last?.t}</small>{c.unread > 0 && <em className="badge">{c.unread}</em>}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
