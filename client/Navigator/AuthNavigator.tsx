import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen'
import CreateAccountScreen from '../screens/AuthenticationScreens/CreateAccountScreen'
import { createStackNavigator } from '@react-navigation/stack';

export default function AuthNavigator() {

  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}