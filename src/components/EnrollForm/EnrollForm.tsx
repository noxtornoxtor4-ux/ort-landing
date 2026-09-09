import { useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, MouseEvent } from 'react'

import { BOOKING_HORIZON_DAYS, GRADES, SUBJECTS, TIME_SLOTS } from '../../config/site'
import { formatDateLabel, isoOffset } from '../../lib/date'
import { formatPhone, isValidPhone, normalizePhone } from '../../lib/phone'
import { buildRequestText, buildWhatsAppLink, type EnrollRequest } from '../../lib/whatsapp'
import { CheckIcon } from '../Icons/CheckIcon'
import { WhatsAppIcon } from '../Icons/WhatsAppIcon'
import styles from './EnrollForm.module.scss'

type FieldName = 'date' | 'time' | 'name' | 'grade' | 'phone'
type Errors = Partial<Record<FieldName, string>>

const REQUIRED_SUBJECT_IDS = SUBJECTS.filter((subject) => subject.required).map(
  (subject) => subject.id,
)

const cx = (...classNames: (string | false | undefined)[]) => classNames.filter(Boolean).join(' ')

export const EnrollForm = () => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [subjectIds, setSubjectIds] = useState<string[]>(REQUIRED_SUBJECT_IDS)
  const [name, setName] = useState('')
  const [gradeId, setGradeId] = useState('')
  const [phoneDigits, setPhoneDigits] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sentRequest, setSentRequest] = useState<EnrollRequest | null>(null)

  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const gradeRef = useRef<HTMLSelectElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  /** Границы календаря: сегодня и горизонт записи из конфига. */
  const minDate = useMemo(() => isoOffset(0), [])
  const maxDate = useMemo(() => isoOffset(BOOKING_HORIZON_DAYS), [])

  const selectedSubjects = useMemo(
    () =>
      SUBJECTS.filter((subject) => subjectIds.includes(subject.id)).map((subject) => subject.label),
    [subjectIds],
  )

  const request = useMemo<EnrollRequest>(
    () => ({
      name: name.trim(),
      gradePhrase: GRADES.find((item) => item.id === gradeId)?.phrase ?? '',
      subjects: selectedSubjects,
      dateLabel: date ? formatDateLabel(date) : '',
      time,
      phoneDigits,
    }),
    [date, gradeId, name, phoneDigits, selectedSubjects, time],
  )

  /** Ссылка пересобирается на каждое изменение формы, чтобы CTA оставался обычным <a href>. */
  const link = useMemo(() => buildWhatsAppLink(request), [request])

  /** Тот же текст, но с заглушками вместо пустых полей — для превью сообщения. */
  const previewText = useMemo(
    () =>
      buildRequestText({
        ...request,
        name: request.name || 'Эльдос',
        gradePhrase: request.gradePhrase || 'ученик 11 класса',
        dateLabel: request.dateLabel || formatDateLabel(minDate),
        time: request.time || '15:00',
        phoneDigits: request.phoneDigits || '555123456',
      }),
    [minDate, request],
  )

  /**
   * Подсказка «заявка сформирована» держится ровно до первой правки:
   * при любом изменении формы useMemo отдаёт новый объект заявки, и сравнение перестаёт совпадать.
   */
  const sent = sentRequest === request

  const clearError = (field: FieldName) =>
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))

  const toggleSubject = (id: string) =>
    setSubjectIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
    clearError('date')
  }

  const handleTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value)
    clearError('time')
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    clearError('name')
  }

  const handleGradeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGradeId(event.target.value)
    clearError('grade')
  }

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneDigits(normalizePhone(event.target.value))
    clearError('phone')
  }

  const validate = (): Errors => {
    const nextErrors: Errors = {}

    if (!date) {
      nextErrors.date = 'Выберите удобный день'
    } else if (date < minDate) {
      nextErrors.date = 'Этот день уже прошёл'
    }

    if (!time) {
      nextErrors.time = 'Выберите удобное время'
    }

    if (name.trim().length < 2) {
      nextErrors.name = 'Укажите имя — как к вам обращаться'
    }

    if (!gradeId) {
      nextErrors.grade = 'Выберите класс'
    }

    if (!isValidPhone(phoneDigits)) {
      nextErrors.phone = 'Введите 9 цифр номера, например 555 12 34 56'
    }

    return nextErrors
  }

  /** Возвращает курсор в первое незаполненное поле, чтобы ошибка не осталась за экраном. */
  const focusFirstError = (nextErrors: Errors) => {
    if (nextErrors.date) {
      dateRef.current?.focus()
      return
    }

    if (nextErrors.time) {
      timeRef.current?.focus()
      return
    }

    if (nextErrors.name) {
      nameRef.current?.focus()
      return
    }

    if (nextErrors.grade) {
      gradeRef.current?.focus()
      return
    }

    phoneRef.current?.focus()
  }

  const isReady = (): boolean => {
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return false
    }

    return true
  }

  /** Клик по ссылке: невалидную форму не пускаем дальше, валидную браузер откроет сам. */
  const handleCtaClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isReady()) {
      event.preventDefault()
      return
    }

    setSentRequest(request)
  }

  /** Enter в поле ввода: переход в текущей вкладке — его не блокирует ни один браузер. */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isReady()) {
      return
    }

    setSentRequest(request)
    window.location.href = link
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <h2 className={styles.title}>Заявка на пробный урок</h2>
        <p className={styles.lead}>
          Выберите предметы и удобное время — текст заявки соберётся автоматически и откроется в
          WhatsApp.
        </p>
      </div>

      <fieldset className={styles.step}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>1</span>
          Когда вам удобно
        </legend>

        <div className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Удобный день</span>
            <input
              ref={dateRef}
              className={styles.input}
              type="date"
              name="date"
              min={minDate}
              max={maxDate}
              value={date}
              aria-invalid={Boolean(errors.date)}
              onChange={handleDateChange}
            />
            {errors.date && (
              <span className={styles.error} role="alert">
                {errors.date}
              </span>
            )}
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Удобное время</span>
            <select
              ref={timeRef}
              className={styles.select}
              name="time"
              value={time}
              aria-invalid={Boolean(errors.time)}
              onChange={handleTimeChange}
            >
              <option value="" disabled>
                Выберите время
              </option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && (
              <span className={styles.error} role="alert">
                {errors.time}
              </span>
            )}
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.step}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>2</span>
          Предметы ОРТ
        </legend>

        <div className={styles.subjects}>
          {SUBJECTS.map((subject) => {
            const checked = subjectIds.includes(subject.id)

            return (
              <label
                key={subject.id}
                className={cx(
                  styles.subject,
                  checked && styles.active,
                  subject.required && styles.locked,
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={subject.required}
                  onChange={() => toggleSubject(subject.id)}
                />
                <span className={styles.box} aria-hidden="true">
                  <CheckIcon />
                </span>
                <span className={styles.subjectText}>
                  <span className={styles.subjectLabel}>
                    {subject.label}
                    {subject.required && <span className={styles.tag}>Обязательно</span>}
                  </span>
                  {subject.hint && <span className={styles.subjectHint}>{subject.hint}</span>}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className={styles.step}>
        <legend className={styles.legend}>
          <span className={styles.stepNumber}>3</span>
          Контакты
        </legend>

        <div className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Ваше имя</span>
            <input
              ref={nameRef}
              className={styles.input}
              type="text"
              name="name"
              placeholder="Например, Айпери"
              autoComplete="name"
              value={name}
              aria-invalid={Boolean(errors.name)}
              onChange={handleNameChange}
            />
            {errors.name && (
              <span className={styles.error} role="alert">
                {errors.name}
              </span>
            )}
          </label>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Класс</span>
            <select
              ref={gradeRef}
              className={styles.select}
              name="grade"
              value={gradeId}
              aria-invalid={Boolean(errors.grade)}
              onChange={handleGradeChange}
            >
              <option value="" disabled>
                Выберите класс
              </option>
              {GRADES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.grade && (
              <span className={styles.error} role="alert">
                {errors.grade}
              </span>
            )}
          </label>

          <label className={cx(styles.field, styles.fieldWide)}>
            <span className={styles.fieldLabel}>Номер телефона / WhatsApp</span>
            <span className={styles.phone}>
              <span className={styles.prefix}>+996</span>
              <input
                ref={phoneRef}
                className={styles.input}
                type="tel"
                name="phone"
                inputMode="numeric"
                placeholder="555 12 34 56"
                autoComplete="tel-national"
                value={formatPhone(phoneDigits)}
                aria-invalid={Boolean(errors.phone)}
                onChange={handlePhoneChange}
              />
            </span>
            {errors.phone && (
              <span className={styles.error} role="alert">
                {errors.phone}
              </span>
            )}
          </label>
        </div>
      </fieldset>

      <section className={styles.preview} aria-label="Превью сообщения">
        <p className={styles.previewHead}>
          <WhatsAppIcon size={15} />
          Это сообщение уже будет в поле ввода
        </p>
        <div className={styles.bubble}>
          <p className={styles.bubbleText}>{previewText}</p>
          <span className={styles.bubbleMeta}>
            сейчас
            <CheckIcon size={12} />
          </span>
        </div>
      </section>

      <a
        className={styles.submit}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
      >
        <WhatsAppIcon size={22} />
        Записаться на пробный урок в WhatsApp
      </a>

      {sent ? (
        <p className={styles.note} role="status">
          Заявка сформирована — отправьте сообщение в открывшемся чате WhatsApp.
        </p>
      ) : (
        <p className={styles.note}>
          Нажимая кнопку, вы переходите в WhatsApp с готовым текстом заявки — останется только
          отправить сообщение.
        </p>
      )}
    </form>
  )
}
