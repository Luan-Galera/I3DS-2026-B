import styles from './Cart.modules.css'

const Cart = () => {
  return (
    <div>
      <div className={styles.item}>

  <img className={styles.image} src="" alt="" />

  <div className={styles.info}>

    <h4 className={styles.name}></h4>

    <span className={styles.price}></span>

    <p className={styles.remove}>Remover</p>

  </div>

</div>
    </div>
  )
}

export default Cart
