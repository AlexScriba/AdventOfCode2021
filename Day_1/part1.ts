import GetInput from '../Utils/FileInput';

const numberStrings = GetInput('./Day_1/inputs.txt');

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
