import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm, { validateBooking } from './components/BookingForm'

const availableTimes = ['17:00', '18:30', '20:00']

function futureDate(daysAhead = 7) {
  const date = new Date()
  date.setDate(date.getDate() + daysAhead)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function renderForm(props = {}) {
  const submitForm = props.submitForm ?? vi.fn(() => true)
  const dispatch = props.dispatch ?? vi.fn()
  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={dispatch}
      submitForm={submitForm}
    />,
  )
  return { submitForm, dispatch }
}

describe('BookingForm', () => {
  it('renders the static labels and fields for a table booking', () => {
    renderForm()

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^date$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^time$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /on click/i })).toBeInTheDocument()
  })

  it('includes HTML5 validation attributes on the required inputs', () => {
    renderForm()

    const date = screen.getByLabelText(/^date$/i)
    const guests = screen.getByLabelText(/number of guests/i)
    const email = screen.getByLabelText(/email/i)

    expect(date).toHaveAttribute('type', 'date')
    expect(date).toBeRequired()
    expect(guests).toHaveAttribute('min', '1')
    expect(guests).toHaveAttribute('max', '10')
    expect(email).toHaveAttribute('type', 'email')
  })

  it('shows accessible error messages when submitted empty', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /on click/i }))

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument()
    expect(screen.getByText(/please choose a reservation date/i)).toBeInTheDocument()
    expect(screen.getByText(/please select an available time/i)).toBeInTheDocument()
    expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument()
  })

  it('dispatches UPDATE_TIMES when the date changes', () => {
    const { dispatch } = renderForm()
    const date = futureDate()

    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: date } })

    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date })
  })

  it('submits valid booking data', async () => {
    const user = userEvent.setup()
    const { submitForm } = renderForm()
    const date = futureDate()

    await user.type(screen.getByLabelText(/full name/i), 'Ada Lovelace')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: date } })
    await user.selectOptions(screen.getByLabelText(/^time$/i), '18:30')
    await user.clear(screen.getByLabelText(/number of guests/i))
    await user.type(screen.getByLabelText(/number of guests/i), '4')
    await user.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday')
    await user.click(screen.getByRole('button', { name: /on click/i }))

    expect(submitForm).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        date,
        time: '18:30',
        guests: '4',
        occasion: 'Birthday',
      }),
    )
  })
})

describe('validateBooking', () => {
  it('rejects past dates, invalid emails, and oversized parties', () => {
    const errors = validateBooking(
      {
        name: 'A',
        email: 'not-an-email',
        date: '2020-01-01',
        time: '10:00',
        guests: 12,
        occasion: '',
      },
      availableTimes,
    )

    expect(errors.name).toMatch(/at least 2 characters/i)
    expect(errors.email).toMatch(/valid email/i)
    expect(errors.date).toMatch(/past/i)
    expect(errors.time).toMatch(/no longer available/i)
    expect(errors.guests).toMatch(/larger than 10/i)
    expect(errors.occasion).toMatch(/select an occasion/i)
  })
})
