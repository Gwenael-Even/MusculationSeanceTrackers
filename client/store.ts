import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './features/User/UserSlice'
import { themeSlice } from './features/Theme/ThemeSlice'

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer
  }
})