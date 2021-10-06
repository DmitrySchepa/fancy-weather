import weatherIcons from './weatherIcons';
import COUNTRIES_CODES from './json/countriesCodes.json';
import weekDays from './json/weekDays.json';
import months from './json/months.json';
import weekDaysShortcut from './json/weekDaysShortcut.json';
import { translations } from './translations.js';
import { setThreeDaysForecast } from './markup/setThreeDaysForecast';
import {
	convertCelsToFahr,
	convertFahrToCels,
	convertCoordsToDeegres
} from './utils.js';
import { setSearchedTime, setUserLocalTime } from './markup/setUserTime';
import { getBackGroundImage } from './getBackGroundImage';
import { translateCity } from './translateCity';
import { getMap } from './map';
import { setDayTimeAndSeason } from './markup/setDayTimeAndSeason';

const refreshImgElement = document.querySelector('.refresh');
const currentCityElement = document.querySelector('.city');
const currentCountryElement = document.querySelector('.country');
const currentDegreeElement = document.querySelector('.degree');
const feelsLikeValueElement = document.querySelector('.feels-like');
const windValueElement = document.querySelector('.wind');
const humidityValueElement = document.querySelector('.humidity');
const inputSearchElement = document.querySelector('.input_search');
const searchButtonElement = document.querySelector('.search_button');
const currWeatherIconElement = document.querySelector('.current_weather_icon');
const currentLatitudeElement = document.querySelector('.lat');
const currentLongitudeElement = document.querySelector('.long');
const currentFlagElement = document.querySelector('.flag');
const currentTimeElement = document.querySelector('.time');
const currentDateElement = document.querySelector('.date');
const threeDaysForecastElements = document.querySelectorAll('.three_days');
const degreeElements = document.querySelectorAll('.degree');
const celsiusRadiobtnElement = document.querySelector('#celsius');
const fahrenheitRadiobtnElement = document.querySelector('#fahrenheit');
const tempModeElement = document.querySelector('.temp_mode');
const firstDayElements = document.querySelectorAll('.weather_item_1');
const secondDayElements = document.querySelectorAll('.weather_item_2');
const thirdDayElements = document.querySelectorAll('.weather_item_3');
const forecastInfoElements = [firstDayElements, secondDayElements, thirdDayElements];
const languageOptionElements = document.querySelectorAll('option');
const elementsForTranslation = document.querySelectorAll('[data-i18n]');
const selectElement = document.querySelector('.languages');
const helpElement = document.querySelector('.help');
const body = document.body;
const dayAndSeason = setDayTimeAndSeason();

if (!localStorage.getItem('chosenLang')) localStorage.setItem('chosenLang', 'en');
let currentLang = localStorage.getItem('chosenLang');

if (!localStorage.getItem('chosenTemp')) localStorage.setItem('chosenTemp', 'celsius');
let currentTempMode = localStorage.getItem('chosenTemp') || 'celsius';

const translatePage = (lang) => {
	elementsForTranslation.forEach((element) => {
		element.textContent = translations[element.dataset.i18n][lang];
	});
	inputSearchElement.placeholder = translations[inputSearchElement.dataset.i18n][lang];
};

languageOptionElements.forEach((elem) => {
	elem.selected = false;
	if (currentLang  === elem.value) {
		elem.selected = true;
	}
});

