import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import { Icon, IconElement, Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import styles from "../config/styles";
import { APIuri } from "../config/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = await fetch(`${APIuri}/account/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await user.json();
      if (user.status === 200) {
        const profile = await fetch(
          `${APIuri}/account/get-profile/${data.data.user_id}`
        );
        const records = await fetch(
          `${APIuri}/drivers/get-saved-drivers/${data.data.user_id}`
        );

        const profile_data = await profile.json();
        const records_data = await records.json();

        try {
          const userDataToJson = JSON.stringify(data.data);
          const profileDataToJson = JSON.stringify(profile_data.data);
          const recordsDataToJson = JSON.stringify(records_data.data);
          await AsyncStorage.setItem("saved_data", recordsDataToJson);
          await AsyncStorage.setItem("user", userDataToJson);
          await AsyncStorage.setItem("profile", profileDataToJson);
        } catch (e) {}
        setLoading(false);
        navigation.navigate("Home");
      } else alert("Email ou mot de passe incorrect");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCHange = (name: string, value: string) => {
    if (name === "email") {
      setValues({ ...values, [name]: value.toLocaleLowerCase() });
    } else setValues({ ...values, [name]: value });
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Feather
        name={secureTextEntry ? "eye-off" : "eye"}
        size={24}
        color={colors.lightGray}
      />
    </TouchableWithoutFeedback>
  );
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
        <ActivityIndicator color={colors.blue} animating={true} size={60} />
        <Text style={{ fontFamily: "Medium" }}>Connexion en cours...</Text>
      </View>
    );
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <StatusBar style="auto" />
      <ScrollView
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Image
            source={require("../../assets/img/logook.png")}
            style={{
              width: 80,
              height: 80,
              marginTop: 50,
              alignSelf: "center",
            }}
          />
          <Text
            style={{
              color: colors.darkGray,
              fontFamily: "Black",
              textAlign: "center",
              fontSize: 40,
            }}
          >
            Se connecter
          </Text>

          <View style={{ marginVertical: 30, gap: 12 }}>
            <Input
              placeholder="ex : email@gmail.com"
              label="Adresse e-mail"
              status="primary"
              size="large"
              keyboardType="email-address"
              style={{
                marginVertical: 10,
                fontFamily: "Regular",
                borderRadius: 30,
              }}
              textStyle={{ fontFamily: "Regular" }}
              onChangeText={(e) => handleCHange("email", e)}
            />
            <Input
              placeholder="Tapez votre mot de passe"
              keyboardType="default"
              textStyle={{ fontFamily: "Regular" }}
              size="large"
              label={"Mot de passe"}
              style={{
                marginVertical: 10,
                fontFamily: "Regular",
                borderRadius: 30,
              }}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(e) => handleCHange("password", e)}
            />

            <View style={{ marginBottom: 50, width: width - 40 }}>
              <TouchableOpacity
                style={{
                  ...styles.btnBlue,
                  width: "100%",
                }}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.textBtn}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ ...css.imageBottom }}>
          <Image
            source={require("../../assets/img/login.png")}
            style={{
              width: width,
              height: 350,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const css = StyleSheet.create({
  imageBottom: {
    // position: "absolute",
    // top: 0,
    // paddingHorizontal: 20,
  },
});
