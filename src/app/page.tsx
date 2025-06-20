import styles from "./page.module.css";
import App from "../components/app/App";
export default function Home() {
  return (
    <div className={styles.page}>
      <App />
    </div>
  );
}
