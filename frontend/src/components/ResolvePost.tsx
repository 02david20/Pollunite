import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import ConfirmIcon from '../../assets/svg/confirm_icon.svg'
import ConfirmActiveIcon from '../../assets/svg/confirm_active.svg'
import LocationIcon from '../../assets/svg/location.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  confirmResolve,
  removeConfirmResolve
} from '../services/firebaseFirestore';

type ResolveSchema = {
    id: string,
    lat: number, 
    lng: number, 
    desc: string,
    imageUrl: string,
    avatarUrl: string,
    uid: string,
    name: string,
    timestamp: string,
    confirm: string[]
}

const ResolvePost = (props) => {
  let post: ResolveSchema = props.post;
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
        </View>
        <View className="px-5">
          <Text className="leading-6"><Text className="font-bold">Description:</Text> {post.desc}</Text>
          <Image 
            source={{uri: post.imageUrl}}
            style={{ width: '100%', height: 200, marginTop: 20}} />
        </View>
        <View className="w-11/12 mx-auto flex-row justify-between mt-2">
            <View className="flex-row justify-between gap-4">
              <View className="flex-row justify-between items-center">
                  <Pressable onPress={() => (post.confirm.includes(currentUid))? removeConfirmResolve(post.id, currentUid):confirmResolve(post.id, currentUid)}>
                    {(post.confirm.includes(currentUid))? <ConfirmActiveIcon /> : <ConfirmIcon />}
                  </Pressable>
                  <Text className="ml-2" style={(post.confirm.includes(currentUid))? {color: '#66f542'}: null}>{post.confirm.length}</Text>
              </View>
            </View>
            <View>
                <LocationIcon />
            </View>
        </View>
    </View>
  );
};

export default ResolvePost;
