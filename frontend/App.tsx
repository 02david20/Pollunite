import app from './src/services/firebaseApp'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import {Text, View, Image, Pressable} from 'react-native'
import * as React from 'react'
import StartScreen from './src/screens/StartScreen'
import ProfileScreen from './src/screens/ProfileScreen'

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
        <View style={{
            flex: 1
        }}>
            <ProfileScreen />
        </View>
    )
}
