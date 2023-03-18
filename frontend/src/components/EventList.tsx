import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import EventItem from "./EventItem";


const EventList = ({navigation}) => {
    return (
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
          className="pt-4"
        >
          {data &&
            data.map((item, index) => (
              <EventItem key={index} item={item} navigation={navigation} />
            ))}
        </ScrollView>
      </View>
    );
};

export default EventList;

const data = [
  {
    id: 123,
    dateStart: "21/03/2023",
    dateEnd: "09/04/2023",
    title: "EVNNPT - CHÀO MỪNG 15 NĂM THÀNH LẬP XYZ",
    numParticipants: 124,
    imgUrl:
      "https://ecomaniac.org/wp-content/uploads/2022/11/The-Green-Environment.jpg",
    vouchers: 123,
  },
  {
    id: 126,
    dateStart: "21/03/2023",
    dateEnd: "09/04/2023",
    title: "EVNNPT - CHÀO MỪNG 16 NĂM THÀNH LẬP XYZ",
    numParticipants: 124,
    imgUrl:
      "https://ecomaniac.org/wp-content/uploads/2022/11/The-Green-Environment.jpg",
    vouchers: 123,
  },
  {
    id: 127,
    dateStart: "21/03/2023",
    dateEnd: "09/04/2023",
    title: "EVNNPT - CHÀO MỪNG 17 NĂM THÀNH LẬP XYZ",
    numParticipants: 124,
    imgUrl:
      "https://ecomaniac.org/wp-content/uploads/2022/11/The-Green-Environment.jpg",
    vouchers: 123,
  },
  {
    id: 128,
    dateStart: "21/03/2023",
    dateEnd: "09/04/2023",
    title: "EVNNPT - CHÀO MỪNG 18 NĂM THÀNH LẬP XYZ",
    numParticipants: 124,
    imgUrl:
      "https://ecomaniac.org/wp-content/uploads/2022/11/The-Green-Environment.jpg",
    vouchers: 123,
  },
];