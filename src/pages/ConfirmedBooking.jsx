import { Link, Navigate } from 'react-router-dom'

function readBooking() {
  try {
    const stored = window.sessionStorage.getItem('littleLemonBooking')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export default function ConfirmedBooking() {
  const booking = readBooking()

  if (!booking) {
    return <Navigate to="/reservations" replace />
  }

  return (
    <main id="main-content" className="confirmed">
      <div className="container">
        <section className="confirmed-card" aria-labelledby="confirmed-heading">
          <h1 id="confirmed-heading">Booking confirmed</h1>
          <p>
            Thank you, {booking.name}. A confirmation has been sent to {booking.email}.
          </p>
          <dl className="summary">
            <div>
              <dt>Date</dt>
              <dd>{booking.date}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{booking.time}</dd>
            </div>
            <div>
              <dt>Guests</dt>
              <dd>{booking.guests}</dd>
            </div>
            <div>
              <dt>Occasion</dt>
              <dd>{booking.occasion}</dd>
            </div>
          </dl>
          <Link className="btn btn-dark" to="/">
            Back to home
          </Link>
        </section>
      </div>
    </main>
  )
}
