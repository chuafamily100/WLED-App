import React, { useState, useEffect } from "react";
import { Text, View, Pressable, Alert } from "react-native";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import { Feather } from "@expo/vector-icons";
import Devices, { Device } from "../structs/Devices";
import LightButtonStyles from "../structs/LightButtonStyles";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
// import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

/**
 * @param {object} props
 * @param {Device} props.device
 * @param {number} props.index
 * @param {Function} props.refresh
 */
export default AddLightButton = (props) => {
  const [state, setState] = useState(false);
  const { device, index, refresh } = props;
  const navigator = useNavigation();

  const onLongPress = () => {
    const confirm = () => {
      Devices.remove(index);
      refresh();
    };
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to delete this device?",
      [
        {
          onPress: confirm,
          style: "destructive",
          text: "Delete",
        },
        {
          style: "cancel",
          text: "Cancel",
        },
      ]
    );
  };
  const update = () =>
    axios
      .get(`http://${device.ip}/json/state`)
      .then((res) => setState(res.data.on));

  const toggleState = () =>
    axios
      .post(`http://${device.ip}/json/state`, { on: !state })
      .then(() => setState((s) => !s));

  useEffect(() => {
    update();
  }, []);

  return (
    <View style={LightButtonStyles.constainer}>
      <Pressable
        onLongPress={onLongPress}
        onPress={() => navigator.navigate("Device", { ip: device.ip })}
      >
        <Text style={LightButtonStyles.title}>
          {device.name || "Unknown device"}
        </Text>
        <Text style={LightButtonStyles.ip}>{device.ip || "0"}</Text>
        <TouchableBounce style={LightButtonStyles.icon} onPress={toggleState}>
          <Feather name="power" size={80} color={state ? "green" : "red"} />
        </TouchableBounce>
      </Pressable>
    </View>
  );
};
