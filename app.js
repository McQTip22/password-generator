const amountRange = document.getElementById('amountRange');
const amountNumber = document.getElementById('amountNumber');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('generator');
const display = document.getElementById('display');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
	.concat(arrayFromLowToHigh(58, 64))
	.concat(arrayFromLowToHigh(91, 96))
	.concat(arrayFromLowToHigh(123, 126));

amountNumber.addEventListener('input', syncCharacterAmount);
amountRange.addEventListener('input', syncCharacterAmount);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const characterAmount = amountNumber.value;
	const includeUppercase = includeUppercaseElement.checked;
	const includeNumbers = includeNumbersElement.checked;
	const includeSymbols = includeSymbolsElement.checked;
	const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
	display.innerText = password;
});

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
	let charCodes = LOWERCASE_CHAR_CODES;
	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
	if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
	if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

	const passwordCharacters = [];
	for (let i = 0; i < characterAmount; i++) {
		const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
		passwordCharacters.push(String.fromCharCode(characterCode));
	}
	return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {
	const array = [];
	for (let i = low; i <= high; i++) {
		array.push(i);
	}
	return array;
}

function syncCharacterAmount(e) {
	const value = e.target.value;
	amountNumber.value = value;
	amountRange.value = value;
}
