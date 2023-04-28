import React from 'react';
import styles from './theme-button.module.scss';
import {useTypedSelector} from "../../store/store";
import {ISiteTheme} from "../../store/main/main-interface";
import {store} from "../../index";
import {getTheme} from "../../store/main/main-actions";
import {themesNames} from "../../constants/server-const";

interface IThemeButton {
  theme: ISiteTheme
}

const ThemeButton = (props: IThemeButton) => {
  const {theme} = props;
  const changeThemeHandler = () => {
    store.dispatch(getTheme(theme.name));
  }

  return (
    <button onClick={changeThemeHandler}className={styles.themeButton} style={{
      color: theme.textColor,
      backgroundColor: theme.mainColor,
      border: `6px solid ${theme.textColor}`
    }}>{theme.title}</button>
  );
}

export default ThemeButton;
