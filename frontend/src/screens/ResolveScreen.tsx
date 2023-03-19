import * as React from 'react'
import {Text, View, Image, Pressable, FlatList, ListRenderItemInfo} from 'react-native'
import Header from '../components/Header';
import ResolvePost from '../components/ResolvePost';
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
const data = [
    {
        id: 'BGTyQ48DWKDFjpLb1HCa',
        lat: 10.85, 
        lng: 106.5, 
        desc: 'I have solved this problem.',
        imageUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/collect_garbage.png',
        avatarUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_ducan.png',
        uid: '91SJKOl7mWNKA7nwcyDikGztEzj2',
        name: 'Đức An',
        timestamp: '2023 March 09',
        confirm: [],
    },
    {
        id: 'BGTyQ48DWKDFjpLb1HCa',
        lat: 10.89, 
        lng: 106.7, 
        desc: 'hihihih',
        imageUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/collect_bottles.png',
        avatarUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_khasang.png',
        uid: '91SJKOl7mWNKA7nwcyDikGztE',
        name: 'Kha Sang',
        timestamp: '2023 March 11',
        confirm: [],
    }
]
const ResolveScreen = ({navigation}): JSX.Element => {
    return (
        <View className="w-full h-full bg-white">
         <Header title="Resolve" isResolve={true} navigation={navigation} />
         <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
            renderItem={({ item }: ListRenderItemInfo<ResolveSchema>) => (
                <Pressable>
                    <ResolvePost post={item} />
                </Pressable>
            )}
            keyExtractor={(item: ResolveSchema) => item.imageUrl}
            numColumns={1}
            />
        </View>
    )
}

export default ResolveScreen
