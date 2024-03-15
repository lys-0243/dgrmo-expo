import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

export default class AddCar extends Component {
  render() {
    return (
      <View style={css.container}>
        <Text>AddCar</Text>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
