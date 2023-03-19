import { useState } from 'react'
import {Text, View, Pressable} from 'react-native'
import TextInputComponent from '../components/TextInputComponent';
import PassWordComponent from '../components/PasswordComponent';
import GoogleIcon from '../../assets/svg/google.svg'
import FacebookIcon from '../../assets/svg/facebook.svg'
import {signIn} from '../services/firebaseAuth';

const LoginScreen = ({navigation}): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    return (
      <View className="bg-white">
        <View className="w-11/12 mx-auto h-full flex-col justify-center bg-white">
           <Text className="font-extrabold text-4xl text-center text-[#4CAF50]">Login</Text>
           <View className="mt-3">
            <View>
                <TextInputComponent placeholder="Email" color="#4CAF50" value={email} setValue={(text: string) => setEmail(text)} />
                <PassWordComponent placeholder="Password" color="#4CAF50" value={password} setValue={(text: string) => setPassword(text)} />
            </View>
           <Pressable className="w-11/12 mx-auto mt-5" onPress={() => signIn(email, password)}>
                <View className="bg-[#4CAF50] rounded-xl">
                    <Text className="text-white p-5 text-center not-italic font-semibold text-base leading-6">Log In</Text>
                </View>
            </Pressable>
            <View className="mt-5">
              <View className="w-3/4 mx-auto flex-row justify-between">
              <Text className="text-center not-italic font-normal text-lg text-gray-600 mt-5">Don't have an account?</Text>
              <Pressable className="flex-col justify-center items-center" onPress={() => navigation.navigate("Signup")}>
                <Text className="text-black font-bold text-lg text-center mt-5 ml-1">
                  Create now
                </Text>
              </Pressable>
              </View>
            </View>
           </View>
        </View>
      </View>
    )
}

export default LoginScreen