import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  it('renders the Little Lemon homepage hero', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: /little lemon/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /reserve a table/i })).toBeInTheDocument()
  })

  it('opens the reservations page from the home call to action', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('link', { name: /reserve a table/i }))
    expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
  })
})
