import { setDayTimeAndSeason } from "../markup/setDayTimeAndSeason";

test('setDayTimeAndSeason should return current day time and current season', () => {
	const dayTime = new Date().getHours();
	const month = new Date().getMonth();

	setDayTimeAndSeason(dayTime, month);

	expect(setDayTimeAndSeason()).toStrictEqual({ currentDayTime: 'day', currentSeason: 'summer'});
});
