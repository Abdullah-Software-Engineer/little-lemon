import { Link } from 'react-router-dom'
import Specials from '../components/Specials'
import Testimonials from '../components/Testimonials'

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div>
            <h1 id="hero-heading">Little Lemon</h1>
            <p className="subtitle">Chicago</p>
            <p>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes
              served with a modern twist.
            </p>
            <Link className="btn btn-primary" to="/reservations">
              Reserve a table
            </Link>
          </div>
          <div className="hero-card" role="img" aria-label="Mediterranean dishes served at Little Lemon">
            Fresh Mediterranean
            <br />
            flavors, daily
          </div>
        </div>
      </section>
      <Specials />
      <Testimonials />
      <section className="section" aria-labelledby="about-heading">
        <div className="container about-grid">
          <div>
            <h2 id="about-heading">Little Lemon</h2>
            <p className="subtitle markazi">Chicago</p>
            <p>
              Mario and Adrian opened Little Lemon to share the recipes they grew up with —
              bright citrus, olive oil, and herbs — alongside seasonal Illinois produce.
            </p>
            <p>
              Whether you are joining us for a weeknight dinner or a celebration, our team is
              ready to welcome you.
            </p>
          </div>
          <div className="about-art" aria-hidden="true">
            <div className="portrait one">Chef Mario</div>
            <div className="portrait two">Chef Adrian</div>
          </div>
        </div>
      </section>
    </main>
  )
}
