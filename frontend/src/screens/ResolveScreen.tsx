import * as React from 'react'
import {Text, View, Image, Pressable, FlatList, ListRenderItemInfo} from 'react-native'
import Header from '../components/Header';
import Post from '../components/Post';
type PostSchema = {
    lat?: number, 
    lng?: number, 
    desc: string,
    img: string,
    timestamp: string,
    sender: string,
    senderImg: string,
}
const data = [
    {
        lat: 10.80986,
        lng: 106.60501,
        desc: 'There is a lot of garbage in this area that has not been resolved.',
        img: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/garbage.jpg',
        location: '123/14/2, Binh Hung Hoa, Binh Tan District, Ho Chi Minh City, Viet Nam',
        timestamp: '2023 March 18',
        sender: 'Đại Vinh',
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avatarPost.png'
    },
    {
        lat: 10.80986,
        lng: 106.60501,
        desc: 'There is a lot of garbage in this area that has not been resolved.',
        img: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/garbage.jpg',
        location: '123/14/2, Binh Hung Hoa, Binh Tan District, Ho Chi Minh City, Viet Nam',
        timestamp: '2023 March 18',
        sender: 'Đại Vinh',
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avatarPost.png'
    }
]
const ResolveScreen = (): JSX.Element => {
    return (
        <View className="w-full h-full">
         <Header title="Area Detail" isResolve={true} />
         <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
            renderItem={({ item }: ListRenderItemInfo<PostSchema>) => (
                <Pressable>
                    <Post post={item}  />
                </Pressable>
            )}
            keyExtractor={(item: PostSchema) => item.img}
            numColumns={1}
            />
        </View>
    )
}

export default ResolveScreen
