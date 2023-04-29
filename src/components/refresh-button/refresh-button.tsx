import React from 'react';
import styles from './refresh-button.module.scss';
import {useTypedSelector} from "../../store/store";
const refreshSvg = require('../../assets/img/refresh.png');

interface IRefreshButton {
  onClick: () => void
}

const RefreshButton = (onClickHandler: IRefreshButton) => {
  const isLoading = useTypedSelector((state) => state.mainSlice.isNewsLoading);

  return (
    <button
      disabled={isLoading}
      onClick={onClickHandler.onClick}
      className={styles.refreshButton}>
      <img src={refreshSvg} id="refreshButton" alt='refresh-icon' />
    </button>
  );
}

export default RefreshButton;
