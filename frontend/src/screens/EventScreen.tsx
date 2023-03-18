import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import EventList from "../components/EventList";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const EventScreen = () => {
  const navigation: any = useNavigation();
  return (
    <ScrollView className="pt-7 px-2">
      {/* Header */}
      <Text className="font-extrabold text-4xl text-start text-[#4CAF50] mb-5 px-2">
        Events
      </Text>
      {/* Search bar */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 mb-5">
        <View className="flex-row items-center space-x-2 p-3 bg-gray-200 flex-1">
          <MaterialIcons
            name="search"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput placeholder="Search for events" keyboardType="default" />
        </View>
      </View>

      {/* Suggested for you */}
      <View className="mb-5">
        <Text className="font-extrabold text-lg text-start text-[#439146] px-2">
          Suggested for you
        </Text>
        <EventList navigation={navigation} />
      </View>

      {/* Ongoing */}
      <View className="mb-5">
        <Text className="font-extrabold text-lg text-start text-[#439146] px-2">
          Ongoing
        </Text>
        <EventList navigation={navigation} />
      </View>

      {/* Pending */}
      <View className="mb-5">
        <Text className="font-extrabold text-lg text-start text-[#439146] px-2">
          Pending
        </Text>
        <EventList navigation={navigation} />
      </View>

      {/* Closed */}
      <View className="mb-5">
        <Text className="font-extrabold text-lg text-start text-[#439146] px-2">
          Closed
        </Text>
        <EventList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default EventScreen;
