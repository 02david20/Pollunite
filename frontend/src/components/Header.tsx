import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import BackArrowIcon from '../../assets/svg/back_arrow.svg'
import RankIcon from '../../assets/svg/rank.svg'
const Header = () => {
  return (
    <View className="w-11/12 mx-auto flex-row justify-between mt-16">
      <View className="flex-row justify-between">
        <BackArrowIcon />
        <Text className="mt-2 text-xl leading-7 text-gray-600 text-center">Area Detail</Text>
      </View>
      <Pressable>
        <View>
          <Text className="text-center bg-green-600 text-white px-2 py-2 rounded-xl mt-1">Solution</Text>
        </View>
      </Pressable>
      <Pressable>
        <View>
        <View>
          <Text className="text-center bg-red-600 text-white py-2 px-5 rounded-xl mt-1">Join</Text>
        </View>
        </View>
      </Pressable>
      <RankIcon />
    </View>
  );
};

export default Header;
