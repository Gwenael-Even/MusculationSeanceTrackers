import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { Themes } from '../../screens/Style';

interface ThemeState {
  isThemeDark: boolean,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string,
  theme: Theme
}

const initialState = {
  isThemeDark: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  theme: Themes.lightTheme,
  errorMessage: ''
} as ThemeState

export const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false
      state.isThemeDark = false
      state.errorMessage = ''
    },
    switchTheme: (state) => {
      state.isThemeDark = !state.isThemeDark
      state.theme = state.isThemeDark ? Themes.darkTheme : Themes.lightTheme
    },
  }
})

export const { clearState, switchTheme } = themeSlice.actions
export const themeSelector = (state: any) => state.theme