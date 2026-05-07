import styles from "./OutrosJogosCard.module.css";

const OutrosJogosCard = () => {
  return (
    <div className={styles.card}>
      <img src="CSGO" alt="CSGO" className={styles.image} />

      <div className={styles.info}>
        <h2 className={styles.title}>Counter Strike: Global Offensive</h2>
        <p className={styles.genre}>Ação, Estratégia, Multijogador.</p>
        <span className={styles.actualPrice}>R$ 99,90</span>
        <button className={styles.button}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
};

export default OutrosJogosCard;
