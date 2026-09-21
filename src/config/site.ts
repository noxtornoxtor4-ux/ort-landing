/**
 * Единая точка настройки лендинга.
 * Здесь меняются данные центра, форматы обучения, предметы, время звонка и классы.
 */

/** Номер WhatsApp администратора: только цифры, с кодом страны, без «+» и пробелов. */
export const WHATSAPP_PHONE = '996706161109'

export const CENTER = {
  name: 'NOVA',
  /** Полное название для подвала. */
  legalName: '«НОВА» билим берүү мекемеси',
  city: 'Каракол',
  /** Отображаемый номер в шапке. */
  phoneLabel: '+996 706 161 109',
} as const

export interface FormatOption {
  id: string
  label: string
  hint: string
}

export const FORMATS: readonly FormatOption[] = [
  { id: 'offline', label: 'Офлайн в Караколе', hint: 'Занятия в центре с преподавателем' },
  { id: 'online', label: 'Онлайн', hint: 'Из любой точки Кыргызстана' },
] as const

export interface SubjectOption {
  id: string
  label: string
  /** Форматы, в которых предмет преподаётся. */
  formats: readonly string[]
}

/** Офлайн в Караколе — основные предметы, онлайн — предметные тесты. */
export const SUBJECTS: readonly SubjectOption[] = [
  { id: 'math', label: 'Математика', formats: ['offline'] },
  { id: 'kyrgyz', label: 'Кыргызский язык', formats: ['offline'] },
  { id: 'russian', label: 'Русский язык', formats: ['offline'] },
  { id: 'chemistry', label: 'Химия', formats: ['online'] },
  { id: 'biology', label: 'Биология', formats: ['online'] },
] as const

export const getSubjectsForFormat = (formatId: string): readonly SubjectOption[] =>
  SUBJECTS.filter((subject) => subject.formats.includes(formatId))

/**
 * Интервалы, в которые колл-центру удобно звонить.
 * Значение уходит в текст заявки как есть, поэтому «Любое время» — обычный пункт списка.
 */
export const CALL_SLOTS: readonly string[] = [
  '09:00–12:00',
  '12:00–15:00',
  '15:00–18:00',
  '18:00–20:00',
  'Любое время',
] as const

/** На сколько дней вперёд можно выбрать день звонка. */
export const BOOKING_HORIZON_DAYS = 14

export interface GradeOption {
  id: string
  label: string
  /** Как класс звучит в тексте заявки: «Меня зовут Эльдос, я ученик 11 класса». */
  phrase: string
}

export const GRADES: readonly GradeOption[] = [
  { id: 'grade-9', label: '9 класс', phrase: 'ученик 9 класса' },
  { id: 'grade-10', label: '10 класс', phrase: 'ученик 10 класса' },
  { id: 'grade-11', label: '11 класс', phrase: 'ученик 11 класса' },
  { id: 'graduate', label: 'Выпускник', phrase: 'выпускник школы' },
] as const
