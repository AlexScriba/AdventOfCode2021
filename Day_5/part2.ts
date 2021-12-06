import { linkSync } from 'fs';
import GetInput from '../Utils/FileInput';

const strings = GetInput('./Day_5/inputs.txt');

const GetNums = (line: string) => {
	const parts = line.split(' ');

	const point1 = parts[0].split(',').map((val) => Number(val));
	const point2 = parts[2].split(',').map((val) => Number(val));

	return [...point1, ...point2];
};

const printMap = (board: number[][], size: number) => {
	// let outStr = '';
	// board.forEach((row) => {
	// 	row.forEach((num) => {
	// 		outStr += num;
	// 	});
	// 	outStr += '\n';
	// });
	// console.log(outStr);

	let outStr = '';
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			outStr += map[j][i];
		}
		outStr += '\n';
	}

	console.log(outStr);
};

const lines = strings.map((val) => GetNums(val));

const mapSize = 1000;

const map: number[][] = [];
for (let i = 0; i < mapSize; i++) {
	map.push(new Array(mapSize).fill(0));
}

//fill in points
lines.forEach((line) => {
	if (line[0] === line[2]) {
		let lower = Math.min(line[1], line[3]);
		let upper = Math.max(line[1], line[3]);

		for (let i = lower; i <= upper; i++) {
			map[line[0]][i]++;
		}
	} else if (line[1] === line[3]) {
		let lower = Math.min(line[0], line[2]);
		let upper = Math.max(line[0], line[2]);

		for (let i = lower; i <= upper; i++) {
			map[i][line[1]]++;
		}
	} else {
		let point1 = [line[0], line[1]];
		let point2 = [line[2], line[3]];

		let lowerX = point1[0] < point2[0] ? point1 : point2;
		let upperX = point1[0] < point2[0] ? point2 : point1;

		let dif = Math.abs(lowerX[1] - upperX[1]);

		if (lowerX[1] < upperX[1]) {
			for (let i = 0; i <= dif; i++) {
				map[lowerX[0] + i][lowerX[1] + i]++;
			}
		} else {
			for (let i = 0; i <= dif; i++) {
				map[lowerX[0] + i][lowerX[1] - i]++;
			}
		}
	}
});

if (mapSize < 30) printMap(map, mapSize);

let count = 0;
for (let i = 0; i < mapSize; i++) {
	for (let j = 0; j < mapSize; j++) {
		if (map[i][j] >= 2) {
			count++;
		}
	}
}

console.log(count);
