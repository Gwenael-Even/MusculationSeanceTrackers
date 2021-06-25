import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen'
import CreateAccountScreen from '../screens/AuthenticationScreens/CreateAccountScreen'
import { Colors, Typography } from '../screens/Style';

export default function AuthNavigator() {
  

  type AuthStackParamList = {
    Connexion: undefined,
    CreateAccount: undefined
  }

  const Stack = createStackNavigator<AuthStackParamList>()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Connexion"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary.pink
          },
          headerTintColor: Colors.primary.text,
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: Typography.fonts.GothicA1_400Regular
          }
         }}
      >
        <Stack.Screen name="Connexion" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}