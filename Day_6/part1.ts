import GetInput from '../Utils/FileInput';

class Fish {
	counter: number;

	constructor(count?: number) {
		this.counter = count || 8;
	}

	PassDay = (): boolean => {
		this.counter--;

		if (this.counter < 0) {
			this.counter = 6;
			return true;
		}

		return false;
	};
}

const lines = GetInput('./Day_6/inputs.txt');

const nums = lines[0].split(',').map((val) => Number(val));

let fish = nums.map((val) => new Fish(val));
let newFish: Fish[] = [];

for (let i = 0; i < 256; i++) {
	console.log(i);

	fish.forEach((fishy) => {
		if (fishy.PassDay()) {
			newFish.push(new Fish());
		}
	});

	fish = [...fish, ...newFish];
	newFish = [];
}

console.log(fish.length);
