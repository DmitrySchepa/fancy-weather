import { translateCity } from '../translateCity';

const data = {translations:[{text: 'Minsk,Belarus'}]};
global.alert = jest.fn();
global.fetch = jest.fn();

test('translateCity should return translated city and country elements if resolved', async () => {
	global.fetch.mockImplementationOnce(() =>
		Promise.resolve({
			json: () => Promise.resolve(data),
		}));

	const city = 'Минск';
	const country = 'Беларусь';
	const chosenLang = 'en';
	const cityElement = document.createElement('span');
	const countryElement = document.createElement('span');
	const [cityEl , countryEl] = await translateCity(city, country, chosenLang, cityElement, countryElement);
	expect(countryEl.innerText).toBe('Belarus');
	expect(cityEl.innerText).toBe('Minsk,');
});

test('translateCity should return translated city and country elements if rejected', async () => {
	global.fetch.mockImplementationOnce(() =>
		Promise.reject());

	const city = 'Минск';
	const country = 'Беларусь';
	const chosenLang = 'en';
	const cityElement = document.createElement('span');
	const countryElement = document.createElement('span');
	await translateCity(city, country, chosenLang, cityElement, countryElement);
	expect(global.alert).toHaveBeenCalledWith('There is no such translation you are looking for!');
});
