import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, ParamListBase, useNavigation } from "@react-navigation/native";

const CustomDrawer = (
  props:
    | (JSX.IntrinsicAttributes &
        ScrollViewProps & {
          children: React.ReactNode;
        } & React.RefAttributes<ScrollView>)
    | (JSX.IntrinsicAttributes & {
        state: DrawerNavigationState<ParamListBase>;
        navigation: DrawerNavigationHelpers;
        descriptors: DrawerDescriptorMap;
      })
) => {
  const nav = useNavigation();
  return (
    <View className="flex-1">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#E8DEF8", flex: 1 }}
      >
        <ImageBackground
          source={require("../../assets/imgs/menu-bg.jpg")}
          className="p-5"
        >
          <Image
            source={require("../../assets/imgs/avatar.png")}
            className="round-lg mb-2"
            style={{
              height: 80,
              width: 80,
            }}
          />
          <Text
            className="text-white mb-1"
            style={{
              fontSize: 18,
              // fontFamily: "MontserratBold",
            }}
          >
            Sang Kha
          </Text>
        </ImageBackground>
        <View className="flex-grow bg-[#E8DEF8] pt-3">
          <DrawerItemList
            state={nav.getParent()}
            navigation={nav.getParent()}
            descriptors={nav.getParent()}
            {...props}
          />
        </View>
      </DrawerContentScrollView>
      <View className="p-5 border-t-2 border-[#1D192B] bg-[#E8DEF8]">
        <TouchableOpacity onPress={() => {}} className="py-4">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="location-exit" size={22} />
            <Text
              className="ml-2"
              style={{
                fontSize: 15,
                // fontFamily: "MontserratRegular",
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
