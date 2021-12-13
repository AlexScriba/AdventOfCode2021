import GetInput from '../Utils/FileInput';
import { adaptiveSmallNode, largeNode, node, smallNode } from './node';

const lines = GetInput('./Day_12/inputs.txt');

const printPath = (path: node[]) => {
	let str = '';
	path.forEach((n) => (str += n.name + '->'));
	return str;
};

const allNodes: node[] = [];
const start: node = new smallNode('start');
const end: node = new smallNode('end');
allNodes.push(start);
allNodes.push(end);

// check if node already exists
const getNode = (str: string) => {
	for (let i = 0; i < allNodes.length; i++) {
		if (allNodes[i].name === str) {
			return allNodes[i];
		}
	}

	let n: node;
	if (str.toUpperCase() === str) {
		n = new largeNode(str);
	} else {
		n = new adaptiveSmallNode(str);
	}

	allNodes.push(n);
	return n;
};

// create all nodes
const makeNodes = (str: string) => {
	const [name1, name2] = str.split('-');

	const n1 = getNode(name1);
	const n2 = getNode(name2);

	n1.connect(n2);
};

lines.forEach(makeNodes);

let total = 0;

const path: node[] = [];

const numPaths = (n: node): number => {
	let count = 0;

	if (n.name === 'end') {
		// console.log('\tPath found: ', printPath(path), 'end');
		return 1;
	}

	if (!n.visit()) {
		// console.log('\tDead end! ', printPath(path), n.name);
		return 0;
	}

	path.push(n);

	// console.log('Now visiting: ', n.name, printPath(path), n.name);

	const cons = n.connections;
	for (let i = 0; i < cons.length; i++) {
		count += numPaths(cons[i]);
	}

	path.pop();
	n.unvisit();
	return count;
};

total = numPaths(start);

console.log(total);
