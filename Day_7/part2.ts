import GetInput from '../Utils/FileInput';

const getFuel = (dist: number) => {
	return (dist * (dist + 1)) / 2;
};

let maxPos = 0;

const positions = GetInput('./Day_7/inputs.txt')[0]
	.split(',')
	.map((val) => {
		const num = Number(val);
		if (num > maxPos) {
			maxPos = num;
		}
		return num;
	});

let bestPos = 0;
let bestFuel = Number.MAX_VALUE;

for (let i = 0; i <= maxPos; i++) {
	let totalFuel = 0;

	positions.forEach((pos) => {
		let dist = Math.abs(pos - i);
		totalFuel += getFuel(dist);
	});

	if (totalFuel < bestFuel) {
		bestFuel = totalFuel;
		bestPos = i;
	}
}

console.log(bestFuel, bestPos);
