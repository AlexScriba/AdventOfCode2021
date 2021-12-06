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

while (numIndex < numbers.length) {
	for (let i = 0; i < boards.length; i++) {
		if (boards[i].CheckNum(numbers[numIndex])) {
			console.log(boards[i].GetScore(numbers[numIndex]));
			numIndex = numbers.length;
			break;
		}
	}
	numIndex++;
}
