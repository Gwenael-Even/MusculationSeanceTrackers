import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from '../../features/User/UserSlice';
import { useForm } from 'react-hook-form';


export interface SignUpData {
  firstName: string,
  lastName: string,
  emailAddress: string,
  phoneNumber: string,
  password: string,
  passwordConfirmation: string
  height: number,
  weight: number
}

const CreateAccountScreen: React.FC = () => {

  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm()
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)

  const onSubmit = (data:any) => {
    dispatch(signupUser(data))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState())
    }

    if (isError) {
      dispatch(clearState())
    }
  }, [isSuccess, isError])

  const [signUpData, setSignupData] = useState({
    lastName: '',
    firstName: '',
    emailAddress: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
    height: 0,
    weight: 0,
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Créer votre compte :</Text>
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, lastName: text})}
        value={signUpData.lastName} placeholder={'Votre nom'} />
      
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, lastName: text})}
        value={signUpData.lastName} placeholder={'Votre prénom'} />
      
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, emailAddress: text})}
        value={signUpData.emailAddress} placeholder={'Votre adresse email'} keyboardType='email-address' />
      
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, phoneNumber: text})}
        value={signUpData.phoneNumber} placeholder={'Votre numéro de téléphone'} keyboardType='phone-pad' maxLength={12} />
      
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, password: text})}
        value={signUpData.password} placeholder={'Votre mot de passe'} secureTextEntry={true} />

            
      <TextInput style={styles.input} onChangeText={(text) => setSignupData({ ...signUpData, passwordConfirmation: text})}
        value={signUpData.password} placeholder={'Confirmez votre mot de passe'} secureTextEntry={true} />

    <Button title="Log In" onPress={handleSubmit(onSubmit)} />

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

export default CreateAccountScreen;