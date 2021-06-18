import axios, { AxiosInstance } from 'axios'
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { FormHelper } from '../../Helper/forms/FormHelper'

export interface SignInData {
  emailAddress: string,
  password: string
}

const LoginScreen: React.FC = () => {

  const [signInData, setSignInData] = useState({
    emailAddress: '',
    password: '',
  })

  const { onChangeText, onSubmit, values } = FormHelper(
    LogUserCallback,
    signInData
  )

  async function LogUserCallback() {
    const { emailAddress, password } = signInData

    //TODO : Verification check

    axios.post('/user/login', { email: emailAddress, password: password})
    .then((response) => {
      console.log('reponse :', response)
    })
      .catch((error) => {
        console.log('error request :', error.request)
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login : </Text>
      <TextInput style={styles.input} onChangeText={(text) => setSignInData({ ...signInData, emailAddress: text})}
        value={signInData.emailAddress} placeholder={'Votre adresse email'} keyboardType='email-address' />
      
      <TextInput style={styles.input} onChangeText={(text) => setSignInData({ ...signInData, password: text})}
        value={signInData.password} placeholder={'Votre mot de passe'} secureTextEntry={true} />

      <Button title="Log In" onPress={LogUserCallback}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width:150,
    margin: 12,
    borderWidth: 1,
  },
});

export default LoginScreen;