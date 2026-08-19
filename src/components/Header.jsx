import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/order', label: 'Order Online' },
  { to: '/login', label: 'Login' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" aria-label="Little Lemon home" onClick={() => setOpen(false)}>
          <Logo />
        </NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav ${open ? 'open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
