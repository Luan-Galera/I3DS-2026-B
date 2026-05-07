import styles from "./Header.module.css";
import logo from "../../assets/devSteam_logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>

      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          DevSteam
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.cart}>
        <ion-icon name="cart-outline"></ion-icon>
      </div>
    </header>
  );
};

export default Header;
