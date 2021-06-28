import React from 'react';
import { Appbar, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { themeSelector, switchTheme } from '../../features/Theme/ThemeSlice';

const CustomAppBar: React.FC = ({ navigation, previous }) => {
  const dispatch = useDispatch()
  const { isThemeDark, theme } = useSelector(themeSelector)
  const onToggleSwitch = () => {
    dispatch(switchTheme())
  }


  /*if (isThemeDark) {
    console.log('dark :', theme)
  } else {
    console.log('light :', theme)
  }*/

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.primary} }}>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Musculation Seance Tracker" />
      <Switch 
              color={theme.colors.background}
              value={isThemeDark} onValueChange={onToggleSwitch} />
    </Appbar.Header>
  );
}

export default CustomAppBar