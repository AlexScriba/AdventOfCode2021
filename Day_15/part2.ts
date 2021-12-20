import { listeners } from 'process';
import PriorityQueue from 'ts-priority-queue';
import GetInput from '../Utils/FileInput';

//setup

interface Point {
	x: number;
	y: number;
}

interface Node {
	point: Point;
	weight: number;
	best: number;
	prev: Node | null;
	travelled: boolean;
}

interface Edge {
	start: Node;
	end: Node;
	weight: number;
}

const getChildren = (node: Node, table: Node[][], queue: PriorityQueue<Edge>) => {
	let pt = node.point;

	const edges: Edge[] = [];

	const dirs = [
		[0, -1],
		[1, 0],
		[0, 1],
		[-1, 0],
	];

	for (let i = 0; i < dirs.length; i++) {
		const coords = dirs[i];

		let x = pt.x + coords[1];
		let y = pt.y + coords[0];

		if (x < 0 || x >= table[0].length || y < 0 || y >= table.length) continue;

		let target = table[y][x];

		let edge: Edge = {
			start: node,
			end: target,
			weight: node.best + target.weight,
		};

		queue.queue(edge);
	}
};

const DrawPath = (end: Node, mapNums: number[][]) => {
	// draw path
	const map: string[][] = [];
	mapNums.forEach((line) => {
		map.push(line.map((val) => '' + val));
	});

	let p = end;
	while (p != table[0][0]) {
		let pt = p.point;
		map[pt.y][pt.x] = ' ';
		p = p.prev as Node;
	}

	map.forEach((line) => {
		let str = '';
		line.forEach((char) => (str += char));
		console.log(str);
	});
};

// logic

const inputs = GetInput('./Day_15/inputs.txt');

//create larger map
const tableNums: number[][] = [];

inputs.forEach((line) => {
	tableNums.push(line.split('').map(Number));
});

const xLen = tableNums[0].length;
const yLen = tableNums.length;

const largerMap: number[][] = new Array(5 * yLen);
for (let i = 0; i < yLen * 5; i++) {
	largerMap[i] = new Array(xLen * 5).fill(0);
}

for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		//do table
		for (let y = 0; y < tableNums.length; y++) {
			for (let x = 0; x < tableNums[0].length; x++) {
				let val = ((tableNums[y][x] + i + j - 1) % 9) + 1;
				if (val === 0) val = 1;
				largerMap[i * yLen + y][j * xLen + x] = val;
			}
		}
	}
}

// create all nodes for dijkstras table

const table: Node[][] = [];

for (let i = 0; i < largerMap.length; i++) {
	let line = largerMap[i];

	const lineNodes: Node[] = [];
	for (let j = 0; j < line.length; j++) {
		const point: Point = { y: i, x: j };
		const num = Number(line[j]);

		lineNodes.push({
			point,
			weight: num,
			best: Number.POSITIVE_INFINITY,
			prev: null,
			travelled: false,
		});
	}

	table.push(lineNodes);
}

let queue = new PriorityQueue({ comparator: (a: Edge, b: Edge) => a.weight - b.weight });

// visit first node
table[0][0].best = 0;
getChildren(table[0][0], table, queue);

let end = table[table.length - 1][table[0].length - 1];
let target = table[0][0];

// do dijkstras
while (queue.length > 0 && target != end) {
	// travel smallest
	let edge = queue.dequeue();

	let best = edge.start.best;

	target = edge.end;

	if (edge.weight < target.best) {
		target.best = edge.weight;
		target.prev = edge.start;
	}

	if (!target.travelled) {
		getChildren(target, table, queue);
		target.travelled = true;
	}
}

console.log(end.best);

// too big for output
// DrawPath(end, largerMap);
