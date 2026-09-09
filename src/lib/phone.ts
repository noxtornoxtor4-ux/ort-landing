/** Код страны Кыргызстана и количество цифр в национальном номере. */
export const COUNTRY_CODE = '996'
export const NATIONAL_DIGITS = 9

/**
 * Оставляет только цифры национального номера.
 * Понимает вставку из буфера в любом виде: «+996 555 12 34 56», «996555123456», «0555123456».
 * Лишний код страны и ведущий ноль срезаются только при избытке цифр, чтобы не ломать набор вручную.
 */
export const normalizePhone = (value: string): string => {
  let digits = value.replace(/\D/g, '')

  if (digits.length > NATIONAL_DIGITS && digits.startsWith(COUNTRY_CODE)) {
    digits = digits.slice(COUNTRY_CODE.length)
  }

  if (digits.length > NATIONAL_DIGITS && digits.startsWith('0')) {
    digits = digits.slice(1)
  }

  return digits.slice(0, NATIONAL_DIGITS)
}

/** 555 12 34 56 — маска для поля ввода. */
export const formatPhone = (digits: string): string => {
  const groups = [digits.slice(0, 3), digits.slice(3, 5), digits.slice(5, 7), digits.slice(7, 9)]
  return groups.filter(Boolean).join(' ')
}

export const isValidPhone = (digits: string): boolean => digits.length === NATIONAL_DIGITS

/** Полный номер для текста заявки: +996 555 12 34 56. */
export const toInternational = (digits: string): string =>
  `+${COUNTRY_CODE} ${formatPhone(digits)}`
