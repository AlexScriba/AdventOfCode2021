import { POINT_CONVERSION_HYBRID } from 'constants';
import GetInput from '../Utils/FileInput';

const inputs = GetInput('./Day_9/inputs.txt');

interface HeightPoint {
	height: number;
	visited: boolean;
}

interface Point {
	x: number;
	y: number;
}

const map = inputs.map((line) => {
	return line
		.trim()
		.split('')
		.map((val) => {
			const point: HeightPoint = {
				height: Number(val),
				visited: false,
			};
			return point;
		});
});

let score = 0;

const FindAll = (map: HeightPoint[][], startPos: Point): number => {
	if (
		startPos.x >= map[0].length ||
		startPos.x < 0 ||
		startPos.y >= map.length ||
		startPos.y < 0 ||
		map[startPos.y][startPos.x].visited
	) {
		return 0;
	}

	map[startPos.y][startPos.x].visited = true;

	if (map[startPos.y][startPos.x].height == 9) {
		return 0;
	}

	let count = 0;

	//check up
	count += FindAll(map, { x: startPos.x + 1, y: startPos.y });

	//check down
	count += FindAll(map, { x: startPos.x - 1, y: startPos.y });

	//check right
	count += FindAll(map, { x: startPos.x, y: startPos.y + 1 });

	//check left
	count += FindAll(map, { x: startPos.x, y: startPos.y - 1 });

	return count + 1;
};

const basons: number[] = [];

for (let r = 0; r < map.length; r++) {
	for (let c = 0; c < map[0].length; c++) {
		let top = r - 1 < 0 ? Number.MAX_VALUE : map[r - 1][c].height;
		let bottom = r + 1 >= map.length ? Number.MAX_VALUE : map[r + 1][c].height;
		let right = c + 1 >= map[r].length ? Number.MAX_VALUE : map[r][c + 1].height;
		let left = c - 1 < 0 ? Number.MAX_VALUE : map[r][c - 1].height;

		let point = map[r][c];

		if (
			point.height < top &&
			point.height < bottom &&
			point.height < left &&
			point.height < right
		) {
			// is minimum
			// score += point.height + 1;
			basons.push(FindAll(map, { x: c, y: r }));
		}
	}
}

basons.sort((a: number, b: number) => b - a);

let total = 1;

for (let i = 0; i < 3; i++) {
	total *= basons[i];
}

console.log(total);
