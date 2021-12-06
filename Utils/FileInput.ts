import * as fs from 'fs';

const GetInput = (filepath: string): string[] => {
	const file = fs.readFileSync(filepath);
	const strings = file.toString().split('\n');
	return strings;
};

export default GetInput;
