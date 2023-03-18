import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const EventItem = ({ item }) => {
  const { id, dateStart, dateEnd, title, numParticipants, imgUrl, vouchers } =
    item;
  const navigation:any = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {navigation.navigate("Restaurant",item)}}
      className="bg-white mr-3 shadow max-w-[300px]"
    >
      <Image source={{ uri: imgUrl }} className="h-36 w-full rounded" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-md py-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <MaterialIcons
            name="calendar-today"
            size={20}
            color="#b1adad"
            style={{ marginRight: 5 }}
          />
          <Text className="text-[#b1adad]">
            {dateStart}-{dateEnd}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MaterialIcons
            name="supervised-user-circle"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <Text className="font-semibold text-md py-2">
            +{numParticipants}{" "}
            <Text className="font-normal">participants</Text>
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MaterialCommunityIcons
            name="ticket"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <Text className="font-bold text-md py-2 text-gray">
            {vouchers} <Text className="font-normal">vouchers left</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;
