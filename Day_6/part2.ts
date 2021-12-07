import GetInput from '../Utils/FileInput';

const numDays = 256;

const getLength = (nums: number[]) => {
	let count = 0;
	nums.forEach((num) => (count += num));
	return count;
};

const nums = GetInput('./Day_6/inputs.txt')[0]
	.split(',')
	.map((val) => Number(val));

const fish = new Array(9).fill(0);

nums.forEach((num) => fish[num]++);

let dayCycle = 0;

for (let i = 0; i < numDays; i++) {
	dayCycle = i % fish.length;
	fish[(dayCycle + 7) % fish.length] += fish[dayCycle];
}

console.log(getLength(fish));
