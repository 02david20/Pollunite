import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import GoldCupIcon from '../../assets/svg/gold_cup.svg'
import SilverCupIcon from '../../assets/svg/silver_cup.svg'
import BronzeCupIcon from '../../assets/svg/bronze_cup.svg'

type MemberSchema = {
  member: {
    id: string,
    name: string,
    avatar: string,
    point: number,
  }
}
const LeaderMember = ({member}: MemberSchema) => {
  return (
    <View className="bg-white w-11/12 mx-auto my-2 rounded-2xl px-2">
      <View className="flex-row justify-between items-center p-1">
        <View className="flex-row justify-between items-center">
          <View className="rounded-full w-6 h-6 border border-gray-500 flex-row justify-center items-center">
            <Text className="text-black text-center items-center">{member.id}</Text>
          </View>
          <Image source={{uri: member.avatar}} style={{width: 100, height: 100}} />
          <View className="mb-2">
            <Text className="text-bold text-lg">{member.name}</Text>
            <Text className="text-red-500 text-lg text-bold">{member.point} points</Text>
          </View>
        </View>
        {
          member.id == '1' ? <GoldCupIcon width={40} height={40} /> : (member.id == '2' ? <SilverCupIcon width={40} height={40} /> : (member.id == '3' ? <BronzeCupIcon width={40} height={40} /> : <View></View>))
        }
      </View>
    </View>
  );
};

export default LeaderMember;
