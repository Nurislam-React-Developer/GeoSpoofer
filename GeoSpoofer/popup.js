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
