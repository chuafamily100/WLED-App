import { Text } from "react-native";
import React from "react";
import { WebView as WebViewExpo } from "react-native-webview";

export default WebView = ({ route }) => {
  const { ip } = route.params;
  return <WebViewExpo source={{ uri: `http://${ip}` }} />;
};
