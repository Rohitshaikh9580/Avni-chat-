import { useEffect, useRef, useState } from 'react'
import { Avatar } from './Logo'

const EMOJIS = ['😀', '😂', '😍', '🥰', '😎', '🤔', '😢', '😡', '👍', '🙏', '🎉', '❤️', '🔥', '🦋', '✨', '😅']

export default function ChatWindow({ chat, onSend, onBack }) {
  const [text, setText] = useState('')
  const [emoji, setEmoji] = useState(false)
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [chat.msgs.length, chat.id])

  const send = () => { if (text.trim()) { onSend(chat.id, text.trim()); setText(''); setEmoji(false) } }

  return (
    <>
      <header className="chat-head">
        <button className="icon back" onClick={onBack} aria-label="Back">←</button>
        <Avatar name={chat.name} online={chat.online} size={40} />
        <div className="mid"><b>{chat.name}</b>
          <small className={chat.online ? 'on-txt' : ''}>{chat.group ? chat.members : chat.online ? 'Online' : 'Offline'}</small></div>
        <button className="icon" title="Call (demo)">📞</button><button className="icon" title="Video (demo)">🎥</button>
      </header>
      <div className="msgs">
        {chat.msgs.length === 0 && <p className="empty">No messages yet. Send the first one!</p>}
        {chat.msgs.map(x => x.system
          ? <div key={x.id} className="sys">{x.text}</div>
          : <div key={x.id} className={'bubble ' + (x.me ? 'me' : 'them')}>
              {chat.group && !x.me && x.from && <strong>{x.from}</strong>}
              <p>{x.text}</p><small>{x.t}</small>
            </div>)}
        <div ref={end} />
      </div>
      {emoji && <div className="emojis">{EMOJIS.map(e => <button key={e} onClick={() => setText(text + e)}>{e}</button>)}</div>}
      <div className="composer">
        <button className="icon" onClick={() => setEmoji(!emoji)} aria-label="Emoji">😊</button>
        <input placeholder="Type a message…" value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()} />
        <button className="send" onClick={send} aria-label="Send">➤</button>
      </div>
    </>
  )
}
