import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Title } from 'react-native-paper';
import { userSelector } from '../../features/User/UserSlice'
import { themeSelector, switchTheme } from '../../features/Theme/ThemeSlice';
import TabNavigator from '../../Navigator/TabNavigator';
import AuthNavigator from '../../Navigator/AuthNavigator';
import { Colors, Typography } from '../Style';
import { useSelector, useDispatch } from 'react-redux'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Button,
  ActivityIndicator,
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge'

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme)
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)

export const AuthLoadingScreen = () => {
  const { isLogged, isFetching } = useSelector(userSelector)
  const [fontsLoaded] = Typography.useFonts(Typography.useFontsArg);
  const { isThemeDark } = useSelector(themeSelector)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    dispatch(switchTheme())
  }

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme

  let whatToLoad

  if (isFetching || !fontsLoaded) {
    whatToLoad = <View style={styles.container}>
      <ActivityIndicator animating={true} size={'large'} color={Colors.primary.pink} />
      <Title style={styles.title}>Chargement ...</Title>
      <Button onPress={toggleTheme}>
        Switch Theme
        </Button>

    </View>
  }

  else if (isLogged) {
    whatToLoad = <TabNavigator />
  } else {
    whatToLoad = <AuthNavigator />
  }

  return (
    <PaperProvider theme={theme}>
      { whatToLoad }
    </PaperProvider>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    marginTop: 50,
    alignSelf: 'center',
    fontFamily: Typography.fonts.GothicA1_400Regular
  }
})
