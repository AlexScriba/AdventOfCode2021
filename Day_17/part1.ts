import GetInput from '../Utils/FileInput';

// setup

interface Point {
	x: number;
	y: number;
}

//logic

const input = GetInput('./Day_17/inputs.txt')[0];

let equals = input.indexOf('=');
const comma = input.indexOf(',');

const xCoords = input
	.slice(equals + 1, comma)
	.split('..')
	.map(Number);

equals = input.lastIndexOf('=');
const yCoords = input
	.slice(equals + 1)
	.split('..')
	.map(Number);

let targetStart: Point = { x: xCoords[0], y: yCoords[0] };

let n = -targetStart.y - 1;
console.log((n * (n + 1)) / 2);
