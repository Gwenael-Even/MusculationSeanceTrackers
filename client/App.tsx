import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import store from './store';
import { Provider } from 'react-redux';
import { AuthLoadingScreen } from './screens/Loading/AuthLoadingScreen'
import FlashMessage from 'react-native-flash-message';

export default function App() {

  return (
    <Provider store={store}>
      <AuthLoadingScreen />
      <FlashMessage />
    </Provider>
  )
}
