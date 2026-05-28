import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Heart,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  PenLine,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { api, clearToken, getErrorMessage, hasToken, setToken } from './lib/api'
import './index.css'

const emptySkill = {
  name: '',
  category: '',
  level: '',
  sort_order: 0,
}

const emptyExperience = {
  title: '',
  organization: '',
  location: '',
  start_date: '',
  end_date: '',
  description: '',
  type: 'study',
  sort_order: 0,
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="experiences" element={<ExperiencesAdmin />} />
          <Route path="messages" element={<MessagesAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function PublicLayout() {
  return (
    <div>
      <header className="site-header">
        <Link className="brand" to="/">
          <span>W</span>
          Wildan
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Admin</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function HomePage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      api.get('/profile'),
      api.get('/skills'),
      api.get('/hobbies'),
      api.get('/experiences'),
    ])
      .then(([profile, skills, hobbies, experiences]) => {
        setData({
          profile: profile.data,
          skills: skills.data,
          hobbies: hobbies.data,
          experiences: experiences.data,
        })
      })
      .catch((requestError) => setError(getErrorMessage(requestError)))
  }, [])

  if (error) return <StateBlock title="Backend belum siap" text={error} />
  if (!data) return <StateBlock title="Loading portfolio" text="Mengambil data dari Laravel API..." />

  const groupedSkills = groupBy(data.skills, 'category')

  return (
    <>
      <section className="hero-section hero-section-single">
        <div className="hero-copy">
          <p className="eyebrow">Dark maroon portfolio</p>
          <h1>{data.profile.name}</h1>
          <p className="hero-headline">{data.profile.headline}</p>
          <p className="hero-text">{data.profile.bio}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/contact">
              Hubungi Saya <ArrowRight size={18} />
            </Link>
            <a className="button ghost" href="#study-career">
              Studi & Karir <BookOpen size={18} />
            </a>
          </div>
        </div>
        <div className="hero-summary" aria-label="Ringkasan portfolio">
          <p className="eyebrow">Personal path</p>
          <div>
            <strong>SD - SMK</strong>
            <span>Riwayat belajar dari dasar sampai kejuruan.</span>
          </div>
          <div>
            <strong>Hobi Produktif</strong>
            <span>Coding, futsal, desain UI, dan musik.</span>
          </div>
          <div>
            <strong>Web Focus</strong>
            <span>Belajar React, Laravel, dan dasar aplikasi web.</span>
          </div>
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <Sparkles size={22} />
          <h2>Skills</h2>
        </div>
        <div className="skill-groups">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div className="skill-group" key={category}>
              <h3>{category}</h3>
              <div className="chips">
                {skills.map((skill) => (
                  <span className="chip" key={skill.id}>
                    {skill.name}
                    {skill.level ? <small>{skill.level}</small> : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <Heart size={22} />
          <h2>Hobi</h2>
        </div>
        <div className="hobby-grid">
          {data.hobbies.map((hobby) => (
            <article className="hobby-item" key={hobby.id}>
              <h3>{hobby.name}</h3>
              <p>{hobby.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid" id="study-career">
        <div className="section-heading">
          <ShieldCheck size={22} />
          <h2>Studi & Karir</h2>
        </div>
        <div className="timeline">
          {data.experiences.map((experience) => (
            <article className="timeline-item" key={experience.id}>
              <span>{experience.start_date} - {experience.end_date || 'Present'}</span>
              <h3>{experience.title}</h3>
              <p>{experience.organization} · {experience.location}</p>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    setError('')
    setStatus('')
    api.post('/contact-messages', form)
      .then((response) => {
        setStatus(response.data.message)
        setForm({ name: '', email: '', subject: '', message: '' })
      })
      .catch((requestError) => setError(getErrorMessage(requestError)))
  }

  return (
    <section className="form-page">
      <div className="page-title">
        <p className="eyebrow">Start a conversation</p>
        <h1>Contact</h1>
      </div>
      <form className="form-panel" onSubmit={submit}>
        <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Subject" value={form.subject} onChange={(value) => setForm({ ...form, subject: value })} />
        <Field label="Message" multiline value={form.message} onChange={(value) => setForm({ ...form, message: value })} />
        {error ? <p className="alert error">{error}</p> : null}
        {status ? <p className="alert success"><CheckCircle2 size={18} /> {status}</p> : null}
        <button className="button primary" type="submit">Send Message <Mail size={18} /></button>
      </form>
    </section>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'admin@wildan.test', password: 'password' })
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    setError('')
    api.post('/login', form)
      .then((response) => {
        setToken(response.data.token)
        navigate('/admin')
      })
      .catch((requestError) => setError(getErrorMessage(requestError)))
  }

  return (
    <section className="login-page">
      <form className="login-panel" onSubmit={submit}>
        <UserRound size={32} />
        <h1>Admin Login</h1>
        <p>Kelola konten portfolio dari dashboard.</p>
        <Field label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
        {error ? <p className="alert error">{error}</p> : null}
        <button className="button primary" type="submit">Login <ArrowRight size={18} /></button>
      </form>
    </section>
  )
}

function ProtectedRoute({ children }) {
  const [state, setState] = useState(() => ({ loading: hasToken(), allowed: false }))

  useEffect(() => {
    if (!hasToken()) return

    api.get('/me')
      .then(() => setState({ loading: false, allowed: true }))
      .catch(() => {
        clearToken()
        setState({ loading: false, allowed: false })
      })
  }, [])

  if (state.loading) return <StateBlock title="Checking session" text="Memvalidasi akses admin..." />
  if (!state.allowed) return <Navigate to="/login" replace />
  return children
}

function AdminLayout() {
  const navigate = useNavigate()
  const links = [
    ['Dashboard', '/admin', LayoutDashboard],
    ['Profile', '/admin/profile', UserRound],
    ['Skills', '/admin/skills', Sparkles],
    ['Studi & Karir', '/admin/experiences', PenLine],
    ['Messages', '/admin/messages', Inbox],
  ]

  function logout() {
    api.post('/logout').finally(() => {
      clearToken()
      navigate('/login')
    })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="brand admin-brand" to="/admin"><span>W</span> Admin</Link>
        <nav className="admin-nav">
          {links.map(([label, to, Icon]) => (
            <NavLink end={to === '/admin'} to={to} key={to}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button className="icon-text-button" type="button" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

function AdminDashboard() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    Promise.all([
      api.get('/admin/skills'),
      api.get('/admin/experiences'),
      api.get('/admin/contact-messages'),
    ]).then(([skills, experiences, messages]) => {
      setSummary({
        skills: skills.data.length,
        experiences: experiences.data.length,
        unread: messages.data.filter((message) => !message.is_read).length,
      })
    })
  }, [])

  if (!summary) return <StateBlock title="Loading dashboard" text="Mengambil ringkasan admin..." />

  return (
    <section className="admin-section">
      <AdminTitle title="Dashboard" text="Ringkasan konten portfolio." />
      <div className="stats-grid stats-grid-compact">
        <Stat label="Skills" value={summary.skills} />
        <Stat label="Studi & Karir" value={summary.experiences} />
        <Stat label="Unread Messages" value={summary.unread} />
      </div>
    </section>
  )
}

function ProfileAdmin() {
  const [form, setForm] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    api.get('/admin/profile').then((response) => {
      setForm({
        ...response.data,
        social_links: JSON.stringify(response.data.social_links || {}, null, 2),
      })
    })
  }, [])

  function submit(event) {
    event.preventDefault()
    setNotice('')
    api.put('/admin/profile', {
      ...form,
      social_links: parseJson(form.social_links, {}),
    }).then((response) => {
      setForm({
        ...response.data,
        social_links: JSON.stringify(response.data.social_links || {}, null, 2),
      })
      setNotice('Profile updated.')
    })
  }

  if (!form) return <StateBlock title="Loading profile" text="Mengambil profil..." />

  return (
    <section className="admin-section">
      <AdminTitle title="Profile" text="Data utama yang tampil di halaman publik." />
      <form className="admin-form" onSubmit={submit}>
        <Field label="Name" value={form.name || ''} onChange={(value) => setForm({ ...form, name: value })} />
        <Field label="Headline" value={form.headline || ''} onChange={(value) => setForm({ ...form, headline: value })} />
        <Field label="Bio" multiline value={form.bio || ''} onChange={(value) => setForm({ ...form, bio: value })} />
        <Field label="Email" type="email" value={form.email || ''} onChange={(value) => setForm({ ...form, email: value })} />
        <Field label="Phone" value={form.phone || ''} onChange={(value) => setForm({ ...form, phone: value })} />
        <Field label="Location" value={form.location || ''} onChange={(value) => setForm({ ...form, location: value })} />
        <Field label="Social Links JSON" multiline value={form.social_links || ''} onChange={(value) => setForm({ ...form, social_links: value })} />
        {notice ? <p className="alert success">{notice}</p> : null}
        <button className="button primary" type="submit">Save Profile</button>
      </form>
    </section>
  )
}

function SkillsAdmin() {
  return (
    <CrudAdmin
      title="Skills"
      endpoint="/admin/skills"
      emptyItem={emptySkill}
      normalize={(item) => ({ ...emptySkill, ...item })}
      fields={[
        ['name', 'Name'],
        ['category', 'Category'],
        ['level', 'Level'],
        ['sort_order', 'Sort Order', 'number'],
      ]}
      renderItem={(item) => `${item.name} · ${item.category}`}
    />
  )
}

function ExperiencesAdmin() {
  return (
    <CrudAdmin
      title="Studi & Karir"
      endpoint="/admin/experiences"
      emptyItem={emptyExperience}
      normalize={(item) => ({ ...emptyExperience, ...item })}
      fields={[
        ['title', 'Title'],
        ['organization', 'Organization'],
        ['location', 'Location'],
        ['start_date', 'Start Date'],
        ['end_date', 'End Date'],
        ['type', 'Type'],
        ['description', 'Description', 'textarea'],
        ['sort_order', 'Sort Order', 'number'],
      ]}
      renderItem={(item) => `${item.title} · ${item.organization}`}
    />
  )
}

function CrudAdmin({ title, endpoint, emptyItem, fields, checkbox, normalize, serialize, renderItem }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyItem)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const loadItems = useCallback(() => {
    api.get(endpoint).then((response) => setItems(response.data))
  }, [endpoint])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  function reset() {
    setForm(emptyItem)
    setEditingId(null)
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    setError('')
    const payload = serialize ? serialize(form) : form
    const request = editingId ? api.put(`${endpoint}/${editingId}`, payload) : api.post(endpoint, payload)
    request
      .then(() => {
        reset()
        loadItems()
      })
      .catch((requestError) => setError(getErrorMessage(requestError)))
  }

  function edit(item) {
    setEditingId(item.id)
    setForm(normalize ? normalize(item) : { ...emptyItem, ...item })
  }

  function remove(item) {
    api.delete(`${endpoint}/${item.id}`).then(loadItems)
  }

  return (
    <section className="admin-section">
      <AdminTitle title={title} text={`Manage ${title.toLowerCase()} yang tampil di website publik.`} />
      <div className="admin-grid">
        <form className="admin-form" onSubmit={submit}>
          {fields.map(([name, label, type]) => (
            <Field
              key={name}
              label={label}
              type={type === 'number' ? 'number' : type === 'url' ? 'url' : 'text'}
              multiline={type === 'textarea'}
              value={form[name] ?? ''}
              onChange={(value) => setForm({ ...form, [name]: type === 'number' ? Number(value) : value })}
            />
          ))}
          {checkbox ? (
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={Boolean(form[checkbox[0]])}
                onChange={(event) => setForm({ ...form, [checkbox[0]]: event.target.checked })}
              />
              {checkbox[1]}
            </label>
          ) : null}
          {error ? <p className="alert error">{error}</p> : null}
          <div className="form-actions">
            <button className="button primary" type="submit">{editingId ? 'Update' : 'Create'}</button>
            {editingId ? <button className="button ghost" type="button" onClick={reset}>Cancel</button> : null}
          </div>
        </form>
        <div className="admin-list">
          {items.map((item) => (
            <article className="admin-list-item" key={item.id}>
              <span>{renderItem(item)}</span>
              <div>
                <button type="button" onClick={() => edit(item)}>Edit</button>
                <button type="button" onClick={() => remove(item)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function MessagesAdmin() {
  const [messages, setMessages] = useState([])

  function loadMessages() {
    api.get('/admin/contact-messages').then((response) => setMessages(response.data))
  }

  useEffect(() => {
    loadMessages()
  }, [])

  function markRead(message) {
    api.patch(`/admin/contact-messages/${message.id}/read`).then(loadMessages)
  }

  function remove(message) {
    api.delete(`/admin/contact-messages/${message.id}`).then(loadMessages)
  }

  return (
    <section className="admin-section">
      <AdminTitle title="Messages" text="Pesan masuk dari contact form." />
      <div className="message-list">
        {messages.map((message) => (
          <article className={`message-item ${message.is_read ? '' : 'unread'}`} key={message.id}>
            <div>
              <strong>{message.subject}</strong>
              <span>{message.name} · {message.email}</span>
              <p>{message.message}</p>
            </div>
            <div className="message-actions">
              {!message.is_read ? <button type="button" onClick={() => markRead(message)}>Mark Read</button> : null}
              <button type="button" onClick={() => remove(message)}>Delete</button>
            </div>
          </article>
        ))}
        {!messages.length ? <p className="muted">No messages yet.</p> : null}
      </div>
    </section>
  )
}

function Field({ label, value, onChange, type = 'text', multiline = false }) {
  const id = useMemo(() => label.toLowerCase().replace(/\s+/g, '-'), [label])
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {multiline ? (
        <textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} rows={5} />
      ) : (
        <input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  )
}

function AdminTitle({ title, text }) {
  return (
    <div className="admin-title">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function StateBlock({ title, text }) {
  return (
    <section className="state-block">
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function groupBy(items, key) {
  return items.reduce((result, item) => {
    const group = item[key] || 'Other'
    return { ...result, [group]: [...(result[group] || []), item] }
  }, {})
}

function parseJson(value, fallback) {
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export default App
