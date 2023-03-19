import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import BackArrowIcon from '../../assets/svg/back_arrow.svg'
import RankIcon from '../../assets/svg/rank.svg'
const Header = (props: {title: string, isResolve: boolean, navigation: any}) => {
  return (
    <View className="w-11/12 mx-auto flex-row justify-between mt-10">
      <View className="flex-row justify-between">
        <Pressable onPress={() => props.navigation.goBack()}>
          <BackArrowIcon />
        </Pressable>
        <Text className="mt-2 text-xl leading-7 text-gray-600 text-center">{props.title}</Text>
      </View>
      {!props.isResolve &&
        <Pressable onPress={()=> 
          props.navigation.navigate("Resolve")
        }>
          <View>
            <Text className="text-center bg-green-600 text-white px-2 py-2 rounded-xl mt-1">Solution</Text>
          </View>
        </Pressable>
      }
      {props.isResolve &&
        <Pressable>
          <View>
            <Text className="text-center bg-blue-600 text-white px-3 py-2 rounded-xl mt-1">Submit</Text>
          </View>
        </Pressable>
      }
        <Pressable onPress={()=> 
          props.navigation.navigate("Join")
        }>
          <View>
          <View>
            <Text className="text-center bg-red-600 text-white py-2 px-5 rounded-xl mt-1">Join</Text>
          </View>
          </View>
        </Pressable>
        <Pressable onPress={() => {props.navigation.navigate("LeaderBoard")}}>
          <RankIcon />
        </Pressable>
    </View>
  );
};

export default Header;
