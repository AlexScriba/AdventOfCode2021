import GetInput from '../Utils/FileInput';

const lines = GetInput('./Day_14/test.txt');

// set up
interface Rule {
	pattern: string;
	insertion: string;
}

const doIteration = (compound: string, rules: Rule[]) => {
	let str = '';

	for (let i = 0; i < compound.length - 1; i++) {
		str += compound.charAt(i);

		let pattern = compound.slice(i, i + 2);

		for (let j = 0; j < rules.length; j++) {
			if (pattern === rules[j].pattern) {
				str += rules[j].insertion;
				break;
			}
		}
	}

	str += compound.at(-1);

	return str;
};

const doCounts = (compound: string) => {
	const counts: number[] = new Array(26).fill(0);

	for (let i = 0; i < compound.length; i++) {
		let charCode = compound.charCodeAt(i) - 'A'.charCodeAt(0);
		counts[charCode]++;
	}

	return counts;
};

// logic

let compound = lines[0];
let rules: Rule[] = [];

for (let i = 2; i < lines.length; i++) {
	const values = lines[i].split(' -> ');
	rules.push({ pattern: values[0], insertion: values[1] });
}

for (let i = 0; i < 10; i++) {
	compound = doIteration(compound, rules);
	console.log(i);
	console.log(doCounts(compound));
}

const counts = doCounts(compound);

let max = Number.NEGATIVE_INFINITY;
let min = Number.POSITIVE_INFINITY;

counts.forEach((count) => {
	if (count > max) max = count;
	if (count < min && count !== 0) min = count;
});

console.log(max - min);
