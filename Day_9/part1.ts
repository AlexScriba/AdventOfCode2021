import GetInput from '../Utils/FileInput';

const inputs = GetInput('./Day_9/inputs.txt');

const map = inputs.map((line) => {
	return line
		.trim()
		.split('')
		.map((val) => Number(val));
});

let scores = 0;

for (let r = 0; r < map.length; r++) {
	for (let c = 0; c < map[0].length; c++) {
		let top = r - 1 < 0 ? Number.MAX_VALUE : map[r - 1][c];
		let bottom = r + 1 >= map.length ? Number.MAX_VALUE : map[r + 1][c];
		let right = c + 1 >= map[r].length ? Number.MAX_VALUE : map[r][c + 1];
		let left = c - 1 < 0 ? Number.MAX_VALUE : map[r][c - 1];

		let val = map[r][c];

		if (val < top && val < bottom && val < left && val < right) {
			scores += val + 1;
		}
	}
}

console.log(scores);
