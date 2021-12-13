abstract class node {
	connections: node[];
	name: string;
	visited: number;
	abstract hasMax: boolean;

	constructor(name: string) {
		this.connections = [];
		this.name = name;
		this.visited = 0;
	}

	visit = () => {
		if (this.hasMax && this.visited >= 1) {
			return false;
		}

		this.visited++;

		return true;
	};

	connect = (otherNode: node) => {
		this.connections.push(otherNode);
		otherNode.connections.push(this);
	};

	//for part 2
	unvisit: () => void = () => {};
}

class smallNode extends node {
	hasMax = true;

	unvisit = () => {
		this.visited = 0;
	};
}

class largeNode extends node {
	hasMax = false;
}

// for part 2

const allNodes: node[] = [];
let taken: node | null = null;

class adaptiveSmallNode extends node {
	hasMax = true;

	constructor(name: string) {
		super(name);
		allNodes.push(this);
	}

	visit = () => {
		if (this.hasMax) {
			if (this.visited === 1 && taken === null) {
				// console.log('\t\tTaken by ', this.name);
				taken = this;
			} else if (this.visited >= 1) {
				return false;
			}
		}

		this.visited++;
		return true;
	};

	unvisit = () => {
		// console.log(taken?.name);
		if (this.name === taken?.name) {
			taken = null;
			this.visited = 1;
			// console.log('\t\tGiven back by ', this.name);
		} else {
			this.visited = 0;
		}
	};
}

export { node, largeNode, smallNode, adaptiveSmallNode };
