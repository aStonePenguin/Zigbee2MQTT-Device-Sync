## Exmaple config for Philips Hue White ambiance smart bulbs

```javascript
{
	// Device to sync settings from
	deviceToWatch: 'IEEE Address of device to sync from',

	// Devices to sync
	devicesToSync: [
		'IEEE Address of device to sync to',
		'IEEE Address of device to sync to',
		'IEEE Address of device to sync to',
	],

	// Settings to sync
	// https://github.com/Koenkk/zigbee-herdsman-converters/blob/master/src/devices/philips.ts
	settingsToSync: [
		'power_on_behavior',
		'color_temp_startup'
	]
},
```