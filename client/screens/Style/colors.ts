
type Primary = 'primary' | 'background' | 'focus' | 'input' | 'text'

const BLACK = '#1A1A1A'
const PINK = '#B75C5C'
const WHITE = '#FFFFFF'
const RED = '#B00020'


export const darkColors: Record<Primary, string> = {
  primary: PINK,
  background: BLACK,
  focus: '#000000',
  input: '#252525',
  text: WHITE
}


export const lightColors: Record<Primary, string> = {
  primary: PINK,
  background: WHITE,
  focus: '#000000',
  input: '#252525',
  text:BLACK,
}