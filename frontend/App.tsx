import app from './src/services/firebaseApp'
import { NavigationContainer } from "@react-navigation/native";
// import { useFonts } from 'expo-font'
import {useState, useEffect} from 'react'
import {
    getAuth,
    onAuthStateChanged,
    User,
} from 'firebase/auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import AppStack from "./src/navigator/AppStack";
import AuthStack from './src/navigator/AuthStack';
import TabNavigator from './src/navigator/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

export default function App() {
    const [user, setUser] = useState<User|null>(null)
    // const [fontLoaded, error] = useFonts({
    //     'Poppins_bold': require('./assets/font/Poppins-Bold.otf'),
    //     'Poppins_semibold': require('./assets/font/Poppins-SemiBold.otf'),
    //     'Poppins_medium': require('./assets/font/Poppins-Medium.otf'),
    //     'Poppins_regular': require('./assets/font/Poppins-Regular.otf'),
    //     'Poppins_light': require('./assets/font/Poppins-Light.otf'),
    // });

    useEffect(() => {
        onAuthStateChanged(getAuth(), async (_user) => {
            if (_user) {
              const userRef = doc(collection(getFirestore(), 'users'), _user?.uid);
              const userSnapshot = await getDoc(userRef);
              const userData = userSnapshot.data();
              await AsyncStorage.setItem('uid', _user?.uid);
              await AsyncStorage.setItem('name', userData?.name);
              await AsyncStorage.setItem('avatarUrl', userData?.imageUrl);
              setUser(_user);
            } else setUser(null);
        })
    }, []);


  // if (!fontLoaded) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user
        ? <TabNavigator />
        : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
