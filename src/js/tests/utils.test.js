import { convertCelsToFahr, convertFahrToCels, convertCoordsToDeegres } from '../utils';

describe('utils', () => {
	it('convertCelsToFahr', () => {
		const elements = Array.from({ length: 5 }, (v) => {
			const div = document.createElement('div');
			div.innerText = '5';
			return div;
		});

		convertCelsToFahr('fahr', elements);

		elements.forEach((el) => {
			expect(el.innerText).toBe('5');
		});

		convertCelsToFahr('celsius', elements);

		elements.forEach((el) => {
			expect(el.innerText).toBe("41°");
		});
	});

	it('convertFahrToCels', () => {
		const elements = Array.from({ length: 5 }, (v) => {
			const div = document.createElement('div');
			div.innerText = '55';
			return div;
		});

		convertFahrToCels('celsius', elements);

		elements.forEach((el) => {
			expect(el.innerText).toBe('55');
		});

		convertFahrToCels('fahr', elements);

		elements.forEach((el) => {
			expect(el.innerText).toBe("13°");
		});
	});

	it('convertCoordsToDegrees', () => {

		convertCoordsToDeegres('35.5');
		expect(convertCoordsToDeegres('35.5')).toBe("35°30'");
	});

});
