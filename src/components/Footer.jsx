import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Family-owned Mediterranean restaurant in the heart of Chicago.</p>
        </div>
        <div>
          <h3>Doormat navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order">Order online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <address>
            123 Mediterranean Ave<br />
            Chicago, IL 60601<br />
            <a href="tel:+13125550199">(312) 555-0199</a><br />
            <a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a>
          </address>
        </div>
        <div>
          <h3>Social media</h3>
          <ul>
            <li><a href="https://facebook.com" rel="noreferrer" target="_blank">Facebook</a></li>
            <li><a href="https://instagram.com" rel="noreferrer" target="_blank">Instagram</a></li>
            <li><a href="https://x.com" rel="noreferrer" target="_blank">X (Twitter)</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
