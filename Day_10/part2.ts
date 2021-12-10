import GetInput from '../Utils/FileInput';
import Stack from 'ts-data.stack';

const lines = GetInput('./Day_10/inputs.txt').map((line) => line.trim());

const getScore = (line: string) => {
	let stack = new Stack<string>();
	let score = 0;
	let invalid = false;

	let symbols = line.split('');

	for (let i = 0; i < symbols.length; i++) {
		switch (symbols[i]) {
			case '{':
			case '[':
			case '(':
			case '<':
				stack.push(symbols[i]);
				break;
			case '}':
				if (stack.peek() != '{') {
					return 0;
				} else {
					stack.pop();
					break;
				}
			case ')':
				if (stack.peek() != '(') {
					return 0;
				} else {
					stack.pop();
					break;
				}
			case ']':
				if (stack.peek() != '[') {
					return 0;
				} else {
					stack.pop();
					break;
				}
			case '>':
				if (stack.peek() != '<') {
					return 0;
				} else {
					stack.pop();
					break;
				}
		}
	}

	// at this point all are valid

	while (!stack.isEmpty()) {
		let top = stack.pop();
		score *= 5;

		switch (top) {
			case '(':
				score += 1;
				break;
			case '[':
				score += 2;
				break;
			case '{':
				score += 3;
				break;
			case '<':
				score += 4;
				break;
		}
	}

	return score;
};

const scores: number[] = [];
lines.forEach((line) => {
	let score = getScore(line);
	if (score !== 0) {
		scores.push(score);
	}
});

scores.sort((a: number, b: number) => a - b);

console.log(scores[Math.floor(scores.length / 2)]);
