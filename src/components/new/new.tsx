import React, {useMemo} from 'react';
import styles from './new.module.scss';
import {useTypedSelector} from "../../store/store";
import {INew, ISiteTheme} from "../../store/main/main-interface";

interface INewComponent {
  theme: ISiteTheme,
  singleNew: INew,
}

const NewComponent = React.memo((props: INewComponent) => {
  const {theme, singleNew} = props;
  return (
    <div className={styles.newComponent} style={{
      backgroundColor: theme.mainColor,
      border: `3px solid ${theme.textColor}`
    }}>
      <h1 style={{
        backgroundColor: theme.textColor,
        color: theme.mainColor
      }}>
        {singleNew.title}
      </h1>
      <p style={{
        color: theme.textColor
      }}>
        {singleNew.content}
      </p>
    </div>
  );
});

export default NewComponent;
