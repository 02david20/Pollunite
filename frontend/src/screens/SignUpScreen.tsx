import { useState } from 'react'
import {Text, View, Pressable} from 'react-native'
import TextInputComponent from '../components/TextInputComponent';
import PassWordComponent from '../components/PasswordComponent';
import GoogleIcon from '../../assets/svg/google.svg'
import FacebookIcon from '../../assets/svg/facebook.svg'
import {signUp} from '../services/firebaseAuth';

const SignUpScreen = ({navigation}): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <View className="bg-white">
        <View className="w-11/12 mx-auto h-full flex-col justify-center">
           <Text className="font-extrabold text-4xl text-center text-[#1976D2]">Sign Up</Text>
           <View>
            <View>
              <TextInputComponent placeholder="Name" color="#1976D2" value={name} setValue={(text: string) => setName(text)} />
              <TextInputComponent placeholder="Email" color="#1976D2" value={email} setValue={(text: string) => setEmail(text)} />
              <PassWordComponent placeholder="Password" color="#1976D2" value={password} setValue={(text: string) => setPassword(text)} />
            </View>
           <Pressable className="w-11/12 mx-auto mt-5" onPress={() => signUp(name, email, password)}>
                <View className="bg-[#1976D2] rounded-xl">
                    <Text className="text-white p-5 text-center not-italic font-semibold text-base leading-6">Sign Up</Text>
                </View>
            </Pressable>
            <View className="mt-5">
              <View className="w-1/2 mx-auto flex-row justify-between">
              <Text className="text-center not-italic font-normal text-lg text-gray-600 mt-5">Have an account?</Text>
              <Pressable className="flex-col justify-center items-center" onPress={() => navigation.navigate("Login")}>
                <Text className="text-black font-bold text-lg text-center mt-5 ml-1">
                Sign In
                </Text>
              </Pressable>
              </View>
            </View>
           </View>
        </View>
      </View>
    )
}

export default SignUpScreen
