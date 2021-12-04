import { count } from 'console';
import * as fs from 'fs';

const file = fs.readFileSync('./Day_3/inputs.txt');
const logs = file.toString().split('\n');

const oneCounts = new Array(logs[0].length - 1).fill(0);

logs.forEach((value) => {
	for (let i = 0; i < value.length - 1; i++) {
		if (value.charAt(i) === '1') {
			oneCounts[i]++;
		}
	}
});

let gamma = '',
	epsilon = '';

for (let i = 0; i < logs[0].length - 1; i++) {
	if (oneCounts[i] > logs.length / 2) {
		gamma += '1';
		epsilon += '0';
	} else {
		gamma += '0';
		epsilon += '1';
	}
}

const gammaNum = parseInt(gamma, 2);
const epsilonNum = parseInt(epsilon, 2);

console.log(gammaNum * epsilonNum);
