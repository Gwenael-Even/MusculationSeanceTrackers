import React from 'react'
import { View, Text, Button } from 'react-native'

const HomeScreen: React.FC = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Log out" onPress={() => navigation.navigate('Login')}></Button>
    </View>
  )
}

export default HomeScreen;