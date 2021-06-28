import React from 'react'
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen'
import CreateAccountScreen from '../screens/AuthenticationScreens/CreateAccountScreen'
import CustomAppBar from '../components/AppBar/CustomAppBar';

export default function AuthNavigator({ theme }: {theme: Theme}) {
  

  type AuthStackParamList = {
    Connexion: undefined,
    CreateAccount: undefined
  }

  const Stack = createStackNavigator<AuthStackParamList>()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion"
        screenOptions={{
          header: (props) => <CustomAppBar {...props} />,
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            alignSelf: 'center',
          }
         }}
      >
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}