import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CustomDrawer from "../components/CustomDrawer";
import { TabNavigator } from "./TabNavigator";
import EventScreen from "../screens/EventScreen";
import ReportScreen from "../screens/ReportScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { DrawerNavigatorParamList } from "./types";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#1D192B",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -10,
          fontFamily: "MontserratSemiBold",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={EventScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="alarm-plus" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
