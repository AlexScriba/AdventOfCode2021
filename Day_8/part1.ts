import GetInput from '../Utils/FileInput';

const input = GetInput('./Day_8/inputs.txt');

const counts = new Array(9).fill(0);

// 1,2 4,4 7,3 8,7

const sumUp = (nums: number[]) => {
	let sum = 0;

	nums.forEach((val) => (sum += val));
	return sum;
};

const perLine = (line: string) => {
	let [numberString, readingString] = line.split('|');

	const numbers = numberString.trim().split(' ');
	const readings = readingString.trim().split(' ');

	// console.log(readings);

	readings.forEach((number) => {
		if (number.length === 2) {
			counts[0]++;
		} else if (number.length === 4) {
			counts[3]++;
		} else if (number.length === 3) {
			counts[6]++;
		} else if (number.length === 7) {
			counts[7]++;
		} else {
			// console.log(number);
		}
	});
};

input.forEach((line) => perLine(line));

// console.log(counts);

console.log(sumUp(counts));
