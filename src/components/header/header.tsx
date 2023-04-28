import React from 'react';
import styles from './header.module.scss';
import {useTypedSelector} from "../../store/store";
import {useLocation} from "react-router-dom";
import {store} from "../../index";
import {getNews} from "../../store/main/main-actions";
import {storage} from "../../model/storage";
import {refreshNews} from "../../store/main/main-slice";
const refreshSvg = require('../../assets/img/refresh.png');

const Header = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  let route = useLocation().pathname;
  const isLoading = useTypedSelector((state) => state.mainSlice.isNewsLoading);

  const onRefreshhandle = () => {
    store.dispatch(refreshNews(true));
  }

  let title = '';
  return (
    <header className={styles.header} style={
      {
        backgroundColor: theme.secondColor
      }
    }>
      <div className={styles.itemsContainer}>
        <h1 className={styles.headerTitle} style={{color: theme.textColor}}>
          {route === '/' ? 'Новости' : 'Темы'}
        </h1>
        {route === '/' && <button disabled={isLoading} onClick={onRefreshhandle} className={styles.iconButton}><img src={refreshSvg} alt='refresh-icon' /></button>}
      </div>
    </header>
  );
}

export default Header;
