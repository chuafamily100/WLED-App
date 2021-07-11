import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Navigator from "./navigation/Navigator";
import { NavigationContainer } from "@react-navigation/native";
// import Zeroconf from "react-native-zeroconf";
// const zeroconf = new Zeroconf();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
