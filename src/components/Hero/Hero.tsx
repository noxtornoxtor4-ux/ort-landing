import styles from './Hero.module.scss'

export const Hero = () => (
  <div className={styles.hero}>
    <p className={styles.status}>
      <span className={styles.pulse} aria-hidden="true" />
      Приём заявок открыт • Быстрый ответ в WhatsApp
    </p>

    <h1 className={styles.title}>
      Подготовка к <span className={styles.accent}>ОРТ 2026–2027</span> в Бишкеке
    </h1>

    <p className={styles.subtitle}>
      Запишитесь на бесплатное пробное тестирование и подберите предметы под вашу будущую
      специальность.
    </p>
  </div>
)
