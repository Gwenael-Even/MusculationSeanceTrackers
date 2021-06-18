import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native';
import LoginScreen from './screens/AuthenticationScreens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import CreateAccountScreen from './screens/AuthenticationScreens/CreateAccountScreen'
import Icons from 'react-native-ionicons';
import axios from 'axios';
import { API_URL } from "@env"

const Tab = createBottomTabNavigator()

axios.defaults.baseURL = 'http://192.168.1.22:4000'

console.log('API_URL :', API_URL)



export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
        
                    if (route.name === 'Home') {
                      iconName = focused ? 'ios-add' : 'ios-add';
                    } else if (route.name === 'Login') {
                      iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
        
                    // You can return any component that you like here!
                    return <Icons name={iconName} size={size} color={color} />;
                  },
                })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
       }}
      >
          <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="CreateAccount" component={CreateAccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  )
}
