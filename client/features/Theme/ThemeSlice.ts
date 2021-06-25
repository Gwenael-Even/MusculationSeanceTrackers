import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isThemeDark: boolean,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string
}

const initialState = {
  isThemeDark: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
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
    }
  }
})

export const { clearState, switchTheme } = themeSlice.actions
export const themeSelector = (state: any) => state.theme