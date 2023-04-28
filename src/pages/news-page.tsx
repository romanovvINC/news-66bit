import React, {useEffect, useState} from 'react';
import {getNews, getTheme} from "../store/main/main-actions";
import {themesNames} from "../constants/server-const";
import reducer, {clearNews, refreshNews} from '../store/main/main-slice';
import {store} from "../index";
import {useTypedSelector} from "../store/store";
import NewComponent from "../components/new/new";
import LoaderModal from "../components/loader-modal/loader-modal";

const NewsPage = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  const news = useTypedSelector((state) => state.mainSlice.news);
  const newsCount = useTypedSelector((state) => state.mainSlice.newsCount);
  const isLoading = useTypedSelector((state) => state.mainSlice.isNewsLoading);
  const isRefreshing = useTypedSelector((state) => state.mainSlice.isRefreshing);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isFetching, setIsFetching] = useState(true);

  document.body.style.backgroundColor = theme.mainColor;

  useEffect(() => {
    console.log(newsCount < 20 && isFetching);
    if (isFetching && newsCount < 20) {
      setCurrentPage(currentPage + 1);
      store.dispatch(getNews({count: 10, page: currentPage}));
      setIsFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isRefreshing) {
      store.dispatch(clearNews());
      store.dispatch(getNews({count: 10, page: 1}));
      setCurrentPage(1);
      setIsFetching(false);
      store.dispatch(refreshNews(false));
    }
  }, [isRefreshing])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function() {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [])


  const scrollHandler = ():void => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) {
      console.log("scroll");
      setIsFetching(true);
    }

    if (document.documentElement.scrollTop === 0) {
      store.dispatch(refreshNews(true));
    }
  }

  return (
    <main className="mainContainer">
      {isLoading && <LoaderModal />}
      {news.map(newInArr => <NewComponent singleNew={newInArr} theme={theme}/>)}
    </main>
  );
}

export default NewsPage;
