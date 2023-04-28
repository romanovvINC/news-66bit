import React from 'react';
import styles from './footer.module.scss';
import {useTypedSelector} from "../../store/store";
import {Link, useLocation} from "react-router-dom";

const Footer = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  const route = useLocation().pathname;

    return (
    <footer className={styles.footer} style={{backgroundColor: theme.secondColor}}>
      <div className={styles.buttonContainer}>
        <Link className={styles.footerButton} style={{color: theme.textColor}} to={'/'}>Новости</Link>
        <Link className={styles.footerButton} style={{color: theme.textColor}} to={'/themes'}>Темы</Link>
      </div>
    </footer>
  );
}

export default Footer;
