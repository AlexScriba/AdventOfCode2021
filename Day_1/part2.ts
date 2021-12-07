import GetInput from '../Utils/FileInput';

const numStrings = GetInput('./Day_1/inputs.txt');
const nums = numStrings.map((val) => Number(val));

let count = 0;
for (let i = 0; i < nums.length - 3; i++) {
	if (nums[i] + nums[i + 1] + nums[i + 2] < nums[i + 1] + nums[i + 2] + nums[i + 3]) {
		count++;
	}
}

console.log(count);
