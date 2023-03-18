import app from './src/services/firebaseApp'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font'
import {useState, useEffect} from 'react'
import {
    getAuth,
    onAuthStateChanged,
    User,
} from 'firebase/auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppStack from "./src/navigator/AppStack";
import { TabNavigator } from "./src/navigator/TabNavigator";
import { PiHomeDarkTheme, PiHomeLightTheme } from "./src/styles/themes";
const AuthStack = createStackNavigator();

export default function App() {
    const [visible, setVisible] = useState(true)
    const [user, setUser] = useState<User|null>(null)
    // const [fontLoaded, error] = useFonts({
    //     'Poppins_bold': require('./assets/font/Poppins-Bold.otf'),
    //     'Poppins_semibold': require('./assets/font/Poppins-SemiBold.otf'),
    //     'Poppins_medium': require('./assets/font/Poppins-Medium.otf'),
    //     'Poppins_regular': require('./assets/font/Poppins-Regular.otf'),
    //     'Poppins_light': require('./assets/font/Poppins-Light.otf'),
    // });

    useEffect(() => {
        onAuthStateChanged(getAuth(), (_user) => {
            setUser(_user)
        })
    }, []);

  // if (!fontLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
