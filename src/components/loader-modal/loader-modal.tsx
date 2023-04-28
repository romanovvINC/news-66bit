import React from 'react';
import styles from './loader-modal.module.scss';
import {useTypedSelector} from "../../store/store";
import {useLocation} from "react-router-dom";

const LoaderModal = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  let route = useLocation().pathname;
  let title = '';
  return (
    <div className={styles.loaderRelative}>
      <div className={styles.loaderContainer}>
      </div>
      <span className={styles.loader}></span>
    </div>
  );
}

export default LoaderModal;
