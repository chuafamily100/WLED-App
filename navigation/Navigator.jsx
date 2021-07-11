import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Discover from "../screens/Discover";
import WebView from "../screens/WebView";

export default Navigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="discovery"
        options={{ headerTitle: "Discover Devices" }}
        component={Discover}
      />
      <Stack.Screen name="Device" component={WebView} />
    </Stack.Navigator>
  );
};
