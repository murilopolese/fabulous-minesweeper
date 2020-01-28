const game = require('./minesweeper_lib')

const renderHiddenTile = function(x, y) {
	return `<div class="tile hidden"></div>`
}
const renderTile = function(value, x, y) {
	switch (value) {
		case 'hidden':
			return `<div class="tile hidden" onclick="handleClick(${x}, ${y})"></div>`
		case 'bomb':
			return `<div class="tile bomb"></div>`
		case 0:
			return `<div class="tile"></div>`
		default:
			return `<div class="tile">${value}</div>`
	}
}
const renderRow = function(row, y) {
	return row.map((value, x) => `<div class="row">${renderTile(value, x, y)}</div>`).join('')
}
const renderBoard = function(board) {
	return board.map((row, y) => `<div class="board">${renderRow(row, y)}</div>`).join('')
}

window.onload = function() {
	let gameEl = document.querySelector('#game')
	let width = 10
	let height = 10
	let bombs = 10
	let board, hiddenBoard

	const newBoard = function(width, height, bombs) {
		let board = game.create2DArray(width, height, 0)
		board = game.placeBombs(board, bombs)
		board = game.countBombs(board)
		return board
	}
	const uncover = function(hiddenBoard, board, x, y) {
		if (
			!game.isOutsideLimits(hiddenBoard, x, y)
			&& hiddenBoard[y][x] === 'hidden'
		) {
			hiddenBoard[y][x] = board[y][x]
			if (hiddenBoard[y][x] === 0) {
				hiddenBoard = uncover(hiddenBoard, board, x-1, y-1)
				hiddenBoard = uncover(hiddenBoard, board, x, y-1)
				hiddenBoard = uncover(hiddenBoard, board, x+1, y-1)

				hiddenBoard = uncover(hiddenBoard, board, x-1, y)
				hiddenBoard = uncover(hiddenBoard, board, x+1, y)

				hiddenBoard = uncover(hiddenBoard, board, x-1, y+1)
				hiddenBoard = uncover(hiddenBoard, board, x, y+1)
				hiddenBoard = uncover(hiddenBoard, board, x+1, y+1)
			}
		}
		return game.cloneArray(hiddenBoard)
	}
	const gameStatus = function() {
		let hiddenTiles = 0
		let hiddenBombs = 0
		for (let y in hiddenBoard) {
			for (let x in hiddenBoard[y]) {
				if (hiddenBoard[y][x] === 'hidden') {
					hiddenTiles += 1
					if (board[y][x] === 'bomb') {
						hiddenBombs += 1
					}
				} else if (hiddenBoard[y][x] === 'bomb') {
					return ':('
				}
			}
		}
		if (hiddenBombs === hiddenTiles) {
			return ':D'
		}
		return ':|'
	}
	const render = function(board) {
		gameEl.innerHTML = `
			<div>
				<button onclick="reset()">${gameStatus(board)}</button>
			</div>
			${renderBoard(board)}
		`
	}
	const reset = function() {
		board = newBoard(width, height, bombs)
		hiddenBoard = game.create2DArray(width, height, 'hidden')
		render(hiddenBoard)
	}
	const handleClick = function(x, y) {
		hiddenBoard = uncover(hiddenBoard, board, x, y)
		render(hiddenBoard)
	}

	window.handleClick = handleClick
	window.reset = reset

	reset()
}
