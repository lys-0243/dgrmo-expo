import {
  View,
  Text,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { Input } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import styles from "../config/styles";
import { Datepicker, Icon, IconElement, Layout } from "@ui-kitten/components";

const CalendarIcon = (props: any): IconElement => (
  <Icon {...props} name="calendar" />
);

export default function New({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [values, setValues] = React.useState({
    firstname: "",
    name: "",
    lastname: "",
    place: "",
    date: Date(),
    address: "",
    district: "",
    village: "",
    father: "",
    mother: "",
  });
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = () => {
    alert("Enregistré");
  };

  const handleCHange = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
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

      <View
        style={{
          paddingHorizontal: 20,
          height: 150,
          backgroundColor: colors.blue,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.white} />
        </TouchableWithoutFeedback>
        <Text
          style={{
            color: colors.yellow,
            fontFamily: "Black",
            textAlign: "center",
            fontSize: 40,
          }}
        >
          Ajouter un chauffeur
        </Text>
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
            onChangeText={(e) => handleCHange("place", e)}
          />

          <Datepicker
            label="Date de naissance"
            placeholder="Pick Date"
            status="primary"
            size="large"
            date={date}
            style={{
              marginVertical: 5,
              // fontFamily: "Regular",
              borderRadius: 30,
            }}
            onSelect={(nextDate) => handleCHange("date", nextDate)}
            // onSelect={(nextDate) => setDate(nextDate)}
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

          <View style={{ marginBottom: 80, marginTop: 20, width: width - 40 }}>
            <TouchableOpacity
              style={{
                ...styles.btnBlue,
                width: "100%",
              }}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textBtn}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
