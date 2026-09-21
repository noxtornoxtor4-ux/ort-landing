import { EnrollForm } from './components/EnrollForm/EnrollForm'
import { Hero } from './components/Hero/Hero'
import { CENTER } from './config/site'
import novaWordmark from './assets/nova-wordmark.png'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.logo} href="#top">
          <img src={novaWordmark} alt={CENTER.name} width="645" height="215" />
        </a>
        <a className={styles.phone} href={`tel:${CENTER.phoneLabel.replace(/\s/g, '')}`}>
          {CENTER.phoneLabel}
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
        <span>
          © {new Date().getFullYear()} {CENTER.legalName}, {CENTER.city}
        </span>
        <span>Офлайн в Караколе · Онлайн по всему Кыргызстану</span>
      </div>
    </footer>
  </div>
)

export default App
