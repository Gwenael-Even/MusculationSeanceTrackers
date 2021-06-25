import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'
import { Colors, Typography } from '../Style/'
import { TextInput } from 'react-native-paper'
import { showMessage } from "react-native-flash-message";

export interface SignInData {
  email: string,
  password: string
}

const LoginScreen: React.FC = ({ navigation }) => {

  const dispatch = useDispatch()
  const { handleSubmit, control, formState: { errors } } = useForm()
  const { isFetching, isError, errorMessage } = useSelector(userSelector)
  const [passwordShow, setPasswordShow] = useState(true)
  const [passwordIcon, setPasswordIcon] = useState("eye-off")

  const changeIcon = () => {
    setPasswordIcon(passwordIcon === 'eye' ? 'eye-off' : 'eye')
    setPasswordShow(!passwordShow)
  }

  const onSubmit = (data: SignInData) => {
    dispatch(loginUser({ email: data.email.toLowerCase(), password: data.password }))
  }

  const navigateToSignin = () => {
    navigation.navigate('CreateAccountScreen')
  }


  useEffect(() => {
    if (isError) {
      showMessage({
        floating: true,
        position:'bottom',
        message: "Connexion échouée : Email ou mot de passe invalide",
        type: "danger"
      })
    }
    dispatch(clearState())
    // TODO : interdire le screen if isLogged

  }, [isError]);

  return (
    <View style={styles.container}>
      <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          keyboardType='email-address'
          selectionColor={Colors.primary.text}
          underlineColor={Colors.primary.text}
          value={value}
          label="email"
          left={<TextInput.Icon color={Colors.primary.pink} name="email" />}
        />
      )}
        name="email"
        rules={{ required: true }}
      />

      <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          selectionColor={Colors.primary.text}
          underlineColor={Colors.primary.text}
          secureTextEntry={passwordShow}
          label="Password"
          left={<TextInput.Icon color={Colors.primary.pink} name="lock-open" />}
          right={<TextInput.Icon color={Colors.primary.pink} name={passwordIcon} onPress={changeIcon} />
    
          }
          />
      )}
        name="password"
        rules={{ required: true }}
      />

      <Text style={styles.link} onPress={navigateToSignin}>Mot de passe oublié</Text>

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textButton}>Connexion</Text>
        </Pressable>

      <Text style={styles.link} onPress={() => navigation.navigate('CreateAccount')}>Pas d'identifiant ? S'inscrire</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  text: {
    color: Colors.primary.text,
  },
  link: {
    color: Colors.primary.pink,
    alignSelf: 'center',

  },
  input: {
    marginBottom: 20,
    color: Colors.primary.text,
  },
  button: {
    width: 300,
    height: 37,
    color: Colors.primary.text,
    backgroundColor: Colors.primary.pink,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {
    color: Colors.primary.text,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  }
});

export default LoginScreen;