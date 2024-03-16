import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import styles from "../config/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIuri } from "../config/constant";

export default function List({ navigation }: any) {
  const [user, setUser] = useState({ token: "", user_id: "" });
  const [drivers, setDrivers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getSavedDrivers = async () => {
      try {
        const records = await fetch(
          `${APIuri}/drivers/get-saved-drivers/${user.user_id}`
        );
        const data = await records.json();

        if (records.status === 200) {
          setDrivers(data.data);
          setLoading(false);
        } else {
          alert("erreur de chargement");
          setLoading(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSavedDrivers();
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.white,
        flex: 1,
      }}
    >
      <StatusBar
        style="dark"
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
          Vos enregistrements
        </Text>
      </View>
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={50} color={colors.blue} />
          <Text style={{ fontFamily: "Regular", color: colors.lightGray }}>
            Chargement...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            gap: 15,
            flexDirection: "column",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <Text>Chargement...</Text>
          ) : (
            drivers.map((driver: any, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("DriverDetails", { driver_id: driver.id })
                }
              >
                <View
                  style={{
                    backgroundColor: colors.blueSmooth,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                    padding: 10,
                    marginTop: 15,
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
        </ScrollView>
      )}
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
