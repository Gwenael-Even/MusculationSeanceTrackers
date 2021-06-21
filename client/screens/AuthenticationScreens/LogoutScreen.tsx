import React, { useState, useEffect  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from "../../Services/Authentication/AuthService"

export const LogOut = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem('accessToken').then(res => {
      console.log('res :', res)
      if (res !== null) {
        resolve(true)
      } else {
        resolve(false)
      }
    }).catch(err => reject(err))
  })
}

const LogoutScreen: React.FC = () => {

  const [isLogged, setIsLogged] = useState(false)
   
  useEffect(() => {
    LogOut().then(res => setIsLogged(false)).catch(err => console.log('err dans le navigation screen :', err))
  }, [])

  return (
    <>
    </>
  )
}

export default LogoutScreen 