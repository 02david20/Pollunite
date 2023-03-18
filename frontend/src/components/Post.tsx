import React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ChatIcon from '../../assets/svg/chat.svg'
import VoteIcon from '../../assets/svg/vote_icon.svg'
import VoteActiveIcon from '../../assets/svg/vote_active.svg'
import ShareIcon from '../../assets/svg/share.svg'
import LocationIcon from '../../assets/svg/location.svg'

type PostSchema = {
  post: {
    lat?: number, 
    lng?: number, 
    desc: string,
    img: string,
    location?: string,
    timestamp: string,
    sender: string,
    senderImg: string,
  }
}
const Post = ({post}: PostSchema) => {
  const [pressed, setPressed] = React.useState(false)
  const [vote, setVote] = React.useState(true)
  return (
    <View className="w-11/12 mx-auto my-5">
        <View className="w-full flex-row justify-between mx-auto mb-2">
          <View className="flex-row justify-between">
          <Image 
            source={{uri: post.senderImg}}
            style={{width: 100, height: 100}} />
            <View className="mt-5">
              <Text className="font-bold text-base text-gray-900">{post.sender}</Text>
              <Text className="font-medium text-sm text-gray-500">{post.timestamp}</Text>
            </View>
          </View>
          <Pressable onPress={() => setPressed(!pressed)}>
          <View>
            <View className="mt-5 mr-3">
              <Text className="text-center bg-[#CBD5E1] text-white py-2 px-4 rounded-xl mt-1" style={pressed ? {backgroundColor: '#73B94E'} : null}>Resolved</Text>
            </View>
            </View>
        </Pressable>  
        </View>
        <View className="px-5">
          <Text className="leading-6"><Text className="font-bold">Location:</Text> {post.location}</Text>
          <Text className="leading-6"><Text className="font-bold">Description:</Text> {post.desc}</Text>
          <Image 
            source={{uri: post.img}}
            style={{ width: '100%', height: 200}} />
        </View>
        <View className="w-11/12 mx-auto flex-row justify-between mt-2">
            <View className="flex-row justify-between gap-4">
              <View className="flex-row justify-between items-center">
                  <Pressable onPress={() => setVote(!vote)}>
                    {vote ? <VoteActiveIcon /> : <VoteIcon />}
                  </Pressable>
                  <Text className="ml-2" style={vote ? {color: '#F04A4A'}: null}>62</Text>
              </View>
              <View className="flex-row justify-between items-center">
                  <ChatIcon />
                  <Text className="ml-2">125</Text>
              </View>
              <View className="flex-row justify-between items-center">
                  <ShareIcon />
                  <Text className="ml-2">30</Text>
              </View>
            </View>
            <View>
                <LocationIcon />
            </View>
        </View>
    </View>
  );
};

export default Post;
