import { stringify } from 'querystring';
import GetInput from '../Utils/FileInput';

const input = GetInput('./Day_8/inputs.txt');

// 1,2 4,4 7,3 8,7

const sumUp = (nums: number[]) => {
	let sum = 0;

	nums.forEach((val) => (sum += val));
	return sum;
};

const charToIndex = (c: string) => {
	return c.charCodeAt(0) - 'a'.charCodeAt(0);
};

const contains = (str: string, num: number) => {
	for (let i = 0; i < str.length; i++) {
		if (num === charToIndex(str.charAt(i))) return true;
	}

	return false;
};

const translate = (c: string, translateTable: string[]) => {
	const index = charToIndex(c);
	return translateTable[index];
};

const translateString = (str: string, translateTable: string[]) => {
	let final = '';
	for (let i = 0; i < str.length; i++) {
		final += translate(str.charAt(i), translateTable);
	}
	return final;
};

const translateToNumber = (str: string) => {
	const numbers = [
		'abcefg',
		'cf',
		'acdeg',
		'acdfg',
		'bcdf',
		'abdfg',
		'abdefg',
		'acf',
		'abcdefg',
		'abcdfg',
	];

	let ordered = '';
	str.split('')
		.sort()
		.forEach((letter) => (ordered += letter));

	for (let i = 0; i < numbers.length; i++) {
		if (ordered === numbers[i]) {
			return i;
		}
	}

	return -1;
};

const getTranslateTable = (numbers: string[]) => {
	const translateTableStr = new Array(7).fill('');
	const charCount = new Array(7).fill(0);

	const AorC: number[] = [];
	const DorG: number[] = [];

	const one = numbers.filter((num) => num.length === 2)[0];
	const four = numbers.filter((num) => num.length === 4)[0];

	numbers.forEach((num) => {
		for (let i = 0; i < num.length; i++) {
			charCount[charToIndex(num.charAt(i))]++;
		}
	});

	charCount.forEach((count, index) => {
		if (count === 6) {
			translateTableStr[index] = 'b';
		} else if (count === 4) {
			translateTableStr[index] = 'e';
		} else if (count === 9) {
			translateTableStr[index] = 'f';
		} else if (count === 8) {
			AorC.push(index);
		} else if (count === 7) {
			DorG.push(index);
		}
	});

	if (contains(one, AorC[0])) {
		translateTableStr[AorC[0]] = 'c';
		translateTableStr[AorC[1]] = 'a';
	} else {
		translateTableStr[AorC[0]] = 'a';
		translateTableStr[AorC[1]] = 'c';
	}

	if (contains(four, DorG[0])) {
		translateTableStr[DorG[0]] = 'd';
		translateTableStr[DorG[1]] = 'g';
	} else {
		translateTableStr[DorG[0]] = 'g';
		translateTableStr[DorG[1]] = 'd';
	}

	return translateTableStr;
};

const perLine = (line: string) => {
	let [numberString, readingString] = line.split('|');

	const numbers = numberString.trim().split(' ');
	const readings = readingString.trim().split(' ');

	const translateTable = getTranslateTable(numbers);

	let total = 0;
	let index = 3;
	readings.forEach((str) => {
		const correct = translateString(str, translateTable);
		const num = translateToNumber(correct);

		total += num * 10 ** index--;
	});

	return total;
};

let total = 0;

for (let i = 0; i < input.length; i++) {
	total += perLine(input[i]);
}

console.log(total);
