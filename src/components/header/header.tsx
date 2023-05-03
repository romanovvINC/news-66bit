import React, {useEffect} from 'react';
import styles from './header.module.scss';
import {useTypedSelector} from "../../store/store";
import {useLocation} from "react-router-dom";
import RefreshButton from "../refresh-button/refresh-button";
import {reactTostify} from "../../helpers/toastify";

const Header = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  const newsCount = useTypedSelector((state) => state.mainSlice.news.length);

  let route = useLocation().pathname;

  return (
    <header className={styles.header} style={
      {
        backgroundColor: theme.secondColor
      }
    }>
      <h1 className={styles.headerTitle} style={{color: theme.textColor}}>
        {route === '/' ? `Новости (${newsCount})` : 'Темы'}
      </h1>
    </header>
  );
}

export default Header;
