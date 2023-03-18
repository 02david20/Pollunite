import app from './src/services/firebaseApp'
import { createStackNavigator } from '@react-navigation/stack'
import { useFonts } from 'expo-font'
import {Text, View, Image, Pressable} from 'react-native'
import {useState, useEffect} from 'react'
import {
    getAuth,
    onAuthStateChanged,
    User,
} from 'firebase/auth'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MapScreen from './src/screens/Map'

export default function App() {
    const [visible, setVisible] = useState(true)
    const [user, setUser] = useState<User|null>(null)
    const [fontLoaded, error] = useFonts({
        'Poppins_bold': require('./assets/font/Poppins-Bold.otf'),
        'Poppins_semibold': require('./assets/font/Poppins-SemiBold.otf'),
        'Poppins_medium': require('./assets/font/Poppins-Medium.otf'),
        'Poppins_regular': require('./assets/font/Poppins-Regular.otf'),
        'Poppins_light': require('./assets/font/Poppins-Light.otf'),
    })

    useEffect(() => {
        onAuthStateChanged(getAuth(), (_user) => {
            setUser(_user)
        })
    }, []);

    if (!fontLoaded) {
        return null
    }

    return (
        <View style={{
            flex: 1
        }}>
            {user
            ? <ProfileScreen />
            : <LoginScreen />}
        </View>
    )
}
