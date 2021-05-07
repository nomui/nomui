export function getTimestamp(value) {
  return new Date(value).getTime()
}

// Countdown
const timeUnits = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
]

// function padStart(string, length, chars) {
//   const strLength = length ? stringSize(string) : 0
//   return length && strLength < length
//     ? createPadding(length - strLength, chars) + string
//     : string || ''
// }

function padStart(string, length, chars) {
  if (!string) return ''
  const repeatCount = length - string.length
  return repeatCount > 0 ? `${chars.repeat(repeatCount)}${string}` : string
}

export function formatTimeStr(duration, format) {
  let leftDuration = duration

  const escapeRegex = /\[[^\]]*]/g
  const keepList = (format.match(escapeRegex) || []).map((str) => str.slice(1, -1))
  const templateText = format.replace(escapeRegex, '[]')

  const replacedText = timeUnits.reduce((current, [name, unit]) => {
    if (current.indexOf(name) !== -1) {
      const value = Math.floor(leftDuration / unit)
      leftDuration -= value * unit
      return current.replace(new RegExp(`${name}+`, 'g'), (match) => {
        const len = match.length
        return padStart(value.toString(), len, '0')
      })
    }
    return current
  }, templateText)

  let index = 0
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index]
    index += 1
    return match
  })
}
