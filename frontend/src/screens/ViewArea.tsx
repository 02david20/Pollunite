import * as React from 'react'
import {Text, View, Image, Pressable, FlatList, ListRenderItemInfo} from 'react-native'
import Header from '../components/Header';
import Post from '../components/Post';
type PostSchema = {
    id: string,
    lat: number, 
    lng: number, 
    desc: string,
    imageUrl: string,
    avatarUrl: string,
    uid: string,
    name: string,
    timestamp: string,
    isResolved: boolean,
    tags: string[],
    upvote: string[]
}
const ViewAreaScreen = ({route, navigation}): JSX.Element => {
    const { data } = route.params;

    data.sort((a, b) => {
        const s1 = a.upvote.length;
        const s2 = b.upvote.length;
        return s2 - s1;
    });
    return (
        <View className="w-full h-full bg-white">
        <Header title="Area Detail" isResolve={false} navigation={navigation} keys={data.map(e => e.id)} />
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