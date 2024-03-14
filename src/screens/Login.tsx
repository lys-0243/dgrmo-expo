import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import { Icon, IconElement, Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import styles from "../config/styles";
import { UserIsLogged, users } from "../store/users";

export default function Login({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      UserIsLogged(true);
      navigation.navigate("Home");
    } else {
      alert("Email ou mot de passe incorrect");
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
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
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
    </SafeAreaView>
  );
}
