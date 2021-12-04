import { debug } from 'console';
import * as fs from 'fs';

const data = fs.readFileSync('./Day_3/inputs.txt');

const logs = data.toString().split('\n');
const length = logs[0].length;

let oxy = [...logs];
let car = [...logs];

for (let index = 0; index < length; index++) {
	let oneCount = 0;

	oxy.forEach((val) => {
		if (val.charAt(index) === '1') {
			oneCount++;
		}
	});

	const mostCommon = oneCount >= oxy.length / 2 ? '1' : '0';

	oxy = oxy.filter((value) => {
		return value.charAt(index) === mostCommon;
	});

	if (oxy.length === 1) {
		break;
	}
}

for (let index = 0; index < length; index++) {
	let oneCount = 0;

	car.forEach((val) => {
		if (val.charAt(index) === '1') {
			oneCount++;
		}
	});

	const leastCommon = oneCount >= car.length / 2 ? '0' : '1';

	car = car.filter((value) => {
		return value.charAt(index) === leastCommon;
	});

	if (car.length === 1) {
		break;
	}
}

const oxyNum = parseInt(oxy[0], 2);
const carNum = parseInt(car[0], 2);

console.log(car[0]);
console.log(oxy[0]);

const val = oxyNum * carNum;

console.log(oxyNum);
console.log(carNum);

console.log(val);

// const oneCounts = new Array(logs[0].length - 1).fill(0);

// logs.forEach((value) => {
// 	for (let i = 0; i < value.length - 1; i++) {
// 		if (value.charAt(i) === '1') {
// 			oneCounts[i]++;
// 		}
// 	}
// });

// let oxy = [...logs];
// let car = [...logs];

// for (let index = 0; index < logs[0].length - 1; index++) {
// 	let mostCommon = oneCounts[index] >= logs.length / 2 ? '1' : '0';

// 	if (index === 4) {
// 		console.log(oxy);
// 	}

// 	if (oxy.length > 1)
// 		oxy = oxy.filter((value) => {
// 			return value.charAt(index) === mostCommon;
// 		});

// 	if (car.length > 1)
// 		car = car.filter((value) => {
// 			return value.charAt(index) !== mostCommon;
// 		});

// 	if (car.length === 1 && oxy.length === 1) break;
// }

// console.log(oneCounts);

// const oxyNum = parseInt(oxy[0], 2);
// const carNum = parseInt(car[0], 2);

// console.log(car[0]);
// console.log(oxy[0]);

// console.log(logs.length);

// const val = oxyNum * carNum;

// console.log(val);
