import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosPublic} from "../../api/interceptors";
import {themes, themesNames} from "../../constants/server-const";
import {INew, ISiteTheme} from "./main-interface";

export const getTheme = createAsyncThunk<ISiteTheme, string>(
  'get theme',
  async (themeName, thunkApi) => {
    try {
      const response = await axiosPublic.get<ISiteTheme>(`theme/get?name=${themeName}`)
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getThemes = createAsyncThunk<ISiteTheme[]>(
  'get themes',
  async (_, thunkApi) => {
    try {
      const responses = await Promise.all(themes.map(theme => axiosPublic.get<ISiteTheme>(`theme/get?name=${theme}`)));
      const res: ISiteTheme[] = responses.map(response => response.data);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getNews = createAsyncThunk<INew[], {count: number, page: number}>(
  'get news',
  async ({count, page}, thunkApi) => {
    try {
      const response = await axiosPublic.get<INew[]>(`news/get?page=${page}&count=${count}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);