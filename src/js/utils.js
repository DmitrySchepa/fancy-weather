const convertCelsToFahr = (tempMode, elements) => {
	if (tempMode === 'fahr') return;

	elements.forEach((el) => {
		let temp = el.innerText;
		temp = Math.trunc(parseInt(temp) * 9 / 5 + 32);
		el.innerText = `${temp}°`;
	});
	tempMode = 'fahr';
	localStorage.setItem('chosenTemp', tempMode);
};

const convertFahrToCels = (tempMode, elements) => {
	if (tempMode === 'celsius') return;

	elements.forEach((el) => {
		let temp = el.innerText;
		temp = Math.round((parseInt(temp) - 32) / 9 * 5);
		el.innerText = `${temp}°`;
	});

	tempMode = 'celsius';
	localStorage.setItem('chosenTemp', tempMode);
};

const convertCoordsToDeegres = (deegreInDec) => {
	const degree = Math.floor(+deegreInDec);
	const minutes = Math.floor((+deegreInDec - degree) * 60);
	return `${degree}°${minutes}'`;
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export {
	convertCelsToFahr,
	convertFahrToCels,
	convertCoordsToDeegres,
	getRandomInt
};
