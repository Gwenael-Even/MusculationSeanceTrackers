import React, { useState, useEffect  } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { loginUser, userSelector, clearState, logout } from '../../features/User/UserSlice'


const LogoutScreen = ({navigation}: {navigation:any}) => {

  const { isLogged } = useSelector(userSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.navigate('AuthLoadingScreen')
    dispatch(logout());
  });

  return (
    <>
    </>
  )
}

export default LogoutScreen 