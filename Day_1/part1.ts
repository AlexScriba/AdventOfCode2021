import * as fs from 'fs';

const file = fs.readFileSync('./1/inputs.txt', 'utf-8');

const numberStrings: string[] = file.toString().split('\n');

const numbers: number[] = numberStrings.map((num) => {
	return Number(num);
});

let count = 0;

for (let i = 0; i < numbers.length - 1; i++) {
	if (numbers[i] < numbers[i + 1]) {
		count++;
	}
}

console.log(count);
