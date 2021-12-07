import GetInput from '../Utils/FileInput';

const strings = GetInput('./Day_5/test.txt');

const GetNums = (line: string) => {
	const parts = line.split(' ');

	const point1 = parts[0].split(',').map((val) => Number(val));
	const point2 = parts[2].split(',').map((val) => Number(val));

	return [...point1, ...point2];
};

const printMap = (board: number[][]) => {
	let outStr = '';
	board.forEach((row) => {
		row.forEach((num) => {
			outStr += num;
		});
		outStr += '\n';
	});
	console.log(outStr);
};

const lines = strings.map((val) => GetNums(val));

const mapSize = 10;

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
	}
});

printMap(map);

let count = 0;
for (let i = 0; i < mapSize; i++) {
	for (let j = 0; j < mapSize; j++) {
		if (map[i][j] >= 2) {
			count++;
		}
	}
}

console.log(count);
