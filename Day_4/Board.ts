class Board {
	board: number[][];
	boardDimension: number;

	constructor(boardStrings: string[], boardDimension: number) {
		this.board = [];
		this.boardDimension = boardDimension;

		for (let i = 0; i < boardDimension; i++) {
			this.board.push(
				boardStrings[i]
					.split(' ')
					.filter((val) => val !== '')
					.map((val) => Number(val))
			);
		}
	}

	CheckNum = (num: number): boolean => {
		let found = false;

		for (let i = 0; i < this.boardDimension; i++) {
			for (let j = 0; j < this.boardDimension; j++) {
				if (this.board[i][j] === num) {
					found = true;
					this.board[i][j] = -1;
					break;
				}
			}

			if (found === true) break;
		}

		return this.HasWon();
	};

	HasWon = (): boolean => {
		let found = false;

		for (let i = 0; i < this.boardDimension; i++) {
			let lineComplete = true;

			for (let j = 0; j < this.boardDimension; j++) {
				if (this.board[i][j] !== -1) {
					lineComplete = false;
					break;
				}
			}

			if (lineComplete === true) return true;
		}

		for (let i = 0; i < this.boardDimension; i++) {
			let lineComplete = true;

			for (let j = 0; j < this.boardDimension; j++) {
				if (this.board[j][i] !== -1) {
					lineComplete = false;
					break;
				}
			}

			if (lineComplete === true) return true;
		}

		return false;
	};

	GetScore = (last: number): number => {
		let score = 0;

		for (let i = 0; i < this.boardDimension; i++) {
			for (let j = 0; j < this.boardDimension; j++) {
				if (this.board[i][j] !== -1) {
					score += this.board[i][j];
				}
			}
		}

		return score * last;
	};
}

export default Board;
