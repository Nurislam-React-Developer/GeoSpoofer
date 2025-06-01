// Фиксированные координаты
const FAKE_LATITUDE = 51.4183621178467;
const FAKE_LONGITUDE = 172.4604497949204;

// Создаем поддельный объект Position
const createFakePosition = () => {
	return {
		coords: {
			latitude: FAKE_LATITUDE,
			longitude: FAKE_LONGITUDE,
			accuracy: 100,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			speed: null,
		},
		timestamp: Date.now(),
	};
};

// Подмена getCurrentPosition
const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
navigator.geolocation.getCurrentPosition = function (
	successCallback,
	errorCallback,
	options
) {
	console.log('🌍 Подмена геолокации активирована: getCurrentPosition');
	successCallback(createFakePosition());
};

// Подмена watchPosition
const originalWatchPosition = navigator.geolocation.watchPosition;
navigator.geolocation.watchPosition = function (
	successCallback,
	errorCallback,
	options
) {
	console.log('🌍 Подмена геолокации активирована: watchPosition');
	// Вызываем callback сразу с поддельными данными
	successCallback(createFakePosition());
	// Возвращаем фиктивный ID для watchPosition
	return Math.floor(Math.random() * 1000000);
};

console.log('🌍 Модуль подмены геолокации успешно загружен');

// content.js (Firefox)
(function() {
  const script = document.createElement('script');
  script.textContent = `
      // Фиксированные координаты
      const FAKE_LATITUDE = 51.4183621178467;
      const FAKE_LONGITUDE = 172.4604497949204;

      // Создаем поддельный объект Position
      const createFakePosition = () => ({
          coords: {
              latitude: FAKE_LATITUDE,
              longitude: FAKE_LONGITUDE,
              accuracy: 100,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
          },
          timestamp: Date.now(),
      });

      // Подмена getCurrentPosition
      const originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;
      navigator.geolocation.getCurrentPosition = function(successCallback, errorCallback, options) {
          console.log('🌍 Подмена геолокации активирована: getCurrentPosition');
          successCallback(createFakePosition());
      };

      // Подмена watchPosition
      const originalWatchPosition = navigator.geolocation.watchPosition;
      navigator.geolocation.watchPosition = function(successCallback, errorCallback, options) {
          console.log('🌍 Подмена геолокации активирована: watchPosition');
          successCallback(createFakePosition());
          return Math.floor(Math.random() * 1000000);
      };

      console.log('🌍 Модуль подмены геолокации успешно загружен');
  `;
  document.documentElement.appendChild(script);
})();