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

const DrawPath = (end: Node) => {
	// draw path
	const map: string[][] = [];
	inputs.forEach((line) => {
		map.push(line.split(''));
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

// create all nodes for dijkstras table
const inputs = GetInput('./Day_15/inputs.txt');

const table: Node[][] = [];

for (let i = 0; i < inputs.length; i++) {
	let line = inputs[i];

	const lineNodes: Node[] = [];
	for (let j = 0; j < line.length; j++) {
		const point: Point = { y: i, x: j };
		const num = Number(line.charAt(j));

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

DrawPath(end);
