import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const getMap = (longitude, latitude) => {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJ5c2NoZXBhIiwiYSI6ImNrczFyeDJnbjFmZmwycG85dmJxYXIxdngifQ.M-HQ0-turcNeMhrSkZx--w';
	const map = new mapboxgl.Map({
		container: 'map', // container ID
		style: 'mapbox://styles/mapbox/streets-v11', // style URL
		center: [longitude, latitude], // starting position [lng, lat]
		zoom: 9 // starting zoom
	});
	const marker = new mapboxgl.Marker({
		draggable: true
	}).setLngLat([longitude, latitude])
		.addTo(map);
};

export {
	getMap
};
