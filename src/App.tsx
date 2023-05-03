import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NewsPage from "./pages/news-page";
import ThemesPage from "./pages/themes-page";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import {store} from "./index";
import {getTheme} from "./store/main/main-actions";
import {themesNames} from "./constants/server-const";
import {storage} from "./model/storage";
import {ToastContainer} from "react-toastify";
import {reactTostify} from "./helpers/toastify";

function App() {
  useEffect(() => {
    if (!storage.getItem('theme')) {
      store.dispatch(getTheme(themesNames.lightTheme));
    }
  }, []);
  return (
    <div className="App">
        <BrowserRouter>
          <Header />
          <ToastContainer />
          <Routes>
            <Route path={'/themes'} element={<ThemesPage />} />
            <Route path={'/'} element={<NewsPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
  </div>
  );
};

export default App;
