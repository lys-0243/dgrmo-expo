import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../config/styles";
import colors from "../config/colors";

export default function OnBoarding({ navigation }: any) {
  const { width } = useWindowDimensions();
  return (
    <ImageBackground
      source={require("../../assets/img/splash.jpg")}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />

      <View style={{}}>
        <Image
          source={require("../../assets/img/logo.png")}
          style={{
            width: width - 50,
            height: width - 50,
            marginTop: 50,
            alignSelf: "center",
          }}
        />
      </View>

      <View style={{ ...css.container }}>
        <Text
          style={{
            color: colors.darkGray,
            fontFamily: "Regular",
            textAlign: "center",
            fontSize: 24,
            lineHeight: 39,
            marginTop: 20,
            marginBottom: -20,
          }}
        >
          Province de la
        </Text>
        <Text
          style={{
            color: colors.blue,
            fontFamily: "Black",
            textAlign: "center",
            fontSize: 50,
          }}
        >
          MONGALA
        </Text>

        <Text
          style={{
            color: colors.darkGray,
            fontFamily: "Regular",
            textAlign: "center",
            fontSize: 13,
            marginBottom: 40,
          }}
        >
          Collecte de données, stockage sécurisé, analyse, génération de
          rapports et diffusion des données au public.
        </Text>

        <View style={{ marginBottom: 50, width: width - 40 }}>
          <TouchableOpacity
            style={{
              ...styles.btnBlue,
              width: "100%",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textBtn}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
});
