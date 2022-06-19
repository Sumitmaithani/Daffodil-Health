import React from 'react';
import wave from "../../images/wave.png";
import party from "../../images/party.svg";
import right from "../../images/right.png";
import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";

const Start = () => {
  return (
    <div className={styles.container}>
        <img className={styles.wave} src={wave} />
        <img className={styles.party} src={party} />
        <h1  className={styles.head}>Raj's profile has been created.</h1>
        <h5  className={styles.content}>Please help us with more information about Raj to make the best use of this app.</h5>
        <Link to="/">
        <img className={styles.right} src={right} />
        </Link>
    </div>
  )
}

export default Start