# Zigbee2MQTT Device Sync:
This is a simple extension for Zigbee2MQTT to sync setting/s from one device to other device/s.

## Warning:
This script does absolutely no validation beyond what you put in the config. You can mess up your device settings or worse burn your house down if you fail to understand what settings you're modifying.

You've been warned. See [`LICENSE`](https://github.com/aStonePenguin/Zigbee2MQTT-Device-Sync/blob/main/LICENSE)


## Setup:
- Pick a device you'd like to sync settings from and locate the IEEE Address.
- Pick the devices you'd like to sync the settings to and locate their IEEE Addresses.
- Choose which settings you'd like to sync.
- Edit the configs at the top of [`device_sync.js`](https://github.com/aStonePenguin/Zigbee2MQTT-Device-Sync/blob/main/device_sync.js)
- Add your modified file under the extensions tab in Zigbee2MQTT.

Some example configs are located in the [`examples`](https://github.com/aStonePenguin/Zigbee2MQTT-Device-Sync/blob/main/examples) folder. They may not contain all settings, be up to date or safe to use for your particular application.