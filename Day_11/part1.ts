import GetInput from '../Utils/FileInput';

//input
const lines = GetInput('./Day_11/inputs.txt');

const map = lines.map((line) => line.split('').map((val) => Number(val)));

interface Point {
	x: number;
	y: number;
}

const flashes: Point[] = [];

const printMap = (map: number[][]) => {
	map.forEach((line) => {
		let str = '';
		line.forEach((val) => (str += val));
		console.log(str);
	});
};

// Increments all values by 1
const increment = () => {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			map[i][j]++;
		}
	}
};

// Checks for flashes
const flash = () => {
	let count = 0;

	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			if (map[i][j] > 9) {
				map[i][j] = -1000;
				flashes.push({ x: j, y: i });
				spreadTheLove(i, j);
				count++;
			}
		}
	}

	return count;
};

// changes all flashed to 0
const clearFlashes = () => {
	flashes.forEach((point) => {
		map[point.y][point.x] = 0;
	});

	flashes.length = 0;
};

// increases neighbors
const spreadTheLove = (r: number, c: number) => {
	const maxY = map.length;
	const maxX = map[0].length;

	const top = r + 1 < maxY;
	const bottom = r - 1 >= 0;
	const right = c + 1 < maxX;
	const left = c - 1 >= 0;

	if (top) map[r + 1][c]++;

	if (bottom) map[r - 1][c]++;

	if (left) map[r][c - 1]++;

	if (right) map[r][c + 1]++;

	if (top && right) map[r + 1][c + 1]++;

	if (top && left) map[r + 1][c - 1]++;

	if (bottom && right) map[r - 1][c + 1]++;

	if (bottom && left) map[r - 1][c - 1]++;
};

let total = 0;

for (let iter = 0; iter < 100; iter++) {
	increment();

	let done = false;
	while (!done) {
		const val = flash();
		done = val === 0;
		total += val;
	}

	clearFlashes();
}

console.log(total);
