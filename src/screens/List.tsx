import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../config/colors";

export default function List() {
  return (
    <View style={css.container}>
      <Text
        style={{ fontFamily: "Bold", fontSize: 40, color: colors.lightBlue }}
      >
        Liste des
      </Text>
      <Text style={{ fontFamily: "Bold", fontSize: 40, color: colors.blue }}>
        enregistrement
      </Text>
      <Text
        style={{
          fontFamily: "Regular",
          fontSize: 18,
          color: colors.darkGray,
          textAlign: "center",
        }}
      >
        Ici on va afficher la liste des personnes que l'agent a enregistrer
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
