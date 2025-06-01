(function () {
	// Проверяем, что API геолокации доступно
	if (!navigator.geolocation) {
		console.warn('API геолокации недоступно');
		return;
	}

	// Функция для получения фиксированных координат
	function getCoords() {
		return {
			latitude: 51.4183621178467, // Фиксированная широта
			longitude: 172.4604497949204, // Фиксированная долгота
			accuracy: 100,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			speed: null,
		};
	}

	// Подменяем getCurrentPosition
	navigator.geolocation.getCurrentPosition = function (
		success,
		error,
		options
	) {
		const fakePosition = {
			coords: getCoords(),
			timestamp: Date.now(),
		};
		console.log('Подмена getCurrentPosition:', fakePosition.coords);
		success(fakePosition);
	};

	// Подменяем watchPosition
	navigator.geolocation.watchPosition = function (success, error, options) {
		const fakePosition = {
			coords: getCoords(),
			timestamp: Date.now(),
		};
		console.log('Подмена watchPosition:', fakePosition.coords);
		success(fakePosition);
		return 1;
	};

	// Подменяем clearWatch
	navigator.geolocation.clearWatch = function (watchId) {
		console.log('clearWatch вызван, ID:', watchId);
	};

	console.log('Геолокация подменена на фиксированные координаты!');
})();
