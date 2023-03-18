import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { Dropdown } from "react-native-element-dropdown";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
/* import axios from "axios";
import { BASE_URL } from "../config/config"; */
import AntDesign from "@expo/vector-icons/AntDesign";
import { MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";

const data = [
  { label: "Organic", value: "organic" },
  { label: "Inorganic", value: "inorganic" },
  { label: "Recycling", value: "recycling" },
];

type Report = {
  lat?: number | undefined;
  lng?: number | undefined;
  desc?: string | undefined;
  img?: string | undefined;
};

const AddGardenScreen = () => {
  const [report, setReport] = useState<Report>();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log(report, selected,image);
  };
  const [image, setImage] = useState(null);

  const pickImage:any = async () => {
    // No permissions request is necessary for launching the image library
    let result:any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  /*const handleCreateGarden = async (e) => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    const sendingData = {
      ...data,
      userId: await JSON.parse(userInfo)._id,
      topic_list: {
        sensor: sensorList,
        fan: fanList,
        pump: pumpList,
        motor: motorList,
      },
      boundary: [],
    };
    axios
      .post(`${BASE_URL}/garden/create`, sendingData)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */

  return (
    <View className="flex-1 justify-center bg-[#fff] pt-5">
      <ScrollView className="px-5 pt-5">
        <Text
          style={{
            fontFamily: "MontserratSemiBold",
            fontSize: 38,
            fontWeight: "500",
            color: "#000",
            marginBottom: 30,
          }}
        >
          New Report
        </Text>

        <InputField
          label={"Latitude"}
          icon={
            <MaterialIcons
              name="my-location"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={report?.lat}
          inputType=""
          fieldButtonFunction={""}
          fieldButtonLabel={""}
          onChangeText={(t: number) => {
            setReport({ ...report, lat: t });
          }}
          keyboardType="default"
        />

        <InputField
          label={"Longitude"}
          icon={
            <MaterialIcons
              name="my-location"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={report?.lng}
          inputType=""
          fieldButtonFunction={""}
          fieldButtonLabel={""}
          onChangeText={(t: number) => {
            setReport({ ...report, lng: t });
          }}
          keyboardType="default"
        />

        <InputField
          label={"Description"}
          icon={
            <MaterialIcons
              name="drive-file-rename-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={report?.desc}
          inputType=""
          fieldButtonFunction={""}
          fieldButtonLabel={""}
          onChangeText={(t: string) => {
            setReport({ ...report, desc: t });
          }}
          keyboardType="default"
        />

        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Type of waste"
          searchPlaceholder="Search..."
          value={selected}
          onChange={(item) => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <CustomButton
          label={"Create"}
          onPress={() => {
            handleSubmit();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddGardenScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  button: {
    backgroundColor: "#233f49",
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#ebebeb",
    fontWeight: "bold",
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});
