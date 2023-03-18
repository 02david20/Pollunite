import * as React from 'react'
import {Text, View, Image, Pressable} from 'react-native'
const StartScreen = ({navigation}): JSX.Element => {
    return (
        <View className="w-full h-full flex-col justify-center items-center">
           <Image
            source={require('../../assets/imgs/logo.png')}
            className="w-400 h-400"
          />
          <View className="w-4/5 flex-col justify-center items-center mt-6 gap-y-7">
            <Text className="font-bold text-2xl text-center text-gray-900">Start Together</Text>
            <View className="flex-col justify-center items-center w-4/5 gap-1">
                <Text className="font-normal text-base leading-7 text-center text-gray-500">Small Action Today</Text>
                <Text className="font-normal text-base leading-7 text-center text-gray-500">Big Impact Tommorow</Text>
            </View>
            <Pressable className="w-4/5" onPress={() => navigation.navigate("Login")}>
                <View className="bg-[#4CAF50] rounded-xl">
                    <Text className="text-white p-5 text-center not-italic font-semibold text-base leading-6">Get Started</Text>
                </View>
            </Pressable>
          </View>
        </View>
    )
}

export default StartScreen
