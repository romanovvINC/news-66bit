import React, {useEffect} from 'react';
import {getNews} from "../store/main/main-actions";
import {clearFetchPage, clearNews, increaseFetchPage} from '../store/main/main-slice';
import {store} from "../index";
import {useTypedSelector} from "../store/store";
import NewComponent from "../components/new/new";
import LoaderModal from "../components/loader-modal/loader-modal";
import {newsCount} from "../constants/server-const";
import RefreshButton from "../components/refresh-button/refresh-button";
import {storage} from "../model/storage";
const PullToRefresh = require('pulltorefreshjs');

const NewsPage = () => {
  const theme = useTypedSelector((state) => state.mainSlice.theme);
  const news = useTypedSelector((state) => state.mainSlice.news);
  const isLoading = useTypedSelector((state) => state.mainSlice.isNewsLoading);
  const page = useTypedSelector((state) => state.mainSlice.fetchPage);

  document.body.style.backgroundColor = theme.mainColor;

  useEffect(() => {
    PullToRefresh.init({
      mainElement: 'main',
      onRefresh() {
        refreshHandler();
      }
    });
    if (storage.getItem('news')?.length === 0) {
      store.dispatch(getNews({count: newsCount, page: 1}));
    }
    document.addEventListener('scroll', scrollHandler);
    return function() {
      PullToRefresh.destroyAll();
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  const refreshHandler = () => {
    store.dispatch(clearNews());
    store.dispatch(clearFetchPage());
    store.dispatch(getNews({count: newsCount, page: 1}));
  }

  const scrollHandler = ():void => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 10) {
      store.dispatch(increaseFetchPage());
      store.dispatch(getNews({count: newsCount, page: page + 1}));
    }
  }
  return (
    <main className="mainContainer">
      <div className='refreshButtonContainer'>
        <RefreshButton onClick={refreshHandler} />
      </div>
      {isLoading && <LoaderModal />}
      {news.map((newInArr, key) => <NewComponent singleNew={newInArr} theme={theme}/>)}
    </main>
  );
};

export default NewsPage;
