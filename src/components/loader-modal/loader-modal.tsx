import React from 'react';
import styles from './loader-modal.module.scss';
import {useTypedSelector} from "../../store/store";
import {useLocation} from "react-router-dom";

const LoaderModal = () => {
  return (
    <div className={styles.loaderRelative}>
      <div className={styles.loaderContainer}>
      </div>
      <span className={styles.loader} />
    </div>
  );
}

export default LoaderModal;
