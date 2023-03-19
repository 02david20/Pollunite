import { View, Text, Pressable, FlatList, ListRenderItemInfo, ScrollView } from 'react-native'
import React from 'react'
import BackArrowIcon from '../../assets/svg/back_arrow.svg'
import LeaderMember from '../components/LeaderMember'
type MemberSchema = {
  id: string,
  name: string,
  avatar: string,
  point: number,
}
const data = [
  {
    id: '1',
    name: 'Đại Vinh',
    avatar: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avatarPost.png',
    point: 2569,
  },
  {
    id: '2',
    name: 'Kha Sang',
    avatar: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_khasang.png',
    point: 1469,
  },
  {
    id: '3',
    name: 'Đức An',
    avatar: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_ducan.png',
    point: 1053,
  },
  {
    id: '4',
    name: 'Quang Khánh',
    avatar: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/khanh.png',
    point: 960,
  },
]
const LeaderBoardScreen = ({navigation}) => {
  return (
    <ScrollView className="w-full h-full bg-white">
      <View className="flex-col mt-5 w-11/12 mx-auto">
        <View className="flex-row justify-start">
          <Pressable onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <Text className="text-center text-2xl text-bold text-black mt-2">Leaderboard</Text>
          <View></View>
        </View>
        <View className="flex-row w-4/5 mx-auto justify-between mt-10">
            <Pressable>
              <View className="bg-blue-500 w-100 py-4 px-6 rounded-lg">
                <Text className="text-white text-xl text-bold">Weekly</Text>
              </View>
            </Pressable>
            <Pressable>
              <View className="bg-green-500 w-100 py-4 px-6 rounded-lg">
                <Text className="text-white text-xl text-bold">All Time</Text>
              </View>
            </Pressable>
          </View>
      </View>
      <View className="w-11/12 mx-auto bg-gray-300 mt-8 rounded-2xl">
      <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
            renderItem={({ item }: ListRenderItemInfo<MemberSchema>) => (
                <Pressable>
                    <LeaderMember member={item} />
                </Pressable>
            )}
            keyExtractor={(item: MemberSchema) => item.id}
            numColumns={1}
            scrollEnabled={true}
            />
      </View>
    </ScrollView>
  )
}

export default LeaderBoardScreen
