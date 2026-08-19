import { initializeTimes, updateTimes } from './bookingReducer'

describe('booking times reducer', () => {
  it('initializeTimes returns a non-empty list of time strings', () => {
    const times = initializeTimes()
    expect(Array.isArray(times)).toBe(true)
    expect(times.length).toBeGreaterThan(0)
    expect(times.every((slot) => /^\d{1,2}:\d{2}$/.test(slot))).toBe(true)
  })

  it('updateTimes returns available times for a selected date', () => {
    const result = updateTimes([], { type: 'UPDATE_TIMES', date: '2026-08-20' })
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('updateTimes returns the current state for unknown actions', () => {
    const state = ['17:00', '18:00']
    expect(updateTimes(state, { type: 'UNKNOWN' })).toEqual(state)
  })
})
