import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { Avatar } from "@react-native-material/core";
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
  const [confirm, setConfirm] = React.useState(post.confirm);
  const [currentUid, setCurrentUid] = React.useState<any>('');

  useEffect(() => {
    (async () => setCurrentUid(await AsyncStorage.getItem('uid')))()
  }, []);

  return (
    <View className="w-11/12 mx-auto my-5">
        <View className="w-full flex-row justify-between mx-auto mb-2">
          <View className="flex-row justify-between">
            <Avatar image={{ uri: post.avatarUrl }} size={50} style={{marginLeft: 15, marginTop: 15, marginRight: 15}} />
            <View className="mt-5 mr-10">
              <Text className="font-bold text-base text-gray-900">{post.name}</Text>
              <Text className="font-medium text-sm text-gray-500">{post.timestamp}</Text>
            </View>
          </View>
        </View>
        <View className="">
          <Text className="ml-5"><Text className="font-bold">Description:</Text> {post.desc}</Text>
          <Image 
            source={{uri: post.imageUrl}}
            style={{ width: '100%', height: 200, marginTop: 20}} />
        </View>
        <View className="w-11/12 mx-auto flex-row justify-between mt-2">
            <View className="flex-row justify-between gap-4">
              <View className="flex-row justify-between items-center">
                  <Pressable onPress={() => {
                    if (confirm.includes(currentUid)) {
                        removeConfirmResolve(post.id, currentUid); 
                        const newConfirm = confirm.filter((c) => c != currentUid);
                        setConfirm(newConfirm);}
                      else {confirmResolve(post.id, currentUid); setConfirm(confirm.concat([currentUid]))}
                  }}>
                    {(confirm.includes(currentUid))? <ConfirmActiveIcon /> : <ConfirmIcon />}
                  </Pressable>
                  <Text className="ml-2" style={(confirm.includes(currentUid))? {color: '#66f542'}: null}>{confirm.length}</Text>
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
