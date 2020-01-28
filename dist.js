(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./minesweeper_lib":2}],2:[function(require,module,exports){
function cloneArray(obj) {
	return Object.assign([], obj)
}
function randomInt(max) {
	return parseInt(Math.random() * max)
}
function create2DArray(x, y, init) {
	if (x == 0) throw new Error('Width cannot be 0')
	if (y == 0) throw new Error('Height cannot be 0')
	let array = []
	for (let j = 0; j < y; j++) {
		array[j] = []
		for (let i = 0; i < x; i++) {
			array[j][i] = init
		}
	}
	return array
}
function isOutsideLimits(board, x, y) {
	return (y < 0 || y >= board.length)
			|| (x < 0 || x >= board[0].length)
}
function placeBomb(board, x, y) {
	if (
			isOutsideLimits(board, x, y)
			|| board[y][x] === 'bomb'
		) {
		throw new Error('Cannot place bomb here')
	}
	board[y][x] = 'bomb'
	return cloneArray(board)
}
function placeBombs(board, n) {
	if (n > (board.length * board[0].length)) {
		throw new Error('Cannot place more bombs than places')
	}
	while(n > 0) {
		let y = randomInt(board.length)
		let x = randomInt(board[0].length)
		while (board[y][x] === 'bomb') {
			y = randomInt(board.length)
			x = randomInt(board[0].length)
		}
		board = placeBomb(board, x, y)
		n--
	}
	return cloneArray(board)
}
function increment(board, x, y) {
	if (
		board[y] === undefined
		|| board[y][x] === undefined
		|| board[y][x] === 'bomb'
	) {
		throw new Error('Cannot increment here')
	}
	board[y][x] = parseInt(board[y][x]) + 1
	return cloneArray(board)
}
function incrementNeighbors(board, x, y) {
	// Increment top row
	try { increment(board, x-1, y-1) } catch (e) { }
	try { increment(board,   x, y-1) } catch (e) { }
	try { increment(board, x+1, y-1) } catch (e) { }
	// Increment bottom row
	try { increment(board, x-1, y+1) } catch (e) { }
	try { increment(board,   x, y+1) } catch (e) { }
	try { increment(board, x+1, y+1) } catch (e) { }
	// Increment sides
	try { increment(board, x-1, y) } catch (e) { }
	try { increment(board, x+1, y) } catch (e) { }
	return cloneArray(board)
}
function countBombs(board) {
	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board.length; x++) {
			if (board[y][x] === 'bomb') {
				board = incrementNeighbors(board, x, y)
			}
		}
	}
	return cloneArray(board)
}

module.exports = {
	randomInt,
	cloneArray,
	create2DArray,
	placeBomb,
	placeBombs,
	increment,
	incrementNeighbors,
	countBombs,
	isOutsideLimits
}

},{}]},{},[1]);
