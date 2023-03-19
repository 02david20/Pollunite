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
    isAdmin?: boolean;
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
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avatarPost.png',
        isAdmin: true,
    },
    {
        lat: 10.80986,
        lng: 106.60501,
        desc: 'There is a lot of bottles in this area.',
        img: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/bottle_garbage.jpg',
        location: '2/1, Linh Chieu, Thu Duc, Ho Chi Minh City, Viet Nam',
        timestamp: '2023 March 19',
        sender: 'Quang Khánh',
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/khanh.png',
        isAdmin: true,
    }
]
const ViewAreaScreen = ({navigation}): JSX.Element => {
    return (
        <View className="w-full h-full bg-white">
        <Header title="Area Detail" isResolve={false} navigation={navigation} />
        <FlatList
            data={data}
            ItemSeparatorComponent={() => <View style={{width: 10, height: 10}} />}
            renderItem={({ item }: ListRenderItemInfo<PostSchema>) => (
                <Pressable>
                    <Post post={item} />
                </Pressable>
            )}
            keyExtractor={(item: PostSchema) => item.img}
            numColumns={1}
            />
        </View>
    )
}

export default ViewAreaScreen
