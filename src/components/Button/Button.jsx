import React from "react"
import styles from "./Button.module.css"

const Button = ({ text, clickHandler }) => (
<button type="button" className={styles.button} onClick={clickHandler}>{text}

</button>
)

export default Button;

