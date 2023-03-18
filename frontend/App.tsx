import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import * as React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TabNavigator from './src/navigation/TabNavigator'
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import { PiHomeDarkTheme, PiHomeLightTheme } from './src/styles/themes'
const AuthStack = createStackNavigator()

export default function App() {
    const [visible, setVisible] = React.useState(true)
    //load font
    const [fontLoaded, error] = useFonts({
        'SF-Pro-Rounded_heavy': require('./assets/font/SF-Pro-Rounded-Heavy.otf'),
        'SF-Pro-Rounded_bold': require('./assets/font/SF-Pro-Rounded-Bold.otf'),
        'SF-Pro-Rounded_semibold': require('./assets/font/SF-Pro-Rounded-Semibold.otf'),
        'SF-Pro-Rounded_medium': require('./assets/font/SF-Pro-Rounded-Medium.otf'),
        'SF-Pro-Rounded_regular': require('./assets/font/SF-Pro-Rounded-Regular.otf'),
    })

    if (!fontLoaded) {
        return null
    }

    return (
        <SafeAreaProvider>
           <HomeScreen />
        </SafeAreaProvider>
    )
}
