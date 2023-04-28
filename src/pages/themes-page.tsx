import React, {useEffect} from 'react';
import NewComponent from "../components/new/new";
import {useTypedSelector} from "../store/store";
import ThemeButton from "../components/theme-button/theme-button";
import {getThemes} from "../store/main/main-actions";
import {store} from "../index";
import LoaderModal from "../components/loader-modal/loader-modal";
import {clearNews} from "../store/main/main-slice";

const ThemesPage = () => {
  const themes = useTypedSelector(state => state.mainSlice.themes);
  const theme = useTypedSelector(state => state.mainSlice.theme);
  const isLoading = useTypedSelector(state => state.mainSlice.isThemesLoading);

  document.body.style.backgroundColor = theme.mainColor;

  useEffect(() => {
    store.dispatch(clearNews());
    store.dispatch(getThemes());
  }, []);
  console.log(themes);

  return (
    <main className="mainContainer">
      {isLoading && <LoaderModal />}
      {themes.map(theme => <ThemeButton theme={theme} />)}
    </main>
  );
}

export default ThemesPage;
