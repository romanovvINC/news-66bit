import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMainStore, ISiteTheme} from "./main-interface";
import {getNews, getTheme, getThemes} from "./main-actions";
import {storage} from "../../model/storage";

const initialTheme: ISiteTheme = {
  id: 4,
  name: 'default',
  secondColor: 'rgb(255, 255, 255)',
  title: 'Стандартная тема',
  textColor: 'rgb(20, 20, 20)',
  mainColor: 'rgb(200, 200, 200)'
}

const initialState: IMainStore = {
  isNewsLoading: false,
  isThemeLoading: false,
  isThemesLoading: false,
  error: '',
  theme: storage.getItem('theme') || initialTheme,
  themes: [],
  news: storage.getItem('news') || [],
  fetchPage: 1
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    clearNews: (state) => {
      storage.setItem('news', []);
      state.news = [];
    },
    increaseFetchPage: (state) => {
      state.fetchPage += 1;
    },
    clearFetchPage: (state) => {
      state.fetchPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTheme.pending, (state) => {
      state.isThemeLoading = true;
    }).addCase(getTheme.fulfilled, (state, {payload}) => {
      storage.setItem('theme', payload);
      state.isThemeLoading = false;
      state.theme = payload;
    }).addCase(getTheme.rejected, (state) => {
      state.isThemeLoading = false;
      state.error = "НЕ УДАЛОСЬ ЗАГРУЗИТЬ ТЕМУ";
    }).addCase(getNews.pending, (state) => {
      state.isNewsLoading = true;
    }).addCase(getNews.fulfilled, (state, {payload}) => {
      state.isNewsLoading = false;
      state.news = [...state.news, ...payload];
      storage.setItem('news', state.news);
    }).addCase(getNews.rejected, (state) => {
      state.isNewsLoading = false;
      state.error = "НЕ УДАЛОСЬ ЗАГРУЗИТЬ НОВОСТИ";
    }).addCase(getThemes.pending, (state) => {
      state.isThemesLoading = true;
    }).addCase(getThemes.fulfilled, (state, {payload}) => {
      state.isThemesLoading = false;
      state.themes = payload;
    }).addCase(getThemes.rejected, (state) => {
      state.isThemesLoading = false;
      state.error = "НЕ УДАЛОСЬ ЗАГРУЗИТЬ ТЕМЫ";
    });
  }
});

export default mainSlice.reducer;

export const {clearNews, increaseFetchPage, clearFetchPage} = mainSlice.actions;