const setSearchedTime = ({ timezone }, nodeElement) => {
	let minutes = new Date().getMinutes();
	minutes < 10 ? minutes = `0${minutes}` : minutes;
	let hours = new Date().getUTCHours() + timezone / 3600;
	hours >= 24 ? hours = hours - 24 : hours;
	hours < 10 ? hours = `0${hours}` : hours;
	let seconds = new Date().getUTCSeconds();
	seconds < 10 ? seconds = `0${seconds}` : seconds;
	nodeElement.innerText = `${hours}:${minutes}:${seconds}`;
};

const setUserLocalTime = (nodeElement) => {
	let minutes = new Date().getMinutes();
	minutes < 10 ? minutes = `0${minutes}` : minutes;
	let hours = new Date().getHours();
	hours < 10 ? hours = `0${hours}` : hours;
	let seconds = new Date().getSeconds();
	seconds < 10 ? seconds = `0${seconds}` : seconds;
	nodeElement.innerText = `${hours}:${minutes}:${seconds}`;
};

export {
	setSearchedTime,
	setUserLocalTime
};
