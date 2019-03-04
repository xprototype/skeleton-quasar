/**
 * @param {Number} timestamp
 */
export const dateFromTimestamp = (timestamp) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  return new Date(timestamp * 1000)
}

/**
 * @param {Date} date
 * @returns {string}
 */
export const hourFromDate = (date) => {
  // Hours part from the timestamp
  const hours = date.getHours()
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes()
  // Seconds part from the timestamp
  const seconds = '0' + date.getSeconds()

  // Will display time in 10:30:23 format
  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
}
