export interface IMainStore {
  isNewsLoading: boolean;
  isThemeLoading: boolean;
  isThemesLoading: boolean;
  error: string;
  theme: ISiteTheme,
  themes: ISiteTheme[],
  news: INew[],
  newsCount: number,
  isRefreshing: boolean
}

export interface ISiteTheme {
  id: number,
  name: string,
  mainColor: string,
  secondColor: string,
  title: string,
  textColor: string;
}

export interface INew {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string
}