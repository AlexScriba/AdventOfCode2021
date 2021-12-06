import * as fs from 'fs';
import Board from './Board';

const file = fs.readFileSync('./Day_4/inputs.txt');
const lines = file.toString().split('\n');

const boardDimension = 5;

// set up number inputs
let numIndex = 0;
const numbers = lines[0].split(',').map((val) => Number(val));

// set up boards

const boards: Board[] = [];

let lineIndex = 2;
while (lineIndex < lines.length) {
	let boardStrings = lines.slice(lineIndex, lineIndex + boardDimension);

	boards.push(new Board(boardStrings, boardDimension));

	lineIndex += boardDimension + 1;
}

const boardsDone: number[] = [];

while (numIndex < numbers.length && boardsDone.length < boards.length) {
	for (let i = 0; i < boards.length; i++) {
		if (boardsDone.indexOf(i) === -1 && boards[i].CheckNum(numbers[numIndex])) {
			boardsDone.push(i);
		}
	}
	numIndex++;
}

let score = boards[boardsDone[boardsDone.length - 1]].GetScore(numbers[numIndex - 1]);
console.log(score);
