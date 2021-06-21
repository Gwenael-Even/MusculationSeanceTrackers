import React, { useState, useEffect  } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'

export interface SignInData {
  emailAddress: string,
  password: string
}

const LoginScreen: React.FC = (navigation) => {

  const dispatch = useDispatch()
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>()
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(userSelector)
  
  const onSubmit = (data: any) => {
    dispatch(loginUser({email: data.email.toLowerCase(), password: data.password}))
  }


  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isError, isSuccess]);


  const [signInData, setSignInData] = useState({
    emailAddress: '',
    password: '',
  })


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login : </Text>
      <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
        <TextInput style={styles.input} onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder={'Votre adresse email'}
          keyboardType='email-address' />
      )}
        name="email"
        rules={{ required: true }}
      />
      {errors.email && <Text>Email requis.</Text>}

      <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder={'Votre mot de passe'}
          secureTextEntry={true}
        />
      )}
        name="password"
        rules={{ required: true }}
      />
      {errors.email && <Text>Mot de passe requis.</Text>}

      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
  },
});

export default LoginScreen;