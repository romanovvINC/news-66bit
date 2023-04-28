import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainSlice from "./main/main-slice";
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
  mainSlice
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector