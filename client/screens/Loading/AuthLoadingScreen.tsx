import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Text
} from 'react-native';
import { userSelector } from '../../features/User/UserSlice'
import { useSelector } from 'react-redux'
import TabNavigator from '../../Navigator/TabNavigator';
import AuthNavigator from '../../Navigator/AuthNavigator';

export const AuthLoadingScreen = () => {
  const { isLogged, isFetching } = useSelector(userSelector)


  if (isLogged) {
    return <TabNavigator />
  } else {
    return <AuthNavigator />
  }

};
