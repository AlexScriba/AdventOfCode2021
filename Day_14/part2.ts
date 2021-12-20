import GetInput from '../Utils/FileInput';

// set up
interface IHash {
	[pattern: string]: string;
}

interface ICounter {
	[pattern: string]: number;
}

const solve = (old_temp: ICounter, insertions: IHash, chars: ICounter, steps: number) => {
	for (let step = 0; step < steps; step++) {
		let new_temp: ICounter = {};

		for (let item in old_temp) {
			let insert = insertions[item];

			let a = item.charAt(0);
			let b = item.charAt(1);
			let value = old_temp[item];

			if (!new_temp[a + insert]) new_temp[a + insert] = 0;
			new_temp[a + insert] += value;

			if (!new_temp[insert + b]) new_temp[insert + b] = 0;
			new_temp[insert + b] += value;

			if (!chars[insert]) chars[insert] = 0;
			chars[insert] += value;
		}

		old_temp = new_temp;
	}

	// get values
	let max = Number.NEGATIVE_INFINITY;
	let min = Number.POSITIVE_INFINITY;

	for (let item in chars) {
		let val = chars[item];
		if (val > max) {
			max = val;
		}

		if (val < min) {
			min = val;
		}
	}

	return max - min;
};

//logic
const lines = GetInput('./Day_14/inputs.txt');

let insertions: IHash = {};
let chars: ICounter = {};
let templateParts: string[] = [];
let template: ICounter = {};

const polymer = lines[0];
for (let i = 0; i < polymer.length - 1; i++) {
	templateParts.push(polymer.slice(i, i + 2));
}

for (let i = 0; i < polymer.length; i++) {
	let char = polymer.charAt(i);
	if (!chars[char]) chars[char] = 0;
	chars[char]++;
}

templateParts.forEach((pair) => {
	if (!template[pair]) template[pair] = 0;

	template[pair]++;
});

for (let i = 2; i < lines.length; i++) {
	let lineParts = lines[i].split(' -> ');
	insertions[lineParts[0]] = lineParts[1];
}

let res = solve(template, insertions, chars, 40);
console.log(res);
