import * as React from 'react'
import {Text, View, Image, Pressable, FlatList, ListRenderItemInfo} from 'react-native'
import Header from '../components/Header';
import ResolvePost from '../components/ResolvePost';
import { getResolve } from '../services/firebaseFirestore';
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
const ResolveScreen = ({route, navigation}): JSX.Element => {
    const {keys} = route.params;
    const [data, setData] = React.useState<any>([]);
    React.useEffect(() => {
        getResolve(keys).then((res) => setData(res));
    }, [])

    return (
        <View className="w-full h-full bg-white">
         <Header title="Resolve" isResolve={true} navigation={navigation} keys={keys} />
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
