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
