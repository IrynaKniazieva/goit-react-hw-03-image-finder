import React from "react"
import styles from "./Button.module.css"
import PropTypes from "prop-types"

const Button = ({ text, clickHandler }) => (
<button type="button" className={styles.button} onClick={clickHandler}>{text}

</button>
)

Button.propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,  
  };

export default Button;

