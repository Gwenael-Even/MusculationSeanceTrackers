import React from 'react'
import {
  useFonts,
  GothicA1_100Thin,
  GothicA1_200ExtraLight,
  GothicA1_300Light,
  GothicA1_400Regular,
  GothicA1_500Medium,
  GothicA1_600SemiBold,
  GothicA1_700Bold,
  GothicA1_800ExtraBold,
  GothicA1_900Black,
} from '@expo-google-fonts/gothic-a1';
import store from './store';
import { Provider } from 'react-redux';
import { AuthLoadingScreen } from './screens/Loading/AuthLoadingScreen'
import FlashMessage from 'react-native-flash-message';

export default function App() {

  let [fontsLoaded] = useFonts({
    GothicA1_100Thin,
    GothicA1_200ExtraLight,
    GothicA1_300Light,
    GothicA1_400Regular,
    GothicA1_500Medium,
    GothicA1_600SemiBold,
    GothicA1_700Bold,
    GothicA1_800ExtraBold,
    GothicA1_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthLoadingScreen />
      <FlashMessage />
    </Provider>
  )
}
