import {
  GothicA1_100Thin,
  GothicA1_200ExtraLight,
  GothicA1_300Light,
  GothicA1_400Regular,
  GothicA1_500Medium,
  GothicA1_600SemiBold,
  GothicA1_700Bold,
  GothicA1_800ExtraBold,
  GothicA1_900Black,
} from '@expo-google-fonts/gothic-a1';
import { TextStyle, Platform } from "react-native"

// Hack found on : https://github.com/expo/google-fonts/issues/6
export { useFonts } from 'expo-font'

type PropsToString<Obj> = {
  [K in keyof Obj]: string
}

export const useFontsArg = {
  GothicA1_100Thin,
  GothicA1_200ExtraLight,
  GothicA1_300Light,
  GothicA1_400Regular,
  GothicA1_500Medium,
  GothicA1_600SemiBold,
  GothicA1_700Bold,
  GothicA1_800ExtraBold,
  GothicA1_900Black,

}

export const fonts = { ...useFontsArg } as unknown as PropsToString<typeof useFontsArg>
Object.keys(fonts).forEach((e: any) => (fonts as any)[e] = e )

type FontSize = "x10" | "x20" | "x30" | "x40" | "x50" | "x60" | "x70"
export const fontSize: Record<FontSize, TextStyle> = {
  x10: {
    fontSize: 13,
  },
  x20: {
    fontSize: 14,
  },
  x30: {
    fontSize: 16,
  },
  x40: {
    fontSize: 19,
  },
  x50: {
    fontSize: 24,
  },
  x60: {
    fontSize: 32,
  },
  x70: {
    fontSize: 38,
  },
}