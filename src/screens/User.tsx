import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import styles, { width } from "../config/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User({ navigation }: any) {
  const handleSubmit = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Logout");
  };
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
      <View style={{ marginBottom: 80, marginTop: 20, width: width - 40 }}>
        <TouchableOpacity
          style={{
            ...styles.btnBlue,
            width: "100%",
          }}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.textBtn}>Deconnecter</Text>
        </TouchableOpacity>
      </View>
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
