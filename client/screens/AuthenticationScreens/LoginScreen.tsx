import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useForm, Controller } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector, clearState } from '../../features/User/UserSlice'
import { TextInput, Title } from 'react-native-paper'
import { showMessage } from "react-native-flash-message";
import { themeSelector } from '../../features/Theme/ThemeSlice';
import { Colors } from '../Style/index'

export interface SignInData {
  email: string,
  password: string
}

const LoginScreen: React.FC = ({ navigation }:any) => {

  const dispatch = useDispatch()
  const { handleSubmit, control, formState: { errors } } = useForm()
  const { isFetching, isError, errorMessage } = useSelector(userSelector)
  const [passwordShow, setPasswordShow] = useState(true)
  const [passwordIcon, setPasswordIcon] = useState("eye-off")
  const { theme } = useSelector(themeSelector)


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
      <Title>Musculation Seance Tracker</Title>

      <Controller control={control} render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          keyboardType='email-address'
          selectionColor={theme.colors.primary}
          underlineColor={theme.colors.primary}
          value={value}
          label="email"
          left={<TextInput.Icon color={theme.colors.primary} name="email" />}
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
          selectionColor={theme.colors.primary}
          underlineColor={theme.colors.primary}
          secureTextEntry={passwordShow}
          label="Password"
          left={<TextInput.Icon color={theme.colors.primary} name="lock-open" />}
          right={<TextInput.Icon color={theme.colors.primary} name={passwordIcon} onPress={changeIcon} />
    
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
    color: Colors.darkColors.text,
  },
  link: {
    color: Colors.darkColors.primary,
    alignSelf: 'center',

  },
  input: {
    marginBottom: 20,
    color: Colors.darkColors.text,
  },
  button: {
    width: 300,
    height: 37,
    color: Colors.darkColors.text,
    backgroundColor: Colors.darkColors.primary,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: Colors.darkColors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textButton: {
    color: Colors.darkColors.text,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  }
});

export default LoginScreen;