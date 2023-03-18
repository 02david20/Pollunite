import { DefaultTheme } from '@react-navigation/native'
import color from './color'
import text from './text'

const PiHomeLightTheme = {
    dark: false,
    colors: {
        primary: color.primary,
        background: color.lightBackground,
        card: 'rgb(255, 255, 255)',
        text: color.darkText,
        border: 'rgb(216, 216, 216)',
        notification: color.darkBackground,
    },
}

const PiHomeDarkTheme = {
    dark: true,
    colors: {
        primary: color.primary,
        background: color.darkBackground,
        card: 'rgb(255, 255, 255)',
        text: color.lightText,
        border: 'rgb(216, 216, 216)',
        notification: 'white',
    },
}

export { PiHomeLightTheme, PiHomeDarkTheme }
