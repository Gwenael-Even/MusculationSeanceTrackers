import * as Colors from './colors'
import * as Typography from './typography'
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import merge from 'deepmerge'
import { Theme } from 'react-native-paper/lib/typescript/types';

const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme)
const CombinedLightTheme = merge(PaperDefaultTheme, NavigationDefaultTheme)


console.log('bg :', Colors.darkColors.background)
console.log('bg lgiht :', Colors.lightColors.background)
export const darkTheme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: Colors.darkColors.primary,
    text: Colors.darkColors.text,
    background: Colors.darkColors.background,
    accent: Colors.darkColors.primary
  },
  fonts: configureFonts(Typography.fontConfig)
} as Theme

export const lightTheme = {
  ...CombinedLightTheme,
  colors: {
    ...CombinedLightTheme.colors,
    primary: Colors.lightColors.primary,
    background: Colors.lightColors.background,
    text: Colors.lightColors.text,
    accent: Colors.darkColors.primary
  },
  fonts: configureFonts(Typography.fontConfig)
} as Theme