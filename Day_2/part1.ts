import * as fs from 'fs';

const file = fs.readFileSync('./2.1/inputs.txt');
const instructions = file.toString().split('\n');

const ExecuteInstruction = (instruction: string, distance: number, depth: number) => {
	let dist = distance;
	let dep = depth;

	const [inst, amount] = instruction.split(' ');

	switch (inst) {
		case 'forward':
			dist += Number(amount);
			break;
		case 'up':
			dep -= Number(amount);
			break;
		case 'down':
			dep += Number(amount);
			break;
	}

	return [dist, dep];
};

let distance = 0;
let depth = 0;

console.log(distance * depth);
