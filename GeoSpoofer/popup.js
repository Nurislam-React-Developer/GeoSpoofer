// Показываем текущие координаты и автозаполняем поля
chrome.storage.local.get(['fakeLat', 'fakeLng'], (result) => {
	const lat = result.fakeLat ?? 51.4183621178467;
	const lng = result.fakeLng ?? 172.4604497949204;
	document.getElementById('current').textContent = `${lat}, ${lng}`;
	document.getElementById('lat').value = lat;
	document.getElementById('lng').value = lng;
});

document.getElementById('save').addEventListener('click', () => {
	const lat = parseFloat(document.getElementById('lat').value);
	const lng = parseFloat(document.getElementById('lng').value);
	chrome.storage.local.set({ fakeLat: lat, fakeLng: lng }, () => {
		document.getElementById('current').textContent = `${lat}, ${lng}`;
		alert('Координаты сохранены!');
	});
});

const citySelect = document.getElementById('city');
const latInput = document.getElementById('lat');
const lngInput = document.getElementById('lng');
const currentSpan = document.getElementById('current');

// Список городов и координат
const cities = {
	'51.4183621178467,172.4604497949204': 'Тихий океан',
	'-75.250973,-0.071389': 'Антарктида',
	'51.5074,-0.1278': 'Лондон',
	'48.8566,2.3522': 'Париж',
	'40.7128,-74.0060': 'Нью-Йорк',
	'35.6895,139.6917': 'Токио',
	'55.7558,37.6176': 'Москва',
	'-33.8688,151.2093': 'Сидней',
};

function updateInputsFromSelect() {
	const [lat, lng] = citySelect.value.split(',').map(Number);
	latInput.value = lat;
	lngInput.value = lng;
}

citySelect.addEventListener('change', updateInputsFromSelect);

// Загрузка текущих координат из chrome.storage
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
	chrome.storage.local.get(['fakeLat', 'fakeLng'], (result) => {
		const lat = result.fakeLat ?? 51.4183621178467;
		const lng = result.fakeLng ?? 172.4604497949204;
		currentSpan.textContent = `${lat}, ${lng}`;
		latInput.value = lat;
		lngInput.value = lng;
		// Устанавливаем select на нужный город
		for (const key of Object.keys(cities)) {
			if (
				Math.abs(Number(key.split(',')[0]) - lat) < 0.0001 &&
				Math.abs(Number(key.split(',')[1]) - lng) < 0.0001
			) {
				citySelect.value = key;
				break;
			}
		}
	});
}

// Создаём кастомное уведомление
function showModal(message) {
	let modal = document.getElementById('geospoofer-modal');
	if (!modal) {
		modal = document.createElement('div');
		modal.id = 'geospoofer-modal';
		modal.style.position = 'fixed';
		modal.style.left = '50%';
		modal.style.top = '50%';
		modal.style.transform = 'translate(-50%, -50%)';
		modal.style.background = '#fff';
		modal.style.border = '1px solid #1976d2';
		modal.style.borderRadius = '8px';
		modal.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
		modal.style.padding = '18px 28px';
		modal.style.zIndex = '9999';
		modal.style.fontSize = '1.1em';
		modal.style.color = '#1976d2';
		document.body.appendChild(modal);
	}
	modal.textContent = message;
	modal.style.display = 'block';
	setTimeout(() => {
		modal.style.display = 'none';
		window.close();
	}, 3000);
}

document.getElementById('save').addEventListener('click', () => {
	const lat = parseFloat(latInput.value);
	const lng = parseFloat(lngInput.value);
	if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
		chrome.storage.local.set({ fakeLat: lat, fakeLng: lng }, () => {
			currentSpan.textContent = `${lat}, ${lng}`;
			showModal('Координаты сохранены!');
		});
	}
});

// При выборе города сразу обновлять поля
updateInputsFromSelect();
