import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import styles from "../config/styles";
import { Datepicker } from "@ui-kitten/components";
import { APIuri } from "../config/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";

export default function New({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState({ token: "", user_id: "" });
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [values, setValues] = React.useState({
    firstname: "",
    name: "",
    lastname: "",
    placeOfBirth: "",
    dob: Date(),
    address: "",
    district: "",
    province: "",
    village: "",
    father: "",
    mother: "",
    agent_id: "",
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

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

  const handleSubmit = async () => {
    setLoading(true);
    values.agent_id = user.user_id;
    console.log(values);
    try {
      const new_driver = await fetch(`${APIuri}/drivers/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await new_driver.json();
      console.log(data.data);
      if (new_driver.status === 201) {
        Toast.success("Eregistré avec succès", "left");

        navigation.navigate("AddCar", { driver_id: data.data.id });
      } else {
        console.log(data);
        setLoading(false);
        Toast.error("Une erreur s'est produite, veuillez réessayer", "left");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCHange = (name: string, value: any) => {
    if (name == "dob") {
      setDate(value);
      var year = value.toLocaleString("default", { year: "numeric" });
      var month = value.toLocaleString("default", { month: "2-digit" });
      var day = value.toLocaleString("default", { day: "2-digit" });
      var formattedDate = year + "-" + month + "-" + day;
      setValues({ ...values, dob: formattedDate });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback>
      <Feather name="calendar" size={24} color={colors.lightBlue} />
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <StatusBar
        style="light"
        translucent={false}
        backgroundColor={colors.blue}
      />
      <ToastManager />

      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: colors.blue,
          flexDirection: "row",
          paddingTop: 15,
          paddingBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: colors.white,
            fontFamily: "Bold",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Ajouter un chauffeur
        </Text>
      </View>

      <ScrollView
        style={{ paddingHorizontal: 20, marginTop: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            color: colors.darkGray,
            fontFamily: "Medium",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Renseigner les infos du chauffeur
        </Text>

        <View style={{ marginVertical: 30 }}>
          <Input
            placeholder="Sylvain"
            label="Prénom"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("firstname", e)}
          />
          <Input
            placeholder="Tshiasuma"
            label="Nom"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("name", e)}
          />
          <Input
            placeholder="Kayembe"
            label="Post-nom"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("lastname", e)}
          />
          <Input
            placeholder="Mongala"
            label="Province"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("province", e)}
          />

          <Input
            placeholder="Kinshasa"
            label="Lieu de naissance"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("placeOfBirth", e)}
          />

          <Datepicker
            label="Date de naissance"
            placeholder="Pick Date"
            status="primary"
            size="large"
            date={date}
            min={new Date(1900, 0, 1)}
            style={{
              marginVertical: 5,
              // fontFamily: "Regular",
              borderRadius: 30,
            }}
            onSelect={(nextDate) => handleCHange("dob", nextDate)}
            // onSelect={(nextDate) => console.log(nextDate)}
            accessoryRight={renderIcon}
          />

          <Input
            placeholder="30 AVenue MASANO, Funa, Kinshasa, RDC"
            label="Adresse Physique"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("address", e)}
          />

          <Input
            placeholder="FUNA"
            label="District"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("district", e)}
          />
          <Input
            placeholder="MENKAO"
            label="Village"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("village", e)}
          />
          <Input
            placeholder="Joseph"
            label="Nom du père"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("father", e)}
          />
          <Input
            placeholder="Evelyne"
            label="Nom de la mère"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("mother", e)}
          />

          <View style={{ marginBottom: 20, marginTop: 20, width: width - 40 }}>
            {loading ? (
              <TouchableOpacity
                style={{
                  ...styles.btnBlueLight,
                  width: "100%",
                }}
              >
                <ActivityIndicator
                  color={colors.white}
                  animating={true}
                  size={30}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  ...styles.btnBlue,
                  width: "100%",
                }}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.textBtn}>Enregistrer</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
