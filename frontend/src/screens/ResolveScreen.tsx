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
        desc: 'I have solved this problem.',
        img: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/collect_garbage.png',
        location: '123/14/2, Binh Hung Hoa, Binh Tan District, Ho Chi Minh City, Viet Nam',
        timestamp: '2023 March 18',
        sender: 'Đức An',
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_ducan.png',
        isAdmin: false,
    },
    {
        lat: 10.80986,
        lng: 106.60501,
        desc: 'I have solved this problem.',
        img: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/collect_bottles.png',
        location: '2/1, Linh Chieu, Thu Duc, Ho Chi Minh City, Viet Nam',
        timestamp: '2023 March 19',
        sender: 'Kha Sang',
        senderImg: 'https://raw.githubusercontent.com/anduckhmt146/resource/master/public/avt_khasang.png',
        isAdmin: false,
    }
]
const ResolveScreen = (): JSX.Element => {
    return (
        <View className="w-full h-full bg-white">
         <Header title="Resolve" isResolve={true} />
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

export default ResolveScreen
