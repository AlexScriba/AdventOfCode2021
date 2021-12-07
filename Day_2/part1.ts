import GetInput from '../Utils/FileInput';

const instructions = GetInput('./Day_2/inputs.txt');

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

instructions.forEach((instruction) => {
	[distance, depth] = ExecuteInstruction(instruction, distance, depth);
});

console.log(distance * depth);
