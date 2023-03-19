import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import EventScreen from "../screens/EventScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportScreen from "../screens/ReportScreen";
import MapScreen from "../screens/Map";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TabNavigatorParamList } from "./types";
import EventDetailScreen from "../screens/EventDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ViewAreaScreen from "../screens/ViewArea";
import ResolveScreen from "../screens/ResolveScreen";
import JoinScreen from "../screens/JoinScreen";
const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();
const Stack = createStackNavigator();

const tabOptions: MaterialBottomTabNavigationOptions = {
  tabBarColor: "#1D192B",
};
const EventStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={EventScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#1D192B"
      inactiveColor="#1d192b25"
      barStyle={{ backgroundColor: "#E8DEF8" }}
      screenOptions={tabOptions}
      shifting={true}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventStack}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alarm-plus" color={color} size={26} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ViewArea"
        component={ViewAreaScreen}
        options={{
          tabBarLabel: "ViewArea",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Resolve" 
        component={ResolveScreen} 
        options={{
          tabBarLabel: "Resolve",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Join" 
        component={JoinScreen} 
        options={{
          tabBarLabel: "Join",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
