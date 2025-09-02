import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"

import styles from "./css/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Cost Project</span> &copy; 2025
      </p>
    </footer>
  )
}
