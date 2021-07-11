import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import LightButton from "../components/LightButton";
import Devices from "../structs/Devices";

export default HomeScreen = ({ navigation }) => {
  const [devices, setDevices] = useState([]);

  const load = () => setDevices(Devices.getAll());

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setDevices(Devices.getAll());
      load();
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Feather
          name="plus-circle"
          size={24}
          color="black"
          style={{ padding: 10 }}
          onPress={() => navigation.navigate("discovery")}
        />
      ),
    });
  }, [navigation]);

  return (
    // <View style={styles.container}>
    <ScrollView>
      {devices.map((device, i) => (
        <LightButton device={device} key={i} index={i} refresh={load} />
      ))}
      {devices.length == 0 && (
        <Button
          title="Discover devices"
          onPress={() => navigation.navigate("discovery")}
        />
      )}
    </ScrollView>
    /* </View> */
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
