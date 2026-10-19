import { useState } from 'react'
import { chats0, me0 } from './data'
import Auth from './Auth'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import { Contacts, GroupModal, Settings } from './Panels'
import Logo, { Avatar, Brand } from './Logo'

const NAV = [
  ['chats', '💬', 'Chats'],
  ['groups', '👥', 'Groups'],
  ['contacts', '📇', 'Contacts'],
  ['settings', '⚙️', 'Settings']
]

const now = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

const REPLIES = [
  'Haan bilkul! 👍',
  'Theek hai 😊',
  'Achha, phir baat karte hain',
  'Done ✅',
  'Haha 😂'
]

export default function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('chats')
  const [chats, setChats] = useState(chats0)
  const [active, setActive] = useState(null)
  const [modal, setModal] = useState(false)

  if (!user) {
    return <Auth onLogin={u => setUser({ ...me0, ...u })} />
  }

  const cur = chats.find(c => c.id === active)

  const go = v => {
    setView(v)
    setActive(null)
  }

  const open = id => {
    setActive(id)
    setChats(cs =>
      cs.map(c => (c.id === id ? { ...c, unread: 0 } : c))
    )
  }

  const push = (id, m) =>
    setChats(cs =>
      cs.map(c =>
        c.id === id
          ? {
              ...c,
              msgs: [...c.msgs, { id: Math.random(), t: now(), ...m }]
            }
          : c
      )
    )

  const send = (id, text) => {
    push(id, { me: true, text })

    const c = chats.find(x => x.id === id)

    // Demo reply; real messaging requires a backend.
    setTimeout(() => {
      push(id, {
        from: c?.group ? 'Rohan' : undefined,
        text: REPLIES[Math.floor(Math.random() * REPLIES.length)]
      })
    }, 1200)
  }

  const openContact = k => {
    let c = chats.find(x => !x.group && x.name === k.name)

    if (!c) {
      c = {
        id: Date.now(),
        name: k.name,
        online: k.online,
        unread: 0,
        msgs: []
      }

      setChats(cs => [c, ...cs])
    }

    setView('chats')
    open(c.id)
  }

  const addGroup = (name, members) => {
    const g = {
      id: Date.now(),
      name,
      group: true,
      members: [...members, 'You'].join(', '),
      unread: 0,
      msgs: [
        {
          id: 's',
          system: true,
          text: 'You created the group'
        }
      ]
    }

    setChats(cs => [g, ...cs])
    setModal(false)
    setView('groups')
    setActive(g.id)
  }

  const isOpen =
    view === 'settings' ||
    (cur && (view === 'chats' || view === 'groups'))

  const unread = chats.reduce((n, c) => n + (c.unread || 0), 0)

  return (
    <div className={'app' + (isOpen ? ' open' : '')}>
      <nav className="nav">
        <span className="nav-logo">
          <Logo size={36} />
        </span>

        {NAV.map(([k, icon, label]) => (
          <button
            key={k}
            className={view === k ? 'on' : ''}
            onClick={() => go(k)}
          >
            <span>{icon}</span>
            <small>{label}</small>

            {k === 'chats' && unread > 0 && (
              <em className="badge">{unread}</em>
            )}
          </button>
        ))}

        <button className="me-btn" onClick={() => go('settings')}>
          <Avatar
            name={user.name}
            photo={user.photo}
            online
            size={36}
          />
        </button>
      </nav>

      {view !== 'settings' && (
        <section className="side">
          <div className="topbar">
            <Brand size={28} />
            <span className="demo-pill">Demo</span>
          </div>

          {view === 'chats' && (
            <ChatList
              title="Chats"
              chats={chats}
              active={active}
              onOpen={open}
            />
          )}

          {view === 'groups' && (
            <ChatList
              title="Groups"
              chats={chats.filter(c => c.group)}
              active={active}
              onOpen={open}
              onNew={() => setModal(true)}
            />
          )}

          {view === 'contacts' && (
            <Contacts onOpen={openContact} />
          )}
        </section>
      )}

      <main
