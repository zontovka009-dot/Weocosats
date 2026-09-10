import { useState } from 'react'

type Screen = 'home' | 'saved' | 'friends' | 'settings'

const sessions = [
  { title: 'Вечерний просмотр', meta: '2 участника · сейчас', icon: '◉' },
  { title: 'Моя комната', meta: 'Сохранённая сессия', icon: 'W' },
]

function Mascot() {
  return <div className="mascot"><div className="ear left"/><div className="ear right"/><div className="head"><span className="eye">•</span><span className="eye">•</span><span className="mouth">ᴗ</span><div className="phones"/></div></div>
}

function Home({ openRoom }: { openRoom: () => void }) {
  return <>
    <section className="welcome card"><Mascot/><div><div className="eyebrow">Вачис тут</div><h1>Смотри вместе.</h1><p>Создавай комнату и запускай просмотр с друзьями.</p></div></section>
    <button className="primary" onClick={openRoom}>＋ Создать комнату</button>
    <div className="section-title"><span>Недавние комнаты</span><button>Все</button></div>
    <div className="stack">{sessions.map(s => <button className="session card" key={s.title} onClick={openRoom}><span className="session-icon">{s.icon}</span><span><b>{s.title}</b><small>{s.meta}</small></span><span className="chev">›</span></button>)}</div>
  </>
}

function Room({ leave }: { leave: () => void }) {
  const [playing, setPlaying] = useState(false)
  return <div className="room-page">
    <div className="room-head"><button className="round" onClick={leave}>‹</button><div><b>Вечерний просмотр</b><small>2 участника</small></div><button className="round">⋯</button></div>
    <div className="player"><div className="play-center" onClick={() => setPlaying(!playing)}>{playing ? 'Ⅱ' : '▶'}</div><div className="player-bottom"><span>00:12</span><div className="bar"><i/></div><span>42:18</span></div></div>
    <div className="source card"><span className="source-logo">VK</span><div><b>Видео</b><small>Источник: VK Video</small></div><button>⚙</button></div>
    <div className="room-actions"><button>⏮</button><button>{playing ? 'Ⅱ' : '▶'}</button><button>⏭</button><button>HD</button><button>💬</button></div>
    <div className="chat card"><div className="chat-title">Чат комнаты <span>2</span></div><div className="message"><b>Лисёнок</b><span>го смотреть 👀</span></div><div className="message"><b>Ты</b><span>я уже тут</span></div><div className="chat-input">Написать сообщение… <button>➤</button></div></div>
  </div>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [room, setRoom] = useState(false)
  const content = room ? <Room leave={() => setRoom(false)} /> : screen === 'home' ? <Home openRoom={() => setRoom(true)} /> : screen === 'saved' ? <><h2>Сохранённые</h2><p className="muted">До 10 сохранённых сессий будут храниться здесь.</p>{sessions.map(s => <div className="session card" key={s.title}><span className="session-icon">{s.icon}</span><span><b>{s.title}</b><small>{s.meta}</small></span></div>)}</> : screen === 'friends' ? <><h2>Друзья</h2><p className="muted">Здесь будут друзья и быстрые приглашения в комнаты.</p><div className="empty card">Пока никого нет<br/><small>Добавь друга из комнаты</small></div></> : <><h2>Настройки</h2><div className="settings card"><div>Профиль <span>›</span></div><div>Уведомления <span>›</span></div><div>Качество видео <span>Авто</span></div></div></>
  return <main className="app"><header><div className="brand"><span className="brand-mark">W</span><b>Wathis</b></div><button className="avatar">◌</button></header><div className="content">{content}</div>{!room && <nav><button className={screen==='home'?'active':''} onClick={()=>setScreen('home')}>⌂<span>Главная</span></button><button className={screen==='saved'?'active':''} onClick={()=>setScreen('saved')}>▣<span>Сессии</span></button><button className={screen==='friends'?'active':''} onClick={()=>setScreen('friends')}>♧<span>Друзья</span></button><button className={screen==='settings'?'active':''} onClick={()=>setScreen('settings')}>⚙<span>Настройки</span></button></nav>}</main>
}
