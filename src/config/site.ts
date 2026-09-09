/**
 * Единая точка настройки лендинга.
 * Здесь меняются номер администратора, время записи, предметы и классы.
 */

/** Номер WhatsApp администратора: только цифры, с кодом страны, без «+» и пробелов. */
export const WHATSAPP_PHONE = '996706161109'

export const CONTACTS = {
  /** Отображаемый номер в шапке. */
  phoneLabel: '+996 706 161 109',
} as const

/**
 * Варианты в поле «Удобное время». Подогнать под реальное расписание центра.
 * Значение уходит в текст заявки как есть, поэтому «Любое время» — обычный пункт списка.
 */
export const TIME_SLOTS: readonly string[] = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  'Любое время',
] as const

/** На сколько дней вперёд разрешено выбирать день пробного урока. */
export const BOOKING_HORIZON_DAYS = 60

export interface SubjectOption {
  id: string
  label: string
  /** Пояснение под названием предмета. */
  hint?: string
  /** Основной тест выбран всегда и не снимается. */
  required?: boolean
}

export const SUBJECTS: readonly SubjectOption[] = [
  {
    id: 'main',
    label: 'Основной тест',
    hint: 'Математика, Аналогии, Чтение, Грамматика',
    required: true,
  },
  { id: 'math', label: 'Математика' },
  { id: 'physics', label: 'Физика' },
  { id: 'chemistry', label: 'Химия' },
  { id: 'biology', label: 'Биология' },
  { id: 'history', label: 'История' },
  { id: 'english', label: 'Английский язык' },
] as const

export interface GradeOption {
  id: string
  label: string
  /** Как класс звучит в тексте заявки: «Меня зовут Эльдос, я ученик 11 класса». */
  phrase: string
}

export const GRADES: readonly GradeOption[] = [
  { id: 'grade-10', label: '10 класс', phrase: 'ученик 10 класса' },
  { id: 'grade-11', label: '11 класс', phrase: 'ученик 11 класса' },
  { id: 'graduate', label: 'Выпускник', phrase: 'выпускник школы' },
] as const

