import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ChatIcon from '../../assets/svg/chat.svg'
import VoteIcon from '../../assets/svg/vote_icon.svg'
import VoteActiveIcon from '../../assets/svg/vote_active.svg'
import ShareIcon from '../../assets/svg/share.svg'
import LocationIcon from '../../assets/svg/location.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

type PostSchema = {
  lat: number, 
  lng: number, 
  desc: string,
  imageUrl: string,
  avatarUrl: string,
  uid: string,
  name: string,
  timestamp: string,
  isResolved: boolean,
  tags: string[]
}

const Post = (props) => {
  let post: PostSchema = props.post;
  const [pressed, setPressed] = React.useState(false)
  const [vote, setVote] = React.useState(true)
  const [currentUid, setCurrentUid] = React.useState<any>('');

  useEffect(() => {
    (async () => setCurrentUid(await AsyncStorage.getItem('uid')))()
  }, []);

  return (
    <View className="w-11/12 mx-auto my-5">
        <View className="w-full flex-row justify-between mx-auto mb-2">
          <View className="flex-row justify-between">
          <Image 
            source={{uri: post.avatarUrl}}
            style={{width: 100, height: 100}} />
            <View className="mt-5">
              <Text className="font-bold text-base text-gray-900">{post.name}</Text>
              <Text className="font-medium text-sm text-gray-500">{post.timestamp}</Text>
            </View>
          </View>
        {(currentUid == post.uid)
          ? <Pressable onPress={() => setPressed(!pressed)}>
            <View>
              <View className="mt-5 mr-3">
                <Text className="text-center bg-[#CBD5E1] text-white py-2 px-4 rounded-xl mt-1" style={pressed ? { backgroundColor: '#73B94E' } : null}>Resolved</Text>
              </View>
            </View>
          </Pressable>

          : <View className="mt-9 mr-4">
            <View className="w-4 h-4 rounded-full bg-gray-500" style={post.isResolved? { backgroundColor: '#73B94E' } : null}></View>
          </View>
        }
        </View>
        <View className="px-5">
          <Text className="leading-6"><Text className="font-bold">Tags:</Text>{post.tags.join(' - ')}</Text>
          <Text className="leading-6"><Text className="font-bold">Description:</Text> {post.desc}</Text>
          <Image 
            source={{uri: post.imageUrl}}
            style={{ width: '100%', height: 200, marginTop: 20}} />
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
