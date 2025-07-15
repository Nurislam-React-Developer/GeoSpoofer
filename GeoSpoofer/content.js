(function () {
	// Внедряем скрипт в контекст страницы для максимальной подмены
	const script = document.createElement('script');
	script.textContent = `
        (function() {
            function getCoords(cb) {
                if (window.localStorage && localStorage.__geoSpoofer) {
                    try {
                        const {lat, lng} = JSON.parse(localStorage.__geoSpoofer);
                        cb(lat, lng);
                        return;
                    } catch(e) {}
                }
                cb(51.4183621178467, 172.4604497949204);
            }
            const createFakePosition = (lat, lng) => ({
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
            const fakeGetCurrentPosition = function(success, error, options) {
                getCoords((lat, lng) => {
                    console.log('🌍 Подмена getCurrentPosition');
                    success(createFakePosition(lat, lng));
                });
            };
            const fakeWatchPosition = function(success, error, options) {
                getCoords((lat, lng) => {
                    console.log('🌍 Подмена watchPosition');
                    success(createFakePosition(lat, lng));
                });
                return Math.floor(Math.random() * 1000000);
            };
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition = fakeGetCurrentPosition;
                navigator.geolocation.watchPosition = fakeWatchPosition;
            }
            console.log('🌍 Модуль подмены геолокации успешно загружен');
        })();
    `;
	document.documentElement.appendChild(script);

	// Сохраняем координаты из chrome.storage в localStorage страницы
	// ...existing code...

    // Сохраняем координаты из chrome.storage в localStorage страницы
    function syncCoordsToLocalStorage() {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get(['fakeLat', 'fakeLng'], (result) => {
                const lat = result.fakeLat ?? 51.4183621178467;
                const lng = result.fakeLng ?? 172.4604497949204;
                localStorage.__geoSpoofer = JSON.stringify({ lat, lng });
            });
        }
    }
    syncCoordsToLocalStorage();

    // Следим за изменениями координат в chrome.storage и обновляем localStorage
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local' && (changes.fakeLat || changes.fakeLng)) {
                syncCoordsToLocalStorage();
            }
        });
    }

  })
