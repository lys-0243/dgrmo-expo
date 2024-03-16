import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../config/colors";
import styles, { width } from "../config/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function User({ navigation }: any) {
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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const getValues = await AsyncStorage.getItem("profile");
        setUserProfile(JSON.parse(getValues?.toString() || "{}"));
      } catch (e) {
        console.log("Error to get data from async storage");
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const keys = ["user", "saved_data", "profile"];
    await AsyncStorage.multiRemove(keys);
    navigation.navigate("Logout");
  };

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
        <ActivityIndicator color={colors.primary} animating={true} size={60} />
      </View>
    );
  return (
    <SafeAreaView style={css.container}>
      <StatusBar
        style="light"
        translucent={false}
        backgroundColor={colors.blue}
      />
      <View
        style={{
          paddingVertical: 30,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
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
      <ScrollView style={{ marginTop: 30 }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Prenom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.firstname}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Nom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.name}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Postnom</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.lastname}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Email</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.email}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Province</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.province}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: "Bold", fontSize: 18 }}>Ville</Text>
            <Text
              style={{ fontFamily: "Bold", fontSize: 18, color: colors.blue }}
            >
              {userProfile.ville}
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 80, marginTop: 20, width: width - 40 }}>
          <TouchableOpacity
            style={{
              ...styles.btnRedShort,
              width: "100%",
            }}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textBtn}>Deconnecter</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
});
