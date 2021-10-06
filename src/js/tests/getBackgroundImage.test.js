import { expect } from "@jest/globals";
import { getBackGroundImage } from "../getBackGroundImage";

const data = { photos: { photo: [{url_h: 'path_to_photo'}] }};

global.alert = jest.fn();
global.fetch = jest.fn();

test('getBackgroundImage should return path to image background if resolved', async () => {
	global.fetch.mockImplementationOnce(() =>
		Promise.resolve({
			json: () => Promise.resolve(data),
		}));
	const currentDayTime = 'day';
	const currentSeason = 'summer';
	const image = await getBackGroundImage({ currentDayTime, currentSeason });
	const expectedPath = 'url(path_to_photo) no-repeat';

	expect(image).toBe(expectedPath);
});

test('getBackgroundImage should return path to image background if rejected', async () => {
	global.fetch.mockImplementationOnce(() =>
		Promise.reject());

	const currentDayTime = 'day';
	const currentSeason = 'summer';
	const image = await getBackGroundImage({ currentDayTime, currentSeason });
	const expectedPath = '#FFFFFF';

	expect(image).toBe(expectedPath);
});

