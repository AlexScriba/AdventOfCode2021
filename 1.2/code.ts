import * as fs from 'fs';

const file = fs.readFileSync('./1.2/inputs.txt', 'utf-8');

const numStrings = file.toString().split('\n');
const nums = numStrings.map((val) => Number(val));

let count = 0;
for (let i = 0; i < nums.length - 3; i++) {
	if (nums[i] + nums[i + 1] + nums[i + 2] < nums[i + 1] + nums[i + 2] + nums[i + 3]) {
		count++;
	}
}

console.log(count);
