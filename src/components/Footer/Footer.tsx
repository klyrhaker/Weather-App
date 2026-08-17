import styles from "./Footer.module.css";

function Footer({ city }: { city: string }) {
  return (
    <footer className={styles.footer}>
      <p
        className={styles.message}
      >{`weather in ${city} today special for you`}</p>
      <h2 className={styles.logo}>@klyrh Weather</h2>
    </footer>
  );
}
export default Footer;
