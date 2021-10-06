import weatherIcons from '../weatherIcons';

const setThreeDaysForecast = (daysForecast, weekDaysLang, containerElements, infoElements) => {

	containerElements.forEach((elem, ind) => {
		const temp = Math.trunc(daysForecast[ind].main.temp);
		const icon = daysForecast[ind].weather[0].icon;
		const day = new Date(daysForecast[ind + 1].dt_txt).getDay();

		infoElements[ind][0].innerText = weekDaysLang[day];
		infoElements[ind][1].innerText = `${temp}°`;
		infoElements[ind][2].innerHTML = weatherIcons[icon];
	});
};

export {
	setThreeDaysForecast
};
