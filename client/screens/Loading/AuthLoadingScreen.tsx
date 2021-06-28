import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Title } from 'react-native-paper';
import { userSelector } from '../../features/User/UserSlice'
import { themeSelector } from '../../features/Theme/ThemeSlice';
import TabNavigator from '../../Navigator/TabNavigator';
import AuthNavigator from '../../Navigator/AuthNavigator';
import { Colors, Themes } from '../Style';
import { useSelector } from 'react-redux'
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from 'react-native-paper';


export const AuthLoadingScreen = () => {
  const { isLogged, isFetching } = useSelector(userSelector)
  const { theme } = useSelector(themeSelector)


  let whatToLoad

  if (isFetching) {
    whatToLoad =
      <View style={{ backgroundColor: theme.colors.background, flex:1, justifyContent: 'center' }}>
        <ActivityIndicator animating={true} size={'large'} color={theme.colors.accent} />
        <Title style={styles.title}>Chargement ...</Title>
      </View>
  }

  else if (isLogged) {
    whatToLoad = <TabNavigator theme={theme} />
  } else {
    whatToLoad = <AuthNavigator theme={theme} />
  }

  return (
    <PaperProvider theme={theme}>
      {whatToLoad}
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
  },
  button: {
    width: 300,
    height: 37,
    color: Colors.darkColors.text,
    backgroundColor: Colors.darkColors.pink,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: Colors.darkColors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {
    color: Colors.darkColors.text,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  }
})
