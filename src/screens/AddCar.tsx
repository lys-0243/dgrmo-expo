import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { Component, useState } from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { Input } from "@ui-kitten/components";
import styles from "../config/styles";
import { Feather } from "@expo/vector-icons";
import { APIuri } from "../config/constant";

export default function AddCar({ route, navigation }: any) {
  const { driver_id } = route.params;
  const [loading, setLoading] = useState(false);

  const [values, setValues] = React.useState({
    driver_id: driver_id,
    marque: "",
    type_vehicule: "",
    modele: "",
    km: "",
    yearOfFabrication: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    console.log(values);
    try {
      const new_auto = await fetch(`${APIuri}/drivers/add-automobile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await new_auto.json();
      console.log("data", data.data);
      if (new_auto.status === 201) {
        console.log("data", data.data);
        setLoading(false);
        navigation.navigate("List");
      } else {
        console.log(data);
        setLoading(false);
        alert("Une erreur s'est produite, veuillez réessayer plus tard");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const { width } = useWindowDimensions();

  const handleCHange = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

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
        <View>
          <Text
            style={{
              color: colors.white,
              fontFamily: "Bold",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            Ajouter un autombile
          </Text>
          <Text
            style={{
              textAlign: "right",
              fontFamily: "Regular",
              fontSize: 14,
              color: colors.white,
            }}
          >
            Chauffeur enregitré avec succès
          </Text>
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{
            color: colors.darkGray,
            fontFamily: "Medium",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Renseigner les infos du véhicule
        </Text>

        <View style={{ marginVertical: 30 }}>
          <Input
            placeholder="Toyota"
            label="Marque"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("marque", e)}
          />
          <Input
            placeholder="IST, Sorento"
            label="Modèle"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("modele", e)}
          />
          <Input
            placeholder="Moto, Pick-Up"
            label="Type d'automobile"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("type_vehicule", e)}
          />
          <Input
            placeholder="1200"
            label="Kilometrage actuel"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("km", e)}
          />

          <Input
            placeholder="2005"
            label="Année de fabrication"
            status="primary"
            size="large"
            keyboardType="default"
            style={{
              marginVertical: 5,
              fontFamily: "Regular",
              borderRadius: 30,
            }}
            textStyle={{ fontFamily: "Regular" }}
            onChangeText={(e) => handleCHange("yearOfFabrication", e)}
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

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
