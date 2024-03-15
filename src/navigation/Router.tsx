import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import { UserIsLogged } from "../store/users";
import AuthNavigation from "./AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Router() {
  const isLogged = UserIsLogged();
  const [user, setUser] = useState({ token: "", user_id: "" });
  useEffect(() => {
    const getData = async () => {
      try {
        const getValues = await AsyncStorage.getItem("user");
        setUser(JSON.parse(getValues?.toString() || "{}"));
      } catch (e) {
        console.log("Error to get data from async storage");
      }
    };
    getData();
  }, []);
  return (
    <NavigationContainer>
      {user.token ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
}
