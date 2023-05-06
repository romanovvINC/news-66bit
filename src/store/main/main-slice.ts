import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMainStore, ISiteTheme} from "./main-interface";
import {getNews, getTheme, getThemes} from "./main-actions";
import {storage} from "../../model/storage";
import {reactTostify} from "../../helpers/toastify";
import {newsMocks} from "../../mocks/news-mocks";
import {themesMocks} from "../../mocks/themes-mocks";

const initialTheme: ISiteTheme = {
  id: 4,
  name: 'default',
  secondColor: 'rgb(220, 220, 220)',
  title: 'Стандартная тема',
  textColor: 'rgb(20, 20, 20)',
  mainColor: 'rgb(160, 160, 160)'
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
    },
    loadMockData: (state) => {
      storage.setItem('news', []);
      storage.setItem('themes', []);
      state.news = newsMocks;
      state.themes = themesMocks;
    },
    setTheme: (state, action: PayloadAction<ISiteTheme>) => {
      storage.setItem('theme', action.payload);
      state.theme = action.payload;
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
      let error = "Не удалость загрузить тему. Попробуйте обновить страницу";
      state.error = error;
      reactTostify(error);
    }).addCase(getNews.pending, (state) => {
      state.isNewsLoading = true;
    }).addCase(getNews.fulfilled, (state, {payload}) => {
      state.isNewsLoading = false;
      state.news = [...state.news, ...payload];
      storage.setItem('news', state.news);
    }).addCase(getNews.rejected, (state) => {
      state.isNewsLoading = false;
      let error = "Не удалось загрузить новости. Попробуйте обновить страницу";
      state.error = error;
      reactTostify(error);
    }).addCase(getThemes.pending, (state) => {
      state.isThemesLoading = true;
    }).addCase(getThemes.fulfilled, (state, {payload}) => {
      state.isThemesLoading = false;
      state.themes = payload;
    }).addCase(getThemes.rejected, (state) => {
      state.isThemesLoading = false;
      let error = "Не удалось загрузить темы. Попробуйте обновить страницу"
      state.error = error;
      reactTostify(error);
    });
  }
});

export default mainSlice.reducer;

export const {clearNews, increaseFetchPage, clearFetchPage, loadMockData, setTheme} = mainSlice.actions;