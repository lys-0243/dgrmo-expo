import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function HomeScreen() {
  return (
    <View style={css.container}>
      <Text
        style={{ fontFamily: "Bold", fontSize: 40, color: colors.lightBlue }}
      >
        La Grande Page
      </Text>
      <Text style={{ fontFamily: "Bold", fontSize: 40, color: colors.blue }}>
        d'accueil
      </Text>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
