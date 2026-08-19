import { useMemo, useState } from 'react'

const OCCASIONS = ['Birthday', 'Anniversary', 'Engagement', 'Business', 'Other']

function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function todayISO() {
  return toISODate(new Date())
}

function maxDateISO() {
  const date = new Date()
  date.setDate(date.getDate() + 90)
  return toISODate(date)
}

export function validateBooking(values, availableTimes = []) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const today = todayISO()
  const maxDate = maxDateISO()
  const guests = Number(values.guests)

  if (!name) errors.name = 'Please enter your full name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address, such as name@example.com.'
  }

  if (!values.date) errors.date = 'Please choose a reservation date.'
  else if (values.date < today) errors.date = 'Reservations cannot be made for dates in the past.'
  else if (values.date > maxDate) errors.date = 'Please choose a date within the next 90 days.'

  if (!values.time) errors.time = 'Please select an available time.'
  else if (availableTimes.length > 0 && !availableTimes.includes(values.time)) {
    errors.time = 'That time is no longer available. Please pick another slot.'
  }

  if (values.guests === '' || Number.isNaN(guests)) {
    errors.guests = 'Please enter the number of guests.'
  } else if (guests < 1) {
    errors.guests = 'At least 1 guest is required.'
  } else if (guests > 10) {
    errors.guests = 'For parties larger than 10, please call the restaurant at (312) 555-0199.'
  }

  if (!values.occasion) errors.occasion = 'Please select an occasion.'

  return errors
}

const initialValues = {
  name: '',
  email: '',
  date: '',
  time: '',
  guests: 2,
  occasion: '',
  requests: '',
}

export default function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const today = useMemo(() => todayISO(), [])
  const maxDate = useMemo(() => maxDateISO(), [])

  function updateField(field, value) {
    const next = { ...values, [field]: value }
    if (field === 'date') next.time = ''
    setValues(next)
    if (errors[field] || status) {
      setErrors(validateBooking(next, field === 'date' ? [] : availableTimes))
      setStatus('')
    }
  }

  function handleDateChange(event) {
    const date = event.target.value
    updateField('date', date)
    if (date) dispatch({ type: 'UPDATE_TIMES', date })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateBooking(values, availableTimes)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('Please correct the highlighted fields and try again.')
      return
    }

    const accepted = submitForm(values)
    if (!accepted) {
      setStatus('We could not complete your reservation. Please try another time.')
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-describedby="form-status">
      <p id="form-status" className="form-status error" role="status" aria-live="polite">
        {status}
      </p>

      <div className="form-row">
        <label htmlFor="res-name">Full name</label>
        <input
          id="res-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={60}
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'res-name-error' : 'res-name-hint'}
        />
        <span id="res-name-hint" className="hint">
          Use the name that will appear at the host stand.
        </span>
        {errors.name ? (
          <span id="res-name-error" className="error" role="alert">
            {errors.name}
          </span>
        ) : null}
      </div>

      <div className="form-row">
        <label htmlFor="res-email">Email</label>
        <input
          id="res-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'res-email-error' : undefined}
        />
        {errors.email ? (
          <span id="res-email-error" className="error" role="alert">
            {errors.email}
          </span>
        ) : null}
      </div>

      <div className="form-row two">
        <div className="form-row">
          <label htmlFor="res-date">Date</label>
          <input
            id="res-date"
            name="date"
            type="date"
            required
            min={today}
            max={maxDate}
            value={values.date}
            onChange={handleDateChange}
            aria-required="true"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'res-date-error' : 'res-date-hint'}
          />
          <span id="res-date-hint" className="hint">
            Same-day tables are limited.
          </span>
          {errors.date ? (
            <span id="res-date-error" className="error" role="alert">
              {errors.date}
            </span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="res-time">Time</label>
          <select
            id="res-time"
            name="time"
            required
            value={values.time}
            onChange={(event) => updateField('time', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'res-time-error' : 'res-time-hint'}
          >
            <option value="">Select a time</option>
            {availableTimes.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <span id="res-time-hint" className="hint">
            {availableTimes.length
              ? `${availableTimes.length} times available for the selected date.`
              : 'Choose a date to load available times.'}
          </span>
          {errors.time ? (
            <span id="res-time-error" className="error" role="alert">
              {errors.time}
            </span>
          ) : null}
        </div>
      </div>

      <div className="form-row two">
        <div className="form-row">
          <label htmlFor="res-guests">Number of guests</label>
          <input
            id="res-guests"
            name="guests"
            type="number"
            required
            min={1}
            max={10}
            value={values.guests}
            onChange={(event) => updateField('guests', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'res-guests-error' : 'res-guests-hint'}
          />
          <span id="res-guests-hint" className="hint">
            Maximum 10 guests per online booking.
          </span>
          {errors.guests ? (
            <span id="res-guests-error" className="error" role="alert">
              {errors.guests}
            </span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="res-occasion">Occasion</label>
          <select
            id="res-occasion"
            name="occasion"
            required
            value={values.occasion}
            onChange={(event) => updateField('occasion', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.occasion)}
            aria-describedby={errors.occasion ? 'res-occasion-error' : undefined}
          >
            <option value="">Select an occasion</option>
            {OCCASIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.occasion ? (
            <span id="res-occasion-error" className="error" role="alert">
              {errors.occasion}
            </span>
          ) : null}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="res-requests">Special requests (optional)</label>
        <textarea
          id="res-requests"
          name="requests"
          rows={3}
          maxLength={250}
          value={values.requests}
          onChange={(event) => updateField('requests', event.target.value)}
          aria-describedby="res-requests-hint"
        />
        <span id="res-requests-hint" className="hint">
          Allergies, high chair, or accessibility needs.
        </span>
      </div>

      <button className="btn btn-primary" type="submit" aria-label="On Click">
        Make your reservation
      </button>
    </form>
  )
}
