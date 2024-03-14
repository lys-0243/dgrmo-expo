import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import { UserIsLogged } from "../store/users";
import AuthNavigation from "./AuthNavigation";

export default function Router() {
  const isLogged = UserIsLogged();
  return (
    <NavigationContainer>
      {isLogged ? <AuthNavigation /> : <AppNavigation />}
      {/* {isLogged ? <AppNavigation /> : <AuthNavigation />} */}
    </NavigationContainer>
  );
}
