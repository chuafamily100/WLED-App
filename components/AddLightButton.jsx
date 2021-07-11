import React, { useState } from "react";
import { Text, View } from "react-native";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import { Feather } from "@expo/vector-icons";
import Devices, { Device } from "../structs/Devices";
import LightButtonStyles from "../structs/LightButtonStyles";

export default AddLightButton = ({ service }) => {
  const [added, setAdded] = useState(false);

  const onPlusPress = () => {
    setAdded(true);
    Devices.add(new Device({ ip: service.addresses[0], name: service.name }));
  };

  return (
    <View style={LightButtonStyles.constainer}>
      <Text style={LightButtonStyles.title}>
        {service.name || "Unknown device"}
      </Text>
      <Text style={LightButtonStyles.ip}>{service.addresses[0] || "0"}</Text>
      {added ? (
        <Feather
          name="check-circle"
          size={80}
          color="black"
          style={LightButtonStyles.icon}
        />
      ) : (
        <TouchableBounce onPress={onPlusPress} style={LightButtonStyles.icon}>
          <Feather name="plus-circle" size={80} color="black" />
        </TouchableBounce>
      )}
    </View>
  );
};
