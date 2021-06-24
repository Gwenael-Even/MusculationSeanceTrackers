import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen'
import CreateAccountScreen from '../screens/AuthenticationScreens/CreateAccountScreen'

export default function AuthNavigator() {

  type AuthStackParamList = {
    Login: undefined,
    CreateAccount: undefined
  }

  const Stack = createStackNavigator<AuthStackParamList>()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}