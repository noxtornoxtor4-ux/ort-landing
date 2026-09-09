import { WHATSAPP_PHONE } from '../config/site'
import { toInternational } from './phone'

/**
 * api.whatsapp.com/send надёжнее короткого wa.me: десктопное приложение WhatsApp
 * по нему подставляет текст, а не открывает пустой чат.
 */
const WHATSAPP_ENDPOINT = 'https://api.whatsapp.com/send'

export interface EnrollRequest {
  name: string
  /** Готовая формулировка класса: «ученик 11 класса», «выпускник школы». */
  gradePhrase: string
  subjects: string[]
  /** День в человеческом виде: «14 сентября (понедельник)». */
  dateLabel: string
  time: string
  phoneDigits: string
}

/** Собирает текст заявки, который увидит администратор в WhatsApp. */
export const buildRequestText = (request: EnrollRequest): string =>
  [
    `Здравствуйте! Меня зовут ${request.name}, я ${request.gradePhrase}.`,
    'Хочу записаться на пробный урок по ОРТ.',
    '',
    '📌 Детали заявки:',
    `• Предметы: ${request.subjects.join(', ')}`,
    `• Удобный день: ${request.dateLabel}`,
    `• Удобное время: ${request.time}`,
    `• Телефон для связи: ${toInternational(request.phoneDigits)}`,
    '',
    'Подскажите, пожалуйста, расписание и стоимость.',
  ].join('\n')

/** Ссылка на чат с администратором с уже подставленным текстом заявки. */
export const buildWhatsAppLink = (request: EnrollRequest): string =>
  `${WHATSAPP_ENDPOINT}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(buildRequestText(request))}`
