import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
/* import axios from "axios";
import { BASE_URL } from "../config/config"; */
import AntDesign from "@expo/vector-icons/AntDesign";
import { MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReport } from "../services/firebaseFirestore";

const data = [
  { label: "Organic", value: "organic" },
  { label: "Inorganic", value: "inorganic" },
  { label: "Recycling", value: "recycling" },
];

type Resolve = {
  lat?: number | undefined;
  lng?: number | undefined;
  desc?: string | undefined;
  img?: string | undefined;
};

const AddGardenScreen = () => {
  const [resolve, setResolve] = useState<Resolve>();
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => { 
    (async () => { 
        let { status } = await Location.requestForegroundPermissionsAsync(); 
         
        if (status !== 'granted') { 
            alert('Permission to access location was denied') 
        }else{ 
            try{ 
                let location = await Location.getCurrentPositionAsync({}); 
                setResolve({
                    ...resolve,
                    lat: location.coords.latitude, 
                    lng: location.coords.longitude, 
                }) 
            }catch(e){ 
                alert('We could not find your position. Please make sure your location service provider is on'); 
                console.log('Error while trying to get location: ', e); 
            } 
        } 
      })() 
    ; 
  }, []);

  const handleSubmit = async () => {
    console.log(pickedImagePath);
    
    const avatarUrl = await AsyncStorage.getItem('avatarUrl');
    const uid = await AsyncStorage.getItem('uid');
    const name = await AsyncStorage.getItem('name');
    await createReport({
      uid,
      name,
      avatarUrl,
      imagePath: pickedImagePath,
      desc: resolve?.desc,
      lng: resolve?.lng,
      lat: resolve?.lat,
      tags: selected,
    });
    setResolve({});
    setSelected([]);
    setPickedImagePath("");
  };
  const [pickedImagePath, setPickedImagePath] = useState("");

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-[#fff] pt-5 w-full mx-auto h-full flex-col justify-center">
      <ScrollView className="px-5 pt-5">
        <Text className="font-extrabold text-4xl text-center text-[#4CAF50] mb-10">
          New Resolve
        </Text>

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
          value={resolve?.desc}
          inputType=""
          fieldButtonFunction={""}
          fieldButtonLabel={""}
          onChangeText={(t: string) => {
            setResolve({ ...resolve, desc: t });
          }}
          keyboardType="default"
        />

        {
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 20,
            }}
          >
            <Text className="text-lg mt-2 font-bold mr-auto">Select Image</Text>
            <View className="flex-row mt-2 justify-start w-full">
              <TouchableOpacity
                className="rounded-md p-3 bg-[#eae4e4] mr-5"
                onPress={showImagePicker}
              >
                <Text>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-md p-3 bg-[#eae4e4]"
                onPress={openCamera}
              >
                <Text>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        {pickedImagePath !== "" && (
          <Image
            source={{ uri: pickedImagePath }}
            className="w-full min-h-[300px] max-h-[600px] mb-5"
          />
        )}
        {pickedImagePath && (
          <CustomButton
            label={"Create Report"}
            onPress={() => {
              handleSubmit();
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AddGardenScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    marginTop: -10,
    marginBottom: 20,
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#a29f9f",
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
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
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
