import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import OnBoarding from "../screens/OnBoarding";
import Home from "../screens/Home";
import { UserIsLogged } from "../store/users";
import AuthNavigation from "./AuthNavigation";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={AuthNavigation} />
    </Stack.Navigator>
  );
}
