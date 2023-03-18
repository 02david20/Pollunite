import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import NumericInput from "react-native-numeric-input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomButton from "../components/CustomButton";
import Modal from "react-native-modal";

const EventDetailScreen = ({ navigation, route }) => {
  const { id, dateStart, dateEnd, title, numParticipants, imgUrl, vouchers } =
    route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <ScrollView>
      <View>
        <Image
          source={{
            uri: "https://ecomaniac.org/wp-content/uploads/2022/11/The-Green-Environment.jpg",
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <MaterialIcons
            name="arrow-back"
            size={20}
            color="#b1adad"
            style={{ marginRight: 1 }}
          />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold">{title}</Text>
          <View className="flex-col my-1">
            <View className="flex-row items-center">
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
          <Text className="text-gray-500 mt-2 pb-4 justify-evenly">
            Bảo vệ môi trường không chỉ giúp cho chúng ta có một môi trường sống
            lành mạnh hơn mà còn giúp cho các loài động vật và thực vật có một
            môi trường sống tốt hơn. Bạn có thể tham gia vào các hoạt động như
            tập hợp rác, trồng cây, sử dụng các sản phẩm thân thiện với môi
            trường để giúp đỡ bảo vệ môi trường.
          </Text>

          <CustomButton label="Exchange" onPress={toggleModal} />

          <Modal
            testID={"modal"}
            isVisible={isModalVisible}
            onSwipeComplete={toggleModal}
            swipeDirection={["up", "left", "right", "down"]}
            style={styles.view}
          >
            <View style={styles.content}>
              <Text style={styles.contentTitle}>Your Current Points: 123</Text>
              <NumericInput
                value={value}
                onChange={(value) => setValue(value)}
                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                step={1}
                valueType="real"
                rounded
                textColor="#B0228C"
                rightButtonBackgroundColor="#EA3788"
                leftButtonBackgroundColor="#E56B70"
              />
              <View className="flex-col space-between w-full items-center align-center mt-5 space-y-2">
                <CustomButton
                  label="Confirm"
                  onPress={() => alert("Got exchanged " + value + " tickets")}
                />
                <CustomButton label="Close" onPress={toggleModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default EventDetailScreen;
