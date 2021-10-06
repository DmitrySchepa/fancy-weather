import seasons from '../json/seasons.json';

const setDayTimeAndSeason = () => {
	let currentDayTime = new Date().getHours();
	currentDayTime < 21 && currentDayTime > 6 ?
		currentDayTime = 'day' : currentDayTime = 'night';
	let currentSeason = new Date().getMonth();
	switch(true) {
	case currentSeason >= 0 && currentSeason <=2:
		currentSeason = seasons[0];
		break;
	case currentSeason > 2 && currentSeason <= 5:
		currentSeason = seasons[1];
		break;
	case currentSeason > 5 && currentSeason <= 8:
		currentSeason = seasons[2];
		break;
	case currentSeason > 8 && currentSeason <= 11:
		currentSeason = seasons[3];
		break;
	}

	return {
		currentDayTime, currentSeason
	};
};

export {
	setDayTimeAndSeason
};
