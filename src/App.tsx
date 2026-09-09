import { EnrollForm } from './components/EnrollForm/EnrollForm'
import { Hero } from './components/Hero/Hero'
import { CONTACTS } from './config/site'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.logo} href="#top">
          <span className={styles.logoMark}>ОРТ</span>
          Центр подготовки
        </a>
        <a className={styles.phone} href={`tel:${CONTACTS.phoneLabel.replace(/\s/g, '')}`}>
          {CONTACTS.phoneLabel}
        </a>
      </div>
    </header>

    <main className={styles.main} id="top">
      <div className={`${styles.container} ${styles.layout}`}>
        <Hero />
        <EnrollForm />
      </div>
    </main>

    <footer className={styles.footer}>
      <div className={styles.container}>
        <span>© {new Date().getFullYear()} Центр подготовки к ОРТ, Бишкек</span>
        <span>Заявки принимаются ежедневно с 9:00 до 20:00</span>
      </div>
    </footer>
  </div>
)

export default App