inputSearchElement.addEventListener('keypress', async ({ key }) => {
	if (key === 'Enter') {
		currentLang = localStorage.getItem('chosenLang');
		let value = inputSearchElement.value;
		const city = `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
		localStorage.setItem('searchedLocation', city);

		getGeocoding(city, currentLang);
		getThreeDaysForecast(city, currentLang);
		const background = await getBackGroundImage(dayAndSeason);
		body.style.background = background;
		body.style.backgroundSize = 'cover';
		inputSearchElement.value = '';
	}
});

searchButtonElement.addEventListener('click', async () => {
	let value = inputSearchElement.value;
	const city = `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;

	getGeocoding(value, currentLang);
	getThreeDaysForecast(value, currentLang);
	localStorage.setItem('searchedLocation', city);
	inputSearchElement.value = '';
	const background = await getBackGroundImage(dayAndSeason);
	body.style.background = background;
	body.style.backgroundSize = 'cover';
});

const getThreeDaysForecast = (city, chosenLang) => {
	const units = currentTempMode === 'celsius' ? 'metric' : 'imperial';
	const apiKey = '4f944554e6c6126e0412c0c72c3dfa72';
	fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=${apiKey}`)
		.then((res) => res.json())
		.then((data) => {
			const fiveDaysInfo = data.list.filter((el, ind) => ind % 8 === 0);
			setThreeDaysForecast(fiveDaysInfo,
				weekDays[`weekDays${chosenLang.toUpperCase()}`],
				threeDaysForecastElements,
				forecastInfoElements
			);
		})
		.catch((error) => console.log(`Try another city because of ${error}`));
};

const getCurrentWeatherInfo = (latitude, longitude, lang) => {
	const units = currentTempMode === 'celsius' ? 'metric' : 'imperial';
	const apiKey = '4f944554e6c6126e0412c0c72c3dfa72';
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			setIcon(data.weather[0].icon);
			setCurrentWeatherInfo(data,
				weekDaysShortcut[`weekDaysShortcut${lang.toUpperCase()}`],
				months[`months${lang.toUpperCase()}`]
			);
		})
		.catch(() => alert('There is no such location you are looking for!'));
};

const getSearchedWeatherInfo = (latitude, longitude, lang) => {
	const units = currentTempMode === 'celsius' ? 'metric' : 'imperial';
	const apiKey = '4f944554e6c6126e0412c0c72c3dfa72';
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${apiKey}`)
		.then((response) => response.json())
		.then((data) => {
			setIcon(data.weather[0].icon);
			setCurrentWeatherInfo(data,
				weekDaysShortcut[`weekDaysShortcut${lang.toUpperCase()}`],
				months[`months${lang.toUpperCase()}`]
			);
			setSearchedTime(data, currentTimeElement);
			clearInterval(userTime);
			userTime = setInterval(() => setSearchedTime(data, currentTimeElement), 10000);
		})
		.catch((error) => alert('There is no such location you are looking for!'));
};


const getCurrentIp = (chosenLang) => {
	const API_KEY = 'fe4f313b900125';
	const ipInfoUrl = `https://ipinfo.io/json?token=${API_KEY}`;
	fetch(ipInfoUrl)
		.then((response) => {
			return response.json();
		})
		.then(async (data) => {
			const coords = data.loc.split(',');
			const latitude = coords[0];
			const longitude = coords[1];
			getCurrentWeatherInfo(latitude, longitude, chosenLang);
			getMap(longitude, latitude);
			setCoordsInnerText(longitude, latitude);
			translateCity(
				data.city,
				COUNTRIES_CODES[data.country],
				chosenLang,
				currentCityElement,
				currentCountryElement
			);
			localStorage.setItem('userLocation', data.city);
			localStorage.setItem('searchedLocation', data.city);
			getThreeDaysForecast(data.city, chosenLang);
			translatePage(chosenLang);
			const background = await getBackGroundImage(dayAndSeason);
			body.style.background = background;
			body.style.backgroundSize = 'cover';
		})
		.catch(() => alert('There is no such location you are looking for!'));
};


const setCoordsInnerText = (longitude, latitude) => {
	currentLongitudeElement.innerText = convertCoordsToDeegres(longitude);
	currentLatitudeElement.innerText = convertCoordsToDeegres(latitude);
};

const setIcon = (icon) => {
	currWeatherIconElement.innerHTML = weatherIcons[icon];
};

