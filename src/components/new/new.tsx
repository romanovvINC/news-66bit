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
  console.log("upd");
  return (
    <div className={styles.newComponent} style={{
      backgroundColor: theme.secondColor,
      border: `3px solid ${theme.textColor}`
    }}>
      <h1 style={{color: theme.textColor}}>
        {singleNew.title}
      </h1>
      <hr style={{
        border: '0',
        borderTop: `3px solid ${theme.textColor}`
      }}/>
      <p style={{
        color: theme.textColor
      }}>
        {singleNew.content}
      </p>
    </div>
  );
});

export default NewComponent;
