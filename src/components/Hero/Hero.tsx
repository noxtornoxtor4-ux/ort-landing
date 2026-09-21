import styles from './Hero.module.scss'

export const Hero = () => (
  <div className={styles.hero}>
    <p className={styles.status}>
      <span className={styles.pulse} aria-hidden="true" />
      Приём заявок открыт • Быстрый ответ в WhatsApp
    </p>

    <h1 className={styles.title}>
      Подготовка к <span className={styles.accent}>ОРТ 2026–2027</span> в Кыргызстане
    </h1>

    <p className={styles.subtitle}>
      Офлайн в Караколе или онлайн по всему Кыргызстану. Оставьте заявку — мы перезвоним в удобное
      для вас время и подберём предметы под будущую специальность.
    </p>
  </div>
)
