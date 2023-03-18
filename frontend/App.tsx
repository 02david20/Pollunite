import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import {Text, View, Image, Pressable} from 'react-native'
import * as React from 'react'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ViewAreaScreen from './src/screens/ViewArea'
import ResolveScreen from './src/screens/ResolveScreen'

export default function App() {
    const [visible, setVisible] = React.useState(true)
    const [fontLoaded, error] = useFonts({
        'Poppins_bold': require('./assets/font/Poppins-Bold.otf'),
        'Poppins_semibold': require('./assets/font/Poppins-SemiBold.otf'),
        'Poppins_medium': require('./assets/font/Poppins-Medium.otf'),
        'Poppins_regular': require('./assets/font/Poppins-Regular.otf'),
        'Poppins_light': require('./assets/font/Poppins-Light.otf'),
    })

    if (!fontLoaded) {
        return null
    }

    return (
        <View>
            <ResolveScreen />
        </View>
    )
}
