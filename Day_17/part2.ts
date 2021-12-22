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

const minX = Math.min(xCoords[0], xCoords[1]);
const maxX = Math.max(xCoords[0], xCoords[1]);

const minY = Math.min(yCoords[0], yCoords[1]);
const maxY = Math.max(yCoords[0], yCoords[1]);

let solCount = 0;

for (let xVelocity = 1; xVelocity < 1000; xVelocity++) {
	for (let yVelocity = minY; yVelocity < 500; yVelocity++) {
		let y = 0;
		let x = 0;
		let xVelocityInstance = xVelocity;
		let yVelocityInstance = yVelocity;

		for (let j = 0; j < 1000; j++) {
			x += xVelocityInstance;

			if (xVelocityInstance < 0) xVelocityInstance++;
			else if (xVelocityInstance > 0) xVelocityInstance--;

			y += yVelocityInstance--;

			if (y <= maxY && y >= minY && x <= maxX && x >= minX) {
				solCount++;
				break;
			}

			if (y < minY) break;
		}
	}
}

console.log(solCount);
