import { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import { submitAPI } from '../api'
import { initializeTimes, updateTimes } from '../bookingReducer'

export default function BookingPage() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes)
  const navigate = useNavigate()

  function submitForm(formData) {
    const success = submitAPI(formData)
    if (success) {
      window.sessionStorage.setItem('littleLemonBooking', JSON.stringify(formData))
      navigate('/confirmed')
    }
    return success
  }

  return (
    <main id="main-content">
      <section className="booking-hero" aria-labelledby="booking-heading">
        <div className="container">
          <h1 id="booking-heading">Reserve a table</h1>
          <p>Book a table at Little Lemon. We will hold your reservation for 15 minutes.</p>
        </div>
      </section>
      <div className="container booking-layout">
        <BookingForm
          availableTimes={availableTimes}
          dispatch={dispatch}
          submitForm={submitForm}
        />
        <aside className="aside-card" aria-labelledby="booking-notes">
          <h2 id="booking-notes">Before you book</h2>
          <ul>
            <li>Indoor and patio seating is assigned on arrival.</li>
            <li>Parties larger than 10 should call (312) 555-0199.</li>
            <li>Please arrive on time so we can seat the next guests fairly.</li>
            <li>Tell us about allergies in the special requests field.</li>
          </ul>
        </aside>
      </div>
    </main>
  )
}
