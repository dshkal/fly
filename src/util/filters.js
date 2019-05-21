import  moment from 'moment-timezone'

const timeZone = 'Europe/Kiev'

export function formatTime (value) {
  const date = moment(value)
  return date.tz(timeZone).format('h:mm a')
}

export function formatDate (value) {
  const date = moment(value)
  return date.tz(timeZone).format('MM/DD/YYYY')
}
