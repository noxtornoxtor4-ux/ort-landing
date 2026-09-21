import { CENTER, WHATSAPP_PHONE } from '../config/site'
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
  format: string
  subjects: string[]
  /** День звонка в человеческом виде: «23 сентября (среда)». */
  dateLabel: string
  callSlot: string
  phoneDigits: string
  parentPhoneDigits: string
}

/** Собирает текст заявки, который увидит администратор в WhatsApp. */
export const buildRequestText = (request: EnrollRequest): string =>
  [
    `Здравствуйте! Меня зовут ${request.name}, я ${request.gradePhrase}.`,
    `Хочу записаться на пробный урок по ОРТ в ${CENTER.name}.`,
    '',
    '📌 Детали заявки:',
    `• Формат: ${request.format}`,
    `• Предметы: ${request.subjects.join(', ')}`,
    `• Удобно позвонить: ${request.dateLabel}, ${request.callSlot}`,
    `• Телефон ученика: ${toInternational(request.phoneDigits)}`,
    `• Телефон родителя: ${toInternational(request.parentPhoneDigits)}`,
    '',
    'Подскажите, пожалуйста, расписание и стоимость.',
  ].join('\n')

/** Ссылка на чат с администратором с уже подставленным текстом заявки. */
export const buildWhatsAppLink = (request: EnrollRequest): string =>
  `${WHATSAPP_ENDPOINT}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(buildRequestText(request))}`
