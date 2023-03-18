import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import CustomDrawer from "../components/CustomDrawer";
// import { TabNavigator } from "./TabNavigator";
import EventScreen from "../screens/EventScreen";
import ReportScreen from "../screens/ReportScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { DrawerNavigatorParamList } from "./types";
import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/EventDetailScreen";

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#1D192B",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -10,
          // fontFamily: "MontserratSemiBold",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: (p: any) => (
            <MaterialCommunityIcons name="home" size={22} color={p.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: (p: any) => (
            <MaterialCommunityIcons name="home" size={22} color={p.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Events"
        component={EventScreen}
        options={{
          drawerIcon: (p: any) => (
            <MaterialCommunityIcons name="calendar" size={22} color={p.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{
          drawerIcon: (p: any) => (
            <MaterialCommunityIcons name="alarm-plus" size={22} color={p.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: (p: any) => (
            <MaterialCommunityIcons name="account" size={22} color={p.color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
