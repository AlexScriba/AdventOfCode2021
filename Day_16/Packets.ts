interface IHash {
	[char: string]: string;
}

const conv: IHash = {
	0: '0000',
	1: '0001',
	2: '0010',
	3: '0011',
	4: '0100',
	5: '0101',
	6: '0110',
	7: '0111',
	8: '1000',
	9: '1001',
	A: '1010',
	B: '1011',
	C: '1100',
	D: '1101',
	E: '1110',
	F: '1111',
};

const translate = (str: string) => {
	let outstr = '';

	for (let i = 0; i < str.length; i++) {
		outstr += conv[str.charAt(i)];
	}

	return outstr;
};

abstract class Packet {
	version: number;
	type: number;
	length: number;
	abstract payload: Packet[] | number;

	constructor(vers: number, type: number) {
		this.version = vers;
		this.type = type;
		this.length = 6;
	}

	abstract versionCount: () => number;

	abstract evaluate: () => number;
}

class LiteralPacket extends Packet {
	payload: number;

	constructor(vers: number, type: number, str: string) {
		super(vers, type);

		let numString = '';
		let startIndex = 0;
		let done = false;

		while (!done) {
			if (startIndex > str.length) break;

			if (str.charAt(startIndex) === '0') done = true;

			let tempStr = str.slice(startIndex + 1, startIndex + 5);
			numString += tempStr;
			startIndex += 5;
		}

		this.length += startIndex;
		this.payload = parseInt(numString, 2);
	}

	versionCount = () => {
		return this.version;
	};

	evaluate = () => this.payload;
}

class OtherPacket extends Packet {
	payload: number;

	constructor(vers: number, type: number, str: string) {
		super(vers, type);
		this.payload = -1;
	}

	versionCount = () => this.version;
	evaluate = () => this.payload;
}

abstract class OperatorPacket extends Packet {
	payload: Packet[];

	constructor(vers: number, type: number, str: string) {
		super(vers, type);

		this.payload = [];

		if (str.charAt(0) === '0') {
			let lengthString = str.slice(1, 16);
			let length = parseInt(lengthString, 2);

			let startIndex = 16;
			let done = false;
			while (!done) {
				const newPacket = packetFactory(str.slice(startIndex));
				startIndex += newPacket.length;

				this.payload.push(newPacket);

				done = startIndex - 16 >= length;
			}

			this.length = startIndex + 6;
		} else {
			let numPacketsString = str.slice(1, 12);
			let numPackets = parseInt(numPacketsString, 2);

			let startIndex = 12;
			let packetCount = 0;
			let done = false;
			while (!done) {
				const newPacket = packetFactory(str.slice(startIndex));
				startIndex += newPacket.length;

				this.payload.push(newPacket);

				done = ++packetCount >= numPackets;
			}
			this.length = startIndex + 6;
		}
	}

	versionCount: () => number = (): number => {
		let total = this.version;

		this.payload.forEach((packet) => (total += packet.versionCount()));

		return total;
	};
}

class SumOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let total = 0;
		this.payload.forEach((packet) => (total += packet.evaluate()));
		return total;
	};
}

class ProductOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let total = 1;
		this.payload.forEach((packet) => (total *= packet.evaluate()));
		return total;
	};
}

class MinimumOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let min = Number.POSITIVE_INFINITY;
		this.payload.forEach((packet) => {
			let val = packet.evaluate();
			if (val < min) {
				min = val;
			}
		});
		return min;
	};
}

class MaximumOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let max = Number.NEGATIVE_INFINITY;
		this.payload.forEach((packet) => {
			let val = packet.evaluate();
			if (val > max) {
				max = val;
			}
		});
		return max;
	};
}

class GreaterThanOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let res = this.payload[0].evaluate() > this.payload[1].evaluate();
		if (res) {
			return 1;
		}

		return 0;
	};
}

class LessThanOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let res = this.payload[0].evaluate() < this.payload[1].evaluate();
		if (res) {
			return 1;
		}

		return 0;
	};
}

class EqualsOperator extends OperatorPacket {
	constructor(vers: number, type: number, str: string) {
		super(vers, type, str);
	}

	evaluate = () => {
		let res = this.payload[0].evaluate() === this.payload[1].evaluate();
		if (res) {
			return 1;
		}

		return 0;
	};
}

const packetFactory = (str: string): Packet => {
	let vers = str.slice(0, 3);
	let tp = str.slice(3, 6);

	let version = parseInt(vers, 2);
	let type = parseInt(tp, 2);

	switch (type) {
		case 0:
			return new SumOperator(version, type, str.slice(6));
		case 1:
			return new ProductOperator(version, type, str.slice(6));
		case 2:
			return new MinimumOperator(version, type, str.slice(6));
		case 3:
			return new MaximumOperator(version, type, str.slice(6));
		case 4:
			return new LiteralPacket(version, type, str.slice(6));
		case 5:
			return new GreaterThanOperator(version, type, str.slice(6));
		case 6:
			return new LessThanOperator(version, type, str.slice(6));
		case 7:
			return new EqualsOperator(version, type, str.slice(6));
	}

	throw new Error('Packet Type not implemented -> ' + type);
};

export {
	packetFactory,
	translate,
	Packet,
	OtherPacket,
	LiteralPacket,
	OperatorPacket,
	SumOperator,
	EqualsOperator,
	MaximumOperator,
	MinimumOperator,
	ProductOperator,
	LessThanOperator,
	GreaterThanOperator,
};
