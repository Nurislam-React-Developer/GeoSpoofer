(function () {
	const overrideGeo = (lat, lng) => {
		const createFakePosition = () => ({
			coords: {
				latitude: lat,
				longitude: lng,
				accuracy: 100,
				altitude: null,
				altitudeAccuracy: null,
				heading: null,
				speed: null,
			},
			timestamp: Date.now(),
		});

		navigator.geolocation.getCurrentPosition = function (success) {
			console.log('🌍 Подмена getCurrentPosition');
			success(createFakePosition());
		};

		navigator.geolocation.watchPosition = function (success) {
			console.log('🌍 Подмена watchPosition');
			success(createFakePosition());
			return Math.floor(Math.random() * 1000000);
		};
	};

	chrome.storage.local.get(['fakeLat', 'fakeLng'], (result) => {
		const lat = result.fakeLat ?? 51.4183;
		const lng = result.fakeLng ?? 172.4604;
		overrideGeo(lat, lng);
	});
})();
