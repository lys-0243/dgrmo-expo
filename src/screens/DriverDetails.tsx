import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  useWindowDimensions,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import { Feather } from "@expo/vector-icons";
import { APIuri } from "../config/constant";
import styles from "../config/styles";

export default function DriverDetails({ route, navigation }: any) {
  const { driver_id } = route.params;
  const { width } = useWindowDimensions();
  const [autombiles, setAutomobiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [driverProfile, setDriverProfile] = useState({
    address: "",
    district: "",
    dob: "",
    father: "",
    firstname: "",
    id: "",
    imageUrl: "",
    lastname: "",
    mother: "",
    name: "",
    placeOfBirth: "",
    province: "",
    village: "",
  });

  useEffect(() => {
    const getSavedDrivers = async () => {
      try {
        const driverProfile = await fetch(
          `${APIuri}/drivers/get-driver/${driver_id}`
        );
        const driverAutos = await fetch(
          `${APIuri}/drivers/get-driver-autos/${driver_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await driverProfile.json();
        const autoData = await driverAutos.json();

        if (driverProfile.status === 200) {
          setDriverProfile(data.data);
          if (driverAutos.status === 200) {
            setAutomobiles(autoData.data);
          }
        } else {
          alert("erreur de chargement");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSavedDrivers();
  }, []);

  const handleSubmit = async () => {
    navigation.navigate("AddCar", {
      driver_id: driver_id,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
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
        <Text
          style={{
            color: colors.white,
            fontFamily: "Bold",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          Détails du chauffeur
        </Text>
      </View>

      <View
        style={{
          paddingVertical: 30,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.blue,
          width: width,
          flexDirection: "column",
        }}
      >
        <Text
          style={{ fontFamily: "Medium", color: colors.white, fontSize: 16 }}
        >
          Profil
        </Text>
        <Image
          //   source={{ uri: driverProfile.imageUrl }}
          source={require("../../assets/img/user.png")}
          style={{
            width: 100,
            height: 100,
            borderColor: colors.lightBlue,
            borderWidth: 2,
            borderRadius: 999,
          }}
        />
      </View>

      <ScrollView
        style={{ marginTop: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Prenom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.firstname}
            </Text>
          </View>

          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Nom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.name}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Postnom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.lastname}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
              Date de naissance
            </Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.dob}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
              Lieu de naissance
            </Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.placeOfBirth}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Province</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.province}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Village</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.village}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Adresse</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.address}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>District</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.district}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
              Nom du père
            </Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.father}
            </Text>
          </View>
          <View
            style={{
              ...css.line,
              width: width - 40,
            }}
          ></View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
              Nom de la mère
            </Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {driverProfile.mother}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.lightGray40,
            paddingHorizontal: 20,
            marginTop: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontFamily: "Regular", fontSize: 18 }}>
            Ses automobiles
          </Text>

          <View>
            {autombiles.map((driver: any, index: number) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.lightBlue,
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Marque : {driver.marque}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Modèle : {driver.modele}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Année : {driver.yearOfFabrication}
                  </Text>
                  <Text
                    style={{ fontFamily: "Bold", fontSize: 16, color: "white" }}
                  >
                    Matricule : {driver.matricule}
                  </Text>
                </View>
              </View>
            ))}

            <View
              style={{ marginBottom: 20, marginTop: 20, width: width - 40 }}
            >
              <TouchableOpacity
                style={{
                  ...styles.btnDark,
                  width: "100%",
                }}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.textBtn}>Ajouter un automobile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const css = StyleSheet.create({
  line: {
    backgroundColor: colors.lightGray40,
    height: 1,
    marginVertical: 6,
  },
});
