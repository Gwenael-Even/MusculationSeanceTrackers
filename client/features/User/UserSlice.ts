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
      console.log('response login :', response.data)
      if (response.status === 200) {
        AsyncStorage.setItem('accessToken', response.data.accessToken)
        return { ...response.data, email: email }
      } else {
        return thunkAPI.rejectWithValue(response.data)
      }
    } catch (e: any) {
      console.log('Error :', e.response.data)
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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    accessToken: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    isLogged: false,
    errorMessage: ''
  },
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false

      return state
    }
  },
  extraReducers: (builder) => {

    // REGISTER
    builder.addCase(signupUser.fulfilled, (state, { payload }: { payload: any }) => {

      state.isFetching = false
      state.isSuccess = true
      state.name = payload.users.name
      state.email = payload.users.email
    }),
      builder.addCase(signupUser.pending, (state, { payload }: { payload: any }) => {
        state.isFetching = true
      }),
      builder.addCase(signupUser.rejected, (state, { payload }: { payload: any }) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = payload.message
      }),

      // LOGIN
      builder.addCase(loginUser.fulfilled, (state, { payload }: { payload: any }) => {

        state.isFetching = false
        state.isSuccess = true
        state.isLogged = true
        state.email = payload.email
        state.accessToken = payload.accessToken
      }),
      builder.addCase(loginUser.pending, (state, { payload }: { payload: any }) => {
        state.isFetching = true
      }),
      builder.addCase(loginUser.rejected, (state, { payload }: { payload: any }) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = payload.message
      }),

      builder.addCase(fetchUserByToken.fulfilled, (state, { payload }: { payload: any }) => {
        console.log('state :', state)
        console.log('payload :', payload)

        state.isFetching = false
        state.isSuccess = true

        state.email = payload.email
        state.name = payload.name
      }),

      builder.addCase(fetchUserByToken.pending, (state, { payload }) => {
        state.isFetching = true
      }),

      builder.addCase(fetchUserByToken.rejected, (state, { payload }) => {
        console.log('state rejected :', state)
        state.isFetching = false
        state.isError = true
      })
  },
})

export const { clearState } = userSlice.actions
export const userSelector = (state: any) => state.user
