import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./AuthNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";

export default function Router() {
  const [user, setUser] = useState({ token: "", user_id: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const getValues = await AsyncStorage.getItem("user");
        setUser(JSON.parse(getValues?.toString() || "{}"));
        setLoading(false);
      } catch (e) {
        console.log("Error to get data from async storage");
      }
    };
    getData();
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={colors.primary} animating={true} size={60} />
      </View>
    );
  return (
    <NavigationContainer>
      {user.token ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
}
