// DEMO DATA ONLY. Nothing here comes from a server.
export const me0 = { name: 'Avni', username: 'avni_official', about: 'Keep smiling 😊', phone: '+91 98765 43210', photo: null, email: 'demo@avnichat.app' }

const m = (me, text, t, from) => ({ id: Math.random(), me, text, t, from })

export const chats0 = [
  { id: 1, name: 'Rohan', online: true, unread: 2, msgs: [
    m(false, 'Hey Avni! 😊 Kaisi ho?', '10:12 AM'), m(true, 'Main theek hu bhai. Tum batao?', '10:13 AM'),
    m(false, 'Bhai kal milte hai? Kuch important baat karni hai.', '10:20 AM'), m(true, 'Haan sure! Kaha milna hai?', '10:21 AM'),
    m(false, 'Same jagah pe jahan pehle milte the shaam 5 baje.', '10:24 AM') ] },
  { id: 2, name: 'Priya Sharma', online: true, unread: 1, msgs: [m(true, 'Notes bhej dena plz', '9:48 AM'), m(false, 'Ok 👍', '9:50 AM')] },
  { id: 3, name: 'Family Group', group: true, members: 'Maa, Papa, Didi, You', unread: 0, msgs: [m(false, 'Thik hai beta', 'Yesterday', 'Maa')] },
  { id: 4, name: 'Best Friends', group: true, members: 'Rohan, Priya, Imran, Neha, You', unread: 3, msgs: [
    m(false, 'Kya plan hai aaj?', '10:12 AM', 'Rohan'), m(false, 'Movie dekhne chalte hain?', '10:14 AM', 'Priya'),
    m(true, 'Haan! Kaunsi movie?', '10:15 AM'), m(false, 'Koi bhi chalegi 😅', '10:16 AM', 'Imran'),
    { id: 'sys', system: true, text: 'Rohan added Aman to the group' }, m(false, 'Main bhi aa rahi hu', '10:17 AM', 'Neha') ] },
  { id: 5, name: 'Neha', online: false, unread: 0, msgs: [m(false, 'Call karna hai kya?', 'Monday')] },
  { id: 6, name: 'Work Team', group: true, members: 'Aman, Rohan, Neha, You', unread: 0, msgs: [m(false, 'Meeting at 5 PM', 'Monday', 'Aman')] },
]

export const contacts = [
  { name: 'Aman', phone: '+91 90000 11111', online: true }, { name: 'Imran', phone: '+91 90000 22222', online: false },
  { name: 'Neha', phone: '+91 90000 33333', online: false }, { name: 'Priya Sharma', phone: '+91 90000 44444', online: true },
  { name: 'Rohan', phone: '+91 98765 43210', online: true },
]
