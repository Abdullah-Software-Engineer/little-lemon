import { fetchAPI } from './api'

/** Initial available times for today's date. */
export function initializeTimes() {
  return fetchAPI(new Date())
}

/**
 * Updates available times when the guest picks a new reservation date.
 * Kept as a pure reducer so it can be unit tested independently of React.
 */
export function updateTimes(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES': {
      const selectedDate = new Date(`${action.date}T00:00:00`)
      return fetchAPI(selectedDate)
    }
    default:
      return state
  }
}
