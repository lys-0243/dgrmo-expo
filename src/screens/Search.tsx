import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function Search() {
  return (
    <View style={css.container}>
      <Text
        style={{ fontFamily: "Bold", fontSize: 40, color: colors.lightBlue }}
      >
        Page de
      </Text>
      <Text style={{ fontFamily: "Bold", fontSize: 40, color: colors.blue }}>
        Recherches
      </Text>
      <Text
        style={{
          fontFamily: "Regular",
          fontSize: 18,
          color: colors.darkGray,
          textAlign: "center",
          paddingHorizontal: 40,
        }}
      >
        On peut rechercher un chauffeur ou un véhicule
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
