import * as fs from 'fs';

const file = fs.readFileSync('./Day_2/inputs.txt');
const instructions = file.toString().split('\n');

const ExecuteInstruction = (instruction: string, distance: number, depth: number, aim: number) => {
	let dist = distance;
	let dep = depth;
	let a = aim;

	let [inst, amount] = instruction.split(' ');

	switch (inst) {
		case 'up':
			a -= Number(amount);
			break;
		case 'down':
			a += Number(amount);
			break;
		case 'forward':
			dist += Number(amount);
			dep += Number(amount) * a;
			break;
	}

	return [dist, dep, a];
};

let distance = 0,
	depth = 0,
	aim = 0;

instructions.forEach((value) => {
	[distance, depth, aim] = ExecuteInstruction(value, distance, depth, aim);
});

console.log(distance * depth);
