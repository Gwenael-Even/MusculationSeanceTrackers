import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AuthenticationScreens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import CreateAccountScreen from '../screens/AuthenticationScreens/CreateAccountScreen'
import LogoutScreen from '../screens/AuthenticationScreens/LogoutScreen'

export default function TabNavigator() {

  const Tab = createBottomTabNavigator()
  return (

    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Tab.Screen name="Logout" component={LogoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}