import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// import Home from "../screens/Home";
import colors from "../config/colors";
import Search from "../screens/Search";
import New from "../screens/New";
import User from "../screens/User";
import List from "../screens/List";
import HomeScreen from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCar from "../screens/AddCar";
import AppNavigation from "./AppNavigation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={"HomeScreen"}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: () => null,
        tabBarStyle: [css.tabBottomStyle, css.shadow],
      }}
    >
      <Tab.Screen
        name={"HomeScreen"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Feather name="home" size={30} color={colors.secondary} />
              ) : (
                <Feather name="home" size={30} color={colors.lightGray} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"Search"}
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Feather name="search" size={30} color={colors.secondary} />
              ) : (
                <Feather name="search" size={30} color={colors.lightGray} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"New"}
        component={New}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: colors.white,
                ...css.shadow,
                borderRadius: 9999,
                width: 70,
                height: 70,
                right: 7,
                position: "absolute",
                bottom: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {focused ? (
                <Feather
                  name="plus-circle"
                  size={60}
                  color={colors.secondary}
                />
              ) : (
                <Feather
                  name="plus-circle"
                  size={60}
                  color={colors.lightBlue}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"List"}
        component={List}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Feather name="list" size={30} color={colors.secondary} />
              ) : (
                <Feather name="list" size={30} color={colors.lightGray} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={"User"}
        component={User}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Feather name="user" size={30} color={colors.secondary} />
              ) : (
                <Feather name="user" size={30} color={colors.lightGray} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"AddCar"}
        component={AddCar}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name={"Logout"}
        component={AppNavigation}
        options={{
          tabBarStyle: { display: "none" },
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

const css = StyleSheet.create({
  tabBottomStyle: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 70,

    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
