import GetInput from '../Utils/FileInput';

const logs = GetInput('./Day_3/inputs.txt');
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
