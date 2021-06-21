import React from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector } from 'react-redux'
import {userSelector } from '../features/User/UserSlice'



const HomeScreen: React.FC = ({ navigation }) => {
  const { email } = useSelector(userSelector)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Bonjour, votre adresse email est {email}</Text>
      <Button title="Log out" onPress={() => navigation.navigate('Login')}></Button>
    </View>
  )
}

export default HomeScreen;