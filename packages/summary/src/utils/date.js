export function formatDate(timestamp, formatString) {
  function padding(n) {
    if (n < 10) return '0' + n
    return '' + n
  }
  let date = new Date(timestamp * 1000)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  var h = date.getHours()
  let mm = date.getMinutes()
  let s = date.getSeconds()
  return formatString
    .replace('YYYY', y)
    .replace('MM', padding(m))
    .replace('M', padding(m))
    .replace('DD', padding(d))
    .replace('HH', padding(h))
    .replace('mm', padding(mm))
    .replace('ss', padding(s))
}

export function dateTimeFormat(timestamp) {
  if (!timestamp) return ''
  let t = new Date(timestamp)
  const month = (t.getMonth() + 1 + '').padStart(2, '0')
  const date = (t.getDate() + '').padStart(2, '0')
  const hour = (t.getHours() + '').padStart(2, '0')
  const minute = (t.getMinutes() + '').padStart(2, '0')
  const second = (t.getSeconds() + '').padStart(2, '0')
  return `${t.getFullYear()}-${month}-${date} ${hour}:${minute}:${second}`
}

export function getDate(timestamp) {
  const date = dateTimeFormat(timestamp)
  return date.split(' ')[0]
}
export function getTime(timestamp) {
  const time = dateTimeFormat(timestamp)
  const list = time.split(' ')
  return list[list.length - 1]
}

export function getHourAndMinute(timestamp) {
  const time = getTime(timestamp)
  return time.split(':').slice(0, 2).join(':')
}

export function getMonthAndDate(timestamp) {
  const date = getDate(timestamp)
  return date.split('-').slice(1).join('-')
}
