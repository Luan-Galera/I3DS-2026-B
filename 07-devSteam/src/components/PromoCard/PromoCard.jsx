import styles from "./PromoCard.module.css";

const PromoCard = () => {
  return (
    <div className={styles.card}>
      <img src="" alt="" />

      <h2 className={styles.offerText}>Oferta exclusiva</h2>

      <div className={styles.priceSection}>
        <span className={styles.discount}>-50%</span>

        <div className={styles.prices}>
          <p className={styles.oldPrice}>R$ 199,80</p>

          <p className={styles.newPrice}>R$ 99,90</p>
        </div>
      </div>

      <button className={styles.addToCart}>Adicionar ao carrinho</button>
    </div>
  );
};

export default PromoCard;
