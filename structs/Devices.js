import { MMKV } from "react-native-mmkv";

export default class Devices {
  /**
   *
   * @returns {Device[]}
   */
  static getAll() {
    const devices = MMKV.getString("devices");

    if (devices) {
      const parsedDevices = JSON.parse(devices);
      const filtered = parsedDevices.filter(
        (dev) => dev?.ip != null && dev?.name != null
      );

      return filtered;
    } else {
      MMKV.set("devices", JSON.stringify([]));
      return [];
    }
  }

  /**
   *
   * @param {Device} device
   */
  static add(device) {
    const devices = this.getAll();

    devices.push({
      ip: device.ip,
      name: device.name,
    });

    MMKV.set("devices", JSON.stringify(devices));
  }

  static remove(i) {
    let devices = this.getAll();

    devices = devices.filter((_, ind) => ind !== i);

    MMKV.set("devices", JSON.stringify(devices));
  }
}

export class Device {
  /**
   *
   * @param {object} device
   * @param {string} device.ip
   * @param {string} device.name
   */
  constructor(device) {
    this.ip = device.ip;
    this.name = device.name;
  }
}
