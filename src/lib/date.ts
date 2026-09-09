const DAY_MONTH = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' })
const WEEKDAY = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' })

const pad = (value: number): string => String(value).padStart(2, '0')

/**
 * Дата в формате input[type="date"] со сдвигом в днях от сегодня.
 * Считается по местному времени: toISOString() увёл бы дату на сутки из-за UTC.
 */
export const isoOffset = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** «14 сентября (понедельник)» — как день выглядит в тексте заявки. */
export const formatDateLabel = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`)

  return `${DAY_MONTH.format(date)} (${WEEKDAY.format(date)})`
}
