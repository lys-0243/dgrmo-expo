import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function User() {
  return (
    <View style={css.container}>
      <Text
        style={{ fontFamily: "Bold", fontSize: 40, color: colors.lightBlue }}
      >
        Le Profil
      </Text>
      <Text style={{ fontFamily: "Bold", fontSize: 40, color: colors.blue }}>
        de l'Agent
      </Text>
      <Text
        style={{
          fontFamily: "Regular",
          fontSize: 18,
          color: colors.darkGray,
          textAlign: "center",
        }}
      >
        On va permettre à l'agent de voir ses informations
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
