import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import styles from "../config/styles";
import { APIuri } from "../config/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const services = ["Quittance", "Certificat", "Patente", "Vignettes"];
export default function HomeScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [user, setUser] = useState({ token: "", user_id: "" });
  const [countStat, setCountStat] = useState({ count_user: 0, count_all: 0 });
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    created_at: "",
    email: "",
    firstname: "",
    id: 0,
    imageUrl: "",
    lastname: "",
    name: "",
    province: "",
    updated_at: "",
    user: "",
    ville: "",
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const getValues = await AsyncStorage.getItem("user");
        const getProfile = await AsyncStorage.getItem("profile");
        setUserProfile(JSON.parse(getProfile?.toString() || "{}"));
        setUser(JSON.parse(getValues?.toString() || "{}"));
      } catch (e) {
        console.log("Error to get data from async storage");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getSavedDrivers = async () => {
      try {
        const records = await fetch(
          `${APIuri}/drivers/get-saved-drivers/${user.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await records.json();

        if (records.status === 200) {
          setDrivers(data.data.slice(0, 3));
          setLoading(false);
        } else {
          alert("erreur de chargement");
        }
      } catch (error) {
        console.error(error);
      }
    };
    const getCount = async () => {
      try {
        const countStat = await fetch(
          `${APIuri}/drivers/get-count/${user.user_id}`
        );
        const dataCount = await countStat.json();

        if (countStat.status === 200) {
          setCountStat(dataCount.data);
        } else {
          alert("erreur de chargement");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSavedDrivers();
    getCount();
  });

  return (
    <SafeAreaView style={css.container}>
      <StatusBar
        style="dark"
        backgroundColor={colors.white}
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <View style={{}}>
            <Text style={{ fontFamily: "Medium" }}>Bienvenu</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 24, color: colors.blue }}
            >
              {userProfile.firstname} {userProfile.lastname}
            </Text>
          </View>
          <View>
            <Image
              source={require("../../assets/img/user.png")}
              style={{
                width: 50,
                height: 50,
              }}
            />
          </View>
        </View>

        <View
          style={{
            width: width - 40,
            height: 150,
            borderRadius: 10,
            backgroundColor: colors.blueSmooth,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 30,
          }}
        >
          <View>
            <Image
              source={require("../../assets/img/logook.png")}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 24,
                color: colors.darkGray,
                textAlign: "center",
              }}
            >
              D.G.R.M.O
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: colors.lightGray,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Direction Générale des
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: colors.lightGray,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Recettes de la Mongala
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Medium", fontSize: 18 }}>Services</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
            <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
              <View
                style={{
                  ...css.serviceCard,
                  width: width - width / 2 - 30,
                  ...styles.setShadowProp,
                }}
              >
                <AntDesign name="paperclip" size={24} color={colors.blue} />
                <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
                  Quittance
                </Text>
              </View>
              <View
                style={{
                  ...css.serviceCard,
                  width: width - width / 2 - 30,
                  ...styles.setShadowProp,
                }}
              >
                <AntDesign name="paperclip" size={24} color={colors.blue} />
                <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
                  Certificat
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View
                style={{
                  ...css.serviceCard,
                  width: width - width / 2 - 30,
                  ...styles.setShadowProp,
                }}
              >
                <AntDesign name="paperclip" size={24} color={colors.blue} />
                <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
                  Vignettes
                </Text>
              </View>
              <View
                style={{
                  ...css.serviceCard,
                  width: width - width / 2 - 30,
                  ...styles.setShadowProp,
                }}
              >
                <AntDesign name="paperclip" size={24} color={colors.blue} />
                <Text style={{ fontFamily: "Bold", fontSize: 16 }}>
                  Patente
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Medium", fontSize: 18 }}>
            Statistiques
          </Text>

          <View
            style={{
              width: width - 40,
              height: 150,
              borderRadius: 10,
              backgroundColor: colors.blue,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",

              padding: 30,
            }}
          >
            <View style={{ flexDirection: "column", gap: -8 }}>
              <Text
                style={{ color: "white", fontFamily: "Medium", fontSize: 16 }}
              >
                Nous comptons :
              </Text>
              <Text
                style={{
                  color: "yellow",
                  fontFamily: "ExtraBold",
                  fontSize: 32,
                }}
              >
                {countStat.count_all}
              </Text>
              <Text style={{ fontFamily: "Regular", color: "white" }}>
                Chaufeurs
              </Text>
              <Text style={{ fontFamily: "Regular", color: "white" }}>
                Enregistrés
              </Text>
            </View>
            <View style={{ flexDirection: "column", gap: -8 }}>
              <Text
                style={{ color: "white", fontFamily: "Medium", fontSize: 16 }}
              >
                Vous avez enregistré :
              </Text>
              <Text
                style={{
                  color: "yellow",
                  fontFamily: "ExtraBold",
                  fontSize: 32,
                }}
              >
                {countStat.count_user}
              </Text>
              <Text style={{ fontFamily: "Regular", color: "white" }}>
                Chaufeurs
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 40 }}>
          <Text style={{ fontFamily: "Medium", fontSize: 18 }}>
            Vos derniers enregistrements
          </Text>

          {loading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={50} color={colors.blue} />
            </View>
          ) : (
            drivers.map((driver: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("DriverDetails", { driver_id: driver.id })
                }
              >
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.blueSmooth,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    padding: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    ...styles.setShadowProp,
                  }}
                >
                  <Image
                    source={require("../../assets/img/user.png")}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
                  <View>
                    <Text style={{ fontFamily: "Bold", fontSize: 18 }}>
                      {driver.firstname} - {driver.lastname}
                    </Text>
                    <Text>Lorem ipsum dolor sit amet,</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  serviceCard: {
    backgroundColor: colors.yellowSmooth,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});
