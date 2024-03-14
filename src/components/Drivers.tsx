import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import colors from "../config/colors";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Input } from "@ui-kitten/components";
import { Datepicker, Icon, IconElement, Layout } from "@ui-kitten/components";
import styles from "../config/styles";

export default function Drivers({ navigation }: any) {
  const { width } = useWindowDimensions();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [title, setTitle] = React.useState("Ajouter un chauffeur");
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
    let step = 1;
    step = step + 1;
    step === 2
      ? setTitle("Ajouter un véhicule")
      : setTitle("Ajouter un chauffeur");
  };

  const handleCHange = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback>
      <Feather name="calendar" size={24} color={colors.lightBlue} />
    </TouchableWithoutFeedback>
  );
  return 
  <>
    {title == "Ajouter un chauffeur" ? <Text>BBBB</Text> : <Text>AAAAA</Text>}</>
