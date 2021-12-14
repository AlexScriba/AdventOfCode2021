import GetInput from '../Utils/FileInput';

const lines = GetInput('./Day_13/inputs.txt');

enum Axis {
	x = 0,
	y = 1,
	error,
}

interface Fold {
	axis: Axis;
	value: number;
}

const charToAxis = (ch: string) => {
	switch (ch) {
		case 'x':
			return Axis.x;
		case 'y':
			return Axis.y;
		default:
			return Axis.error;
	}
};

const printPositions = (positions: number[][]) => {
	positions.forEach((line) => {
		let str = '';
		line.forEach((val) => (str += val + ' '));
		console.log(str);
	});
};

const printMap = (map: string[][]) => {
	map.forEach((line) => {
		let str = '';
		line.forEach((val) => (str += val));
		console.log(str);
	});
};

const fold = (f: Fold) => {
	if (f.axis === Axis.error) {
		console.error('Error in axis enum');
	} else {
		for (let i = 0; i < positions.length; i++) {
			const val = positions[i][f.axis];

			if (val <= f.value) continue;

			const dist = Math.abs(val - f.value);
			positions[i][f.axis] = f.value - dist;
		}
	}
};

// format data

let index = 0;
const positions: number[][] = [];

while (lines[index] !== '') {
	positions.push(lines[index].split(',').map(Number));
	index++;
}

index++;
const folds: Fold[] = [];

while (index < lines.length) {
	let str: string[] = lines[index].split(' ');
	let values = str[str.length - 1].split('=');
	folds.push({ axis: charToAxis(values[0]), value: Number(values[1]) });

	index++;
}

folds.forEach(fold);

// remove duplicates
const s: number[][] = [];

positions.forEach((pos) => {
	let found = false;
	for (let i = 0; i < s.length; i++) {
		if (s[i][0] === pos[0] && s[i][1] === pos[1]) {
			found = true;
			break;
		}
	}

	if (!found) {
		s.push(pos);
	}
});

console.log(s.length);

// see result
const map: string[][] = [];
const sizeX = 100;
const sizeY = 10;

for (let i = 0; i < sizeY; i++) {
	map.push(new Array(sizeX).fill('.'));
}

s.forEach((pos) => {
	map[pos[1]][pos[0]] = '#';
});

printMap(map);
