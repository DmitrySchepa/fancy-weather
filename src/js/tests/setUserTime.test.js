import {setSearchedTime, setUserLocalTime} from '../markup/setUserTime';

beforeAll(() => {
	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(2021, 8, 1));
});

afterAll(() => {
	jest.useRealTimers();
});

test('setSearchedTime should set searched time to element\'s inner text', () => {
	const timezone = 32400;
	const node = document.createElement('div');
	setSearchedTime({ timezone }, node);
	expect(node.innerText).toBe('07:00:00');
});

test('setUserLocalTime should set user local time to element\'s inner text', () => {
	const node = document.createElement('div');
	setUserLocalTime(node);
	expect(node.innerText).toBe('00:00:00');
});
