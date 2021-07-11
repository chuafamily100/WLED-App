import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import Zeroconf from "react-native-zeroconf";
import AddLightButton from "../components/AddLightButton";
const zeroconf = new Zeroconf();

export default DiscoverScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const scan = () => {
    if (isLoading) {
      return;
    }
    setServices([]);

    zeroconf.scan("http");

    setTimeout(() => {
      zeroconf.stop();
    }, 5000);
  };

  useEffect(() => {
    zeroconf.on("start", () => {
      setLoading(true);
      console.log("[Start]");
    });

    zeroconf.on("stop", () => {
      setLoading(false);
      console.log("[Stop]");
    });

    zeroconf.on("resolved", (service) => {
      console.log("[Resolve]", JSON.stringify(service, null, 2));

      setServices((a) => [...a, service]);
    });

    zeroconf.on("error", (err) => {
      // this.setState({ isScanning: false });
      setLoading(false);
      console.log("[Error]", err);
    });

    scan();

    return () => {
      zeroconf.removeAllListeners("start");
      zeroconf.removeAllListeners("stop");
      zeroconf.removeAllListeners("resolved");
      zeroconf.removeAllListeners("error");
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={scan} />
        }
        style={{ width: "100%" }}
      >
        {services.map((service, i) => (
          <AddLightButton
            key={i}
            service={service}
            onPress={() =>
              navigation.navigate("Device", { ip: service.addresses[0] })
            }
          />
        ))}
      </ScrollView>
    </View>
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
