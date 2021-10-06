import { getRandomInt } from "./utils";

const getBackGroundImage = async ({ currentDayTime, currentSeason }) => {
	const API_KEY = '7cec681db6c75626ceb32b03faaa9315';
	const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=nature,${currentDayTime},${currentSeason}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;
	try {
		const res = await fetch(URL);
		const { photos: { photo } } = await res.json();
		const withImages = photo.filter((el) => el.url_h);
		const chosenPhotoNum = getRandomInt(withImages.length - 1);
		const chosenPhoto = withImages[chosenPhotoNum].url_h;
		const backgroundUrl = `url(${chosenPhoto})`;

		return backgroundUrl;
	} catch(e) {
		alert('Image can`t be found!');
		return '#FFFFFF';
	}
};

export {
	getBackGroundImage
};
