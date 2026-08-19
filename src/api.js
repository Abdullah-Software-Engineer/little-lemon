/**
 * Simulated restaurant booking API used by the Little Lemon reservation form.
 * These helpers mirror the course-provided fetchAPI / submitAPI functions.
 */

function seededRandom(seed) {
  const m = 2 ** 35 - 31
  const a = 185852
  let s = seed % m
  return function next() {
    s = (s * a) % m
    return s / m
  }
}

/** Returns available reservation times for a given date. */
export function fetchAPI(date) {
  const result = []
  const random = seededRandom(date.getDate())

  for (let hour = 17; hour <= 23; hour += 1) {
    if (random() < 0.5) result.push(`${hour}:00`)
    if (random() < 0.5) result.push(`${hour}:30`)
  }

  return result
}

/** Simulates submitting a booking. Returns true when the booking is accepted. */
export function submitAPI(formData) {
  return Boolean(formData && formData.date && formData.time)
}
