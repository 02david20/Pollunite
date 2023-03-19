import * as React from 'react'
import {Text, View, Image, Pressable, FlatList, ListRenderItemInfo} from 'react-native'
import Header from '../components/Header';
import Post from '../components/Post';
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
const data = [
    {
        lat: 10.85, 
        lng: 106.5, 
        desc: 'There is a lot of garbage in this area that has not been resolved.',
        imageUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/garbage.jpg',
        avatarUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avatarPost.png',
        uid: '91SJKOl7mWNKA7nwcyDikGztEzj2',
        name: 'Abc',
        timestamp: '2023 March 18',
        isResolved: false,
        tags: ['organic', 'inorganic']
    },
    {
        lat: 10.89, 
        lng: 106.7, 
        desc: 'huhuhu',
        imageUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/bottle_garbage.jpg',
        avatarUrl: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/khanh.png',
        uid: '91SJKOl7mWNKA7nwcyDikGztE',
        name: 'Xyz',
        timestamp: '2023 March 25',
        isResolved: true,
        tags: ['organic']
    }
]
const ViewAreaScreen = (): JSX.Element => {
    return (
        <View className="w-full h-full">
         <Header title="Area Detail" isResolve={false} />
         <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
            renderItem={({ item }: ListRenderItemInfo<PostSchema>) => (
                <Pressable>
                    <Post post={item} />
                </Pressable>
            )}
            keyExtractor={(item: PostSchema) => item.imageUrl}
            numColumns={1}
            />
        </View>
    )
}

export default ViewAreaScreen
