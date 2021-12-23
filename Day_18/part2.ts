import { triggerAsyncId } from 'async_hooks';
import GetInput from '../Utils/FileInput';

// setup

const findSeparation = (str: string) => {
	let counter = 0;
	for (let i = 1; i < str.length - 1; i++) {
		let char = str.charAt(i);
		if (char === '[') {
			counter++;
		} else if (char === ']') {
			counter--;
		}

		if (counter === 0) {
			return i + 1;
		}
	}
};

const makeNode = (str: string, parent?: Node): Node => {
	const num = parseInt(str);

	if (Number.isNaN(num)) {
		return new InternalNode(str, parent);
	}

	return new LeafNode(num, parent);
};

interface Node {
	children: boolean;
	magnitude: () => number;
	parent?: Node;
	left?: Node;
	right?: Node;
	setLeft: (calling: Node, value: number, goRight: boolean) => void;
	setRight: (calling: Node, value: number, goLeft: boolean) => void;
	toString: () => string;
}

class InternalNode implements Node {
	children = true;
	left: Node;
	right: Node;
	parent?: Node;

	constructor(childrenStr: string, parent?: Node, left?: Node, right?: Node) {
		if (parent) this.parent = parent;

		if (left && right) {
			this.left = left;
			this.right = right;

			this.left.parent = this;
			this.right.parent = this;
			return;
		}

		const commaIndex = findSeparation(childrenStr);

		if (!commaIndex) throw new Error('No Comma found in child str-> ' + childrenStr);

		const leftStr = childrenStr.slice(1, commaIndex);
		const rightStr = childrenStr.slice(commaIndex + 1, childrenStr.length - 1);

		this.left = makeNode(leftStr, this);
		this.right = makeNode(rightStr, this);
	}

	magnitude = () => {
		const res = 3 * this.left.magnitude() + 2 * this.right.magnitude();
		return res;
	};

	setLeft = (calling: Node, value: number, goRight: boolean) => {
		if (goRight) {
			this.right.setLeft(this, value, true);
			return;
		}

		if (this.left !== calling) {
			this.left.setLeft(this, value, true);
		} else {
			if (!this.parent) {
				return;
			}

			this.parent.setLeft(this, value, goRight);
		}
	};

	setRight = (calling: Node, value: number, goLeft: boolean) => {
		if (goLeft) {
			this.left.setRight(this, value, true);
			return;
		}

		if (this.right !== calling) {
			this.right.setRight(this, value, true);
		} else {
			if (!this.parent) {
				return;
			}

			this.parent.setRight(this, value, goLeft);
		}
	};

	toString = () => {
		return `[${this.left.toString()},${this.right.toString()}]`;
	};
}

class LeafNode implements Node {
	children = false;
	left = undefined;
	right = undefined;
	parent?: Node;
	value: number;

	constructor(value: number, parent?: Node) {
		this.value = value;
		this.parent = parent;
	}

	magnitude = () => {
		return this.value;
	};

	setRight = (calling: Node, value: number, goLeft: boolean) => {
		this.value += value;
	};

	setLeft = (calling: Node, value: number, goRight: boolean) => {
		this.value += value;
	};

	toString = () => {
		return '' + this.value;
	};
}

const add = (n1: Node, n2: Node) => {
	const parent = new InternalNode('', undefined, n1, n2);

	let exploded = true;
	let split = false;
	let count = 0;

	while (exploded || split) {
		exploded = checkExplodes(parent);

		if (!exploded) split = checkSplit(parent);
	}
	return parent;
};

const checkExplodes = (node: Node, depth: number = 1): boolean => {
	if (!node.children) return false;

	// check explode
	if (node.children && depth > 4) {
		let internal = node as InternalNode;

		const parent: Node | undefined = internal.parent;
		if (!parent) throw new Error('Node does not have a parent');

		parent.setLeft(internal, internal.left.magnitude(), false);
		parent.setRight(internal, internal.right.magnitude(), false);

		if (parent.left === node) {
			parent.left = new LeafNode(0, parent);
		} else if (parent.right === node) {
			parent.right = new LeafNode(0, parent);
		} else {
			throw new Error('Node is not child of parent');
		}

		return true;
	}

	let changed = false;

	if (node.left) changed = changed || checkExplodes(node.left, depth + 1);
	if (node.right) changed = changed || checkExplodes(node.right, depth + 1);

	return changed;
};

const checkSplit = (node: Node, depth: number = 1): boolean => {
	// check split
	if (!node.children && node.magnitude() >= 10) {
		const num = node.magnitude() / 2;

		const parent = node.parent;
		if (!node.parent) throw new Error('Node does not have a parent (leaf)');

		const newNode = new InternalNode(
			'',
			parent,
			new LeafNode(Math.floor(num)),
			new LeafNode(Math.ceil(num))
		);

		if (parent?.left === node) {
			parent.left = newNode;
		} else if (parent?.right === node) {
			parent.right = newNode;
		} else {
			throw new Error('Node is not child of parent');
		}

		return true;
	}

	let changed = false;

	if (node.left) changed = changed || checkSplit(node.left, depth + 1);
	if (node.right) changed = changed || checkSplit(node.right, depth + 1);

	return changed;
};

const tryNodes = (s1: string, s2: string) => {
	const n1 = makeNode(s1);
	const n2 = makeNode(s2);
	const temp = add(n1, n2);

	const mag = temp.magnitude();
	return mag;
};

// logic

const input = GetInput('./Day_18/inputs.txt');

let max = Number.NEGATIVE_INFINITY;

for (let i = 0; i < input.length - 1; i++) {
	for (let j = i + 1; j < input.length; j++) {
		max = Math.max(max, tryNodes(input[i], input[j]));
		max = Math.max(max, tryNodes(input[j], input[i]));
	}
}

console.log(max);
