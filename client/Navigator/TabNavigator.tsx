import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from '../screens/Style';
import HomeScreen from '../screens/HomeScreen'
import LogoutScreen from '../screens/AuthenticationScreens/LogoutScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabNavigator() {

  type TabStackParamList = {
    Home: undefined,
    Logout: undefined,
  }

  const Tab = createMaterialBottomTabNavigator<TabStackParamList>()
  return (

    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: Colors.primary.pink, paddingBottom: 10 }}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Logout" component={LogoutScreen}
          options={{
            tabBarLabel: 'Déconnexion',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='logout' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}