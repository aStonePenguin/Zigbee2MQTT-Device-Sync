const Configs = [
	// See the examples folder

	// Config 1, for example smart bulbs
	{
		// Device to sync settings from
		deviceToWatch: 'IEEE Address of device to sync from',

		// Devices to sync
		devicesToSync: [
			'IEEE Address of device to sync to',
			'IEEE Address of device to sync to',
			'IEEE Address of device to sync to',
		],

		// Setting/s to sync
		settingsToSync: [
			'name of setting (must be exact spelling, case sensitive)'
		],
	},


	// Config 2, delete me or add more!
	{
		// Device to sync settings from
		deviceToWatch: 'IEEE Address of device to sync from',

		// Devices to sync
		devicesToSync: [
			'IEEE Address of device to sync to',
			'IEEE Address of device to sync to',
			'IEEE Address of device to sync to',
		],

		// Setting/s to sync
		settingsToSync: [
			'name of setting (must be exact spelling, case sensitive)'
		],
	},
];


/*
	Don't edit below this line if you don't know what you're doing. If you want...
*/
class DeviceSync {
	constructor(
		zigbee,
		mqtt,
		state,
		publishEntityState,
		eventBus,
		enableDisableExtension,
		restartCallback,
		addExtension,
		settings,
		logger,
	) {
		this.zigbee = zigbee;
		this.mqtt = mqtt;
		this.state = state;
		this.publishEntityState = publishEntityState;
		this.eventBus = eventBus;
		this.enableDisableExtension = enableDisableExtension;
		this.restartCallback = restartCallback;
		this.addExtension = addExtension;
		this.settings = settings;
		this.logger = logger;

		this.logger.info('[DeviceSync] Loaded!');
		this.mqttBaseTopic = this.settings.get().mqtt.base_topic;
	}

	start() {
		this.eventBus.onStateChange(this, this.onStateChange.bind(this));
	}

	stop() {
		this.eventBus.removeListeners(this);
	}

	async onStateChange(data) {
		const { entity, update } = data;

		for (const config of Configs) {
			if (entity.ID === config.deviceToWatch) {
				const newUpdate = {};

				for (const key in update)
					if (config.settingsToSync.includes(key))
						newUpdate[key] = update[key];

				if (Object.keys(newUpdate).length > 0)
					this.syncState(config, JSON.stringify(newUpdate));
			}
		}
	}

	syncState(config, update) {
		this.logger.info(`[DeviceSync] Syncing variables from ${config.deviceToWatch}: ${update}`);

		for (const entityId of config.devicesToSync)
		{
			this.logger.info(`[DeviceSync] Syncing state from ${config.deviceToWatch} to ${entityId}`);

			this.mqtt.onMessage(`${this.mqttBaseTopic}/${entityId}/set`, update);
		}
	}
}

// eslint-disable-next-line no-undef
module.exports = DeviceSync;
