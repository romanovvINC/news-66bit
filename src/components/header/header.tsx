import React, {useEffect} from 'react';
import styles from './header.module.scss';
import {useTypedSelector} from "../../store/store";
import {useLocation} from "react-router-dom";
import RefreshButton from "../refresh-button/refresh-button";
import {reactTostify} from "../../helpers/toastify";
import {store} from "../../index";
import {loadMockData} from "../../store/main/main-slice";

const Header = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  const newsCount = useTypedSelector((state) => state.mainSlice.news.length);
  const loading1 = useTypedSelector((state) => state.mainSlice.isThemesLoading);
  const loading2 = useTypedSelector((state) => state.mainSlice.isNewsLoading);

  let route = useLocation().pathname;

  const mockHandler = () => {
    store.dispatch(loadMockData());
  }

  return (
    <header className={styles.header} style={
      {
        backgroundColor: theme.secondColor
      }
    }>
      <h1 className={styles.headerTitle} style={{color: theme.textColor}}>
        {route === '/' ? `Новости (${newsCount})` : 'Темы'}
      </h1>
      {newsCount === 0 && !loading1 && !loading2 ? <button onClick={mockHandler} className={styles.mockButton}>Загрузить моки</button> : ''}
    </header>
  );
}

export default Header;
