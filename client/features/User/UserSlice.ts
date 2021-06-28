import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = API_URL

export const signupUser = createAsyncThunk(
  'users/register',
  async ({ name, email, password }: { name: string, email: string, password: string }, thunkAPI) => {
    try {
      axios.post(
        '/user/register', { email: email, password: password })
        .then(response => {
          if (response.status === 200) {
            AsyncStorage.setItem('accessToken', response.data.accessToken)
            return { ...response.data, name: name, email: email }
          } else {
            return thunkAPI.rejectWithValue(response.data)
          }
        })
    } catch (e: any) {
      console.log('Error :', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  })


export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }: { email: string, password: string }, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', { email, password })
      console.log('response :', response)
      if (response.status === 200) {
        AsyncStorage.setItem('accessToken', response.data.accessToken)
        return { ...response.data, email: email }
      } else {
        console.log('response :', response)
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (e: any) {
      console.log('Error :', e)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  })

export const fetchUserByToken = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }: { token: string }, thunkAPI) => {
    try {
      const response = await axios.post('/user/getUserInfo', { token })
      if (response.status === 200) {
        console.log('response data login:', response.data)
        return response.data
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (e: any) {
      console.log('Error :', e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

interface UsersState {
  name: string,
  email: string,
  accessToken: string,
  isFetching: boolean,
  isSuccess: boolean,
  isError: boolean,
  isLogged: boolean,
  errorMessage: string,
  successMessage: string
}

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  isLogged: false,
  errorMessage: '',
  successMessage: '',
} as UsersState

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearState: (state: UsersState) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false
      state.errorMessage = ''

      return state
    },
    logout: (state: UsersState) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false
      state.isLogged = false
      state.email = ''
      state.accessToken = ''
      state.name = ''
      state.successMessage = 'Déconnexion correctement effectué'
      AsyncStorage.removeItem('accessToken')
      return state

    }
  },
  extraReducers: (builder) => {

    // REGISTER
    builder.addCase(signupUser.fulfilled, (state: UsersState, { payload }: { payload: any}) => {
      state.isFetching = false
      state.isSuccess = true
      state.name = payload.name
      state.email = payload.email
    }),
      builder.addCase(signupUser.pending, (state: UsersState, { payload }: { payload: any }) => {
        state.isFetching = true
      }),
      builder.addCase(signupUser.rejected, (state: UsersState, { payload }: { payload: any }) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = payload.message
      }),

      // LOGIN
      builder.addCase(loginUser.fulfilled, (state: UsersState, { payload }: { payload: any }) => {
        state.isFetching = false
        state.isSuccess = true
        state.isLogged = true
        state.email = payload.email
        state.accessToken = payload.accessToken
      }),
      builder.addCase(loginUser.pending, (state: UsersState, { payload }: { payload: any }) => {
        state.isFetching = true
      }),
      builder.addCase(loginUser.rejected, (state: UsersState, { payload }: { payload: any}) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = payload.message
      }),

      builder.addCase(fetchUserByToken.fulfilled, (state: UsersState, { payload }: { payload: any }) => {

        state.isFetching = false
        state.isSuccess = true

        state.email = payload.email
        state.name = payload.name
      }),

      builder.addCase(fetchUserByToken.pending, (state: UsersState, { payload }) => {
        state.isFetching = true
      }),

      builder.addCase(fetchUserByToken.rejected, (state: UsersState, { payload }) => {
        state.isFetching = false
        state.isError = true
      })
  },
})

export const { clearState, logout } = userSlice.actions
export const userSelector = (state: UsersState) => state.user
