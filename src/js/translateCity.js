const translateCity = async (city, country, chosenLang, cityElement, countryElement) => {
	const DEEPL_API_KEY = '70783e65-0f4e-a4e0-8eae-381d52834dc6';
	try {
		const res = await fetch(`https://api-free.deepl.com/v2/translate?auth_key=${DEEPL_API_KEY}%3Afx&text=${city},${country}&target_lang=${chosenLang}&split_sentences=0`);
		const data = await res.json();
		const elems = data.translations[0].text.split(',');

		if (elems[1] === 'Poland' && chosenLang === 'pl') elems[1] = 'Polska';
		cityElement.innerText = `${elems[0]},`;
		countryElement.innerText = `${elems[1]}`;
		return [
			cityElement,
			countryElement
		];
	} catch(e) {
		alert('There is no such translation you are looking for!');
	}
};

export {
	translateCity
};