const setCurrentWeatherInfo = ({ dt, main: { temp, feels_like, humidity }, sys, timezone, weather, wind }, chosenDayShortcutLang, chosenMonthLang) => {
	const curWeekDayShortcut = chosenDayShortcutLang[new Date((dt + timezone) * 1000).getDay()];
	const curDateShortcut = new Date((dt + timezone) * 1000).getDate();
	const curMonth = chosenMonthLang[new Date(dt * 1000).getMonth()];
	const countryShortcut = sys.country.toLowerCase();
	currentDateElement.innerText = `${curWeekDayShortcut} ${curDateShortcut} ${curMonth}`;
	currentFlagElement.src = `https://www.countryflags.io/${countryShortcut}/shiny/64.png`;
	currentDegreeElement.innerText = Math.trunc(temp) + '°';
	feelsLikeValueElement.innerText = Math.trunc(feels_like) + '°';
	windValueElement.innerText = `${Math.trunc(wind.speed)}`;
	humidityValueElement.innerText = `${humidity}%`;
	if (localStorage.getItem('chosenTemp') === 'fahr') {
		fahrenheitRadiobtnElement.checked = true;
	} else {
		celsiusRadiobtnElement.checked = true;
	}
};

const getGeocoding = (city, chosenLang) => {
	const API_KEY = '1befc3bcb7b245968b554a8c5cbb50e6';
	fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}&lang=${chosenLang}&pretty=1&no_annotations=1`)
		.then((res) => res.json())
		.then((data) => {
			const latitude = data.results[0].geometry.lat;
			const longitude = data.results[0].geometry.lng;
			const searchedCity = data.results[0].formatted.split(',')[0];
			const searchedCountry = data.results[0].components.country;
			localStorage.setItem('searchedLocation', searchedCity);
 			getSearchedWeatherInfo(latitude, longitude, chosenLang);
			getMap(longitude, latitude);
			translateCity(
				searchedCity,
				searchedCountry,
				chosenLang,
				currentCityElement,
				currentCountryElement
			);
			translatePage(chosenLang);
		})
		.catch(() => alert(`There is no such location ${city}, you are looking for!`));
};

setUserLocalTime(currentTimeElement);
let userTime = setInterval(() => setUserLocalTime(currentTimeElement), 5000);

tempModeElement.addEventListener('click', () => {
	let tempMode = localStorage.getItem('chosenTemp');
	if (celsiusRadiobtnElement.checked) {
		convertFahrToCels(tempMode, degreeElements);
	} else  if (fahrenheitRadiobtnElement.checked) {
		convertCelsToFahr(tempMode, degreeElements);
	}
});

refreshImgElement.addEventListener('click', async (e) => {
	e.preventDefault();
	const background = await getBackGroundImage(dayAndSeason);
	body.style.background = background;
	body.style.backgroundSize = 'cover';
});

// SPEECH-RECOGNITION

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
const speechElement = document.querySelector('.speech'); // +
recognition.interimResults = true;
recognition.addEventListener('result', async ({ results }) => {
	const transcription = Array.from(results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');
	const message = new SpeechSynthesisUtterance();
	message.lang = 'en-US';
	message.volume = 0.5;
	if (results[0].isFinal) {
		switch(transcription) {
		case 'weather':
			message.text = `It is ${currentDegreeElement.textContent} in ${currentCityElement.textContent} today`;
			window.speechSynthesis.speak(message);
			break;
		case 'louder':
			message.volume += 0.1;
			break;
		case 'quieter':
			message.volume -= 0.1;
			break;
		default:
			getGeocoding(transcription, currentLang);
			getThreeDaysForecast(transcription, currentLang);
			const background = await getBackGroundImage(dayAndSeason);
			body.style.background = background;
			body.style.backgroundSize = '100% 100%';
		}
	}
});
speechElement.addEventListener('click', () => {
	recognition.start();
});

speechElement.addEventListener('mouseover', () => {
	helpElement.style.display = 'initial';
});

speechElement.addEventListener('mouseout', () => {
	helpElement.style.display = 'none';
});

// SELECT LANGUAGES

selectElement.addEventListener('change', ({ target }) => {
	const curCity = localStorage.getItem('userLocation');
	const searchedCity = localStorage.getItem('searchedLocation');
	localStorage.setItem('chosenLang', target.value);

	curCity === searchedCity ? getCurrentIp(target.value) : getGeocoding(searchedCity, target.value);
	getThreeDaysForecast(currentCityElement.innerText, target.value);
});

getCurrentIp(currentLang);
