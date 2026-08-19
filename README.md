# Little Lemon Table Booking

React website for the Little Lemon restaurant, built as the **Meta Front-End Developer** capstone. Guests can browse the restaurant homepage and reserve a table through a validated booking form.

## Features

- Home page with hero, weekly specials, testimonials, and about section
- Table reservation form with live available times
- Client-side validation and accessible error messages
- Confirmation page after a successful booking
- Responsive layout for mobile, tablet, and desktop
- Unit tests for the form, reducer, and core pages

## Tech stack

- React 19 and Vite
- React Router
- Vitest and React Testing Library

## Getting started

### Requirements

- Node.js 18 or later
- npm 9 or later

### Install and run

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command | Description |
| --- | --- |
| `npm test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Using the booking form

1. Open **Reservations** or click **Reserve a table**.
2. Enter your name, email, date, time, guest count, and occasion.
3. Submit the form. Invalid fields show a short explanation of what to fix.
4. A confirmation screen appears when the booking is accepted.

Edge cases handled by the form:

- Missing required fields
- Invalid email addresses
- Dates in the past or more than 90 days ahead
- Guest counts outside 1–10
- Times that are no longer in the available list
- Failed API submission

## Project structure

```text
src/
  api.js                 Simulated fetchAPI and submitAPI
  bookingReducer.js      initializeTimes and updateTimes
  components/            Header, footer, form, and homepage sections
  pages/                 Route-level screens
  *.test.*               Unit tests
```

## Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `footer`, `form`
- Skip link to main content
- Labels, `aria-required`, `aria-invalid`, and `aria-describedby` on form fields
- Live region for form-level status messages
- Keyboard-accessible mobile navigation

## Design notes

The visual design follows the Little Lemon style guide:

- Primary colors: `#495E57` and `#F4CE14`
- Highlight colors: `#EE9972`, `#EDEFEE`, `#333333`
- Headings: Markazi Text
- Body copy: Karla
