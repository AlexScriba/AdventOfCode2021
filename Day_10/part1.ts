import GetInput from '../Utils/FileInput';
import Stack from 'ts-data.stack';

const lines = GetInput('./Day_10/inputs.txt').map((line) => line.trim());

const getScore = (line: string) => {
	let stack = new Stack<string>();
	let score = 0;

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
					score = 1197;
					break;
				} else {
					stack.pop();
					break;
				}
			case ')':
				if (stack.peek() != '(') {
					score = 3;
					break;
				} else {
					stack.pop();
					break;
				}
			case ']':
				if (stack.peek() != '[') {
					score = 57;
					break;
				} else {
					stack.pop();
					break;
				}
			case '>':
				if (stack.peek() != '<') {
					score = 25137;
					break;
				} else {
					stack.pop();
					break;
				}
		}

		if (score != 0) break;
	}

	return score;
};

let total = 0;

lines.forEach((line) => {
	let score = getScore(line);

	total += score;
});
console.log(total);
