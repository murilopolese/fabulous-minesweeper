const assert = require('chai').assert
const game = require('../minesweeper_lib.js')

describe('testing board setup', function() {
	it('should create 2D array with correct dimensions', function() {
		let width = 2
		let height = 3
		let array = game.create2DArray(width, height)
		assert.equal(array.length, height)
		assert.equal(array[0].length, width)
	})
	it('should not allow creating 2D array with 0 height', function(done) {
		try {
			let array = game.create2DArray(2, 0)
			done(new Error('should not allow creating 2D array with 0 height'))
		} catch (e) {
			assert.equal(e.message, 'Height cannot be 0')
			done()
		}
	})
	it('should not allow creating 2D array with 0 width', function(done) {
		try {
			let array = game.create2DArray(0, 2)
			done(new Error('should not allow creating 2D array with 0 width'))
		} catch (e) {
			assert.equal(e.message, 'Width cannot be 0')
			done()
		}
	})
	it('should initialize all values on array with init value', function() {
		let array = game.create2DArray(3, 2, 'test')
		for (let x in array) {
			for (let y in array[x]) {
				assert.equal(array[x][y], 'test')
			}
		}
	})
	it('should identify if position is outside board', function() {
		let array = game.create2DArray(3, 2)
		assert.equal(game.isOutsideLimits(array, 3, 0), true)
		assert.equal(game.isOutsideLimits(array, 2, 0), false)
		assert.equal(game.isOutsideLimits(array, 2, 2), true)
		assert.equal(game.isOutsideLimits(array, 2, 1), false)
	})
})

describe('testing bomb placement', function() {
	it("should not place bomb outside left boundaries", function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.placeBomb(board, -1, 0)
			done(new Error("should not place bomb outside left boundaries"))
		} catch (e) {
			assert.equal(e.message, 'Cannot place bomb here')
			done()
		}
	})
	it("should not place bomb outside right boundaries", function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.placeBomb(board, 3, 0)
			done(new Error("should not place bomb outside right boundaries"))
		} catch (e) {
			assert.equal(e.message, 'Cannot place bomb here')
			done()
		}
	})
	it("should not place bomb outside top boundaries", function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.placeBomb(board, 0, -1)
			done(new Error("should not place bomb outside top boundaries"))
		} catch (e) {
			assert.equal(e.message, 'Cannot place bomb here')
			done()
		}
	})
	it("should not place bomb outside bottom boundaries", function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.placeBomb(board, 0, 3)
			done(new Error("should not place bomb outside bottom boundaries"))
		} catch (e) {
			assert.equal(e.message, 'Cannot place bomb here')
			done()
		}
	})
	it("should not place bomb on top of other bomb", function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board[1][1] = 'bomb'
			board = game.placeBomb(board, 1, 1)
			done(new Error("should not place bomb on top of other bomb"))
		} catch (e) {
			assert.equal(e.message, 'Cannot place bomb here')
			done()
		}
	})
	it('should not allow placing more bombs than places', function(done) {
		let board = game.create2DArray(2, 2, 0)
		try {
			board = game.placeBombs(board, 5)
			done(new Error('should not allow placing more bombs than places'))
		} catch (e) {
			assert.equal(e.message, 'Cannot place more bombs than places')
			done()
		}
	})
	it('should place exactly the amount of bombs specified', function() {
		let board = game.create2DArray(5, 5, 0)
		board = game.placeBombs(board, 5)
		let totalBombs = 0
		for (let x in board) {
			for (let y in board[x]) {
				totalBombs += (board[x][y] === 'bomb') ? 1 : 0
			}
		}
		assert.equal(totalBombs, 5)
	})
})

describe('incrementing bomb counts of a tile', function() {
	it('should not increment place outside of left boundary', function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.increment(board, -1, 0)
			done(new Error("should not increment place outside of left boundary"))
		} catch (e) {
			assert.equal(e.message, 'Cannot increment here')
			done()
		}
	})
	it('should not increment place outside of right boundary', function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.increment(board, 3, 0)
			done(new Error("should not increment place outside of right boundary"))
		} catch (e) {
			assert.equal(e.message, 'Cannot increment here')
			done()
		}
	})
	it('should not increment place outside of top boundary', function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.increment(board, 0, -1)
			done(new Error("should not increment place outside of top boundary"))
		} catch (e) {
			assert.equal(e.message, 'Cannot increment here')
			done()
		}
	})
	it('should not increment place outside of bottom boundary', function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.increment(board, 0, 3)
			done(new Error("should not increment place outside of bottom boundary"))
		} catch (e) {
			assert.equal(e.message, 'Cannot increment here')
			done()
		}
	})
	it('should not increment tile if it is a bomb', function(done) {
		let board = game.create2DArray(3, 3, 0)
		try {
			board = game.placeBomb(board, 1, 1)
			board = game.increment(board, 1, 1)
			done(new Error("should not increment if it is a bomb"))
		} catch (e) {
			assert.equal(e.message, 'Cannot increment here')
			done()
		}
	})
})

describe('should increment neighbors of a tile', function() {
	it('should increment tiles around single bomb on middle region', function() {
		let desiredResult = [
			[1, 		1, 	1],
			[1, 'bomb', 1],
			[1, 		1, 	1],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.incrementNeighbors(board, 1, 1)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around multiple bombs on middle region', function() {
		let desiredResult = [
			[1, 		2, 			2, 	1],
			[1, 'bomb', 'bomb',	1],
			[1, 		2, 			2, 	1],
		]
		let board = game.create2DArray(4, 3, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.placeBomb(board, 2, 1)
		board = game.incrementNeighbors(board, 1, 1)
		board = game.incrementNeighbors(board, 2, 1)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around multiple bombs on middle region up to 8', function() {
		let desiredResult = [
			[1, 		2, 			3, 			2,  1],
			[2, 'bomb', 'bomb',	'bomb', 2],
			[3, 'bomb',      8,	'bomb', 3],
			[2, 'bomb', 'bomb',	'bomb', 2],
			[1, 		2, 			3, 			2,  1],
		]
		let board = game.create2DArray(5, 5, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.placeBomb(board, 2, 1)
		board = game.placeBomb(board, 3, 1)
		board = game.placeBomb(board, 1, 2)
		board = game.placeBomb(board, 3, 2)
		board = game.placeBomb(board, 1, 3)
		board = game.placeBomb(board, 2, 3)
		board = game.placeBomb(board, 3, 3)
		board = game.incrementNeighbors(board, 1, 1)
		board = game.incrementNeighbors(board, 2, 1)
		board = game.incrementNeighbors(board, 3, 1)
		board = game.incrementNeighbors(board, 1, 2)
		board = game.incrementNeighbors(board, 3, 2)
		board = game.incrementNeighbors(board, 1, 3)
		board = game.incrementNeighbors(board, 2, 3)
		board = game.incrementNeighbors(board, 3, 3)
		assert.deepEqual(desiredResult, board)
	})

	it('should increment tiles around single bomb touching the left boundary', function() {
		let desiredResult = [
			[2, 					2, 		1],
			['bomb', 'bomb',	 	1],
			[2, 					2, 		1],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 0, 1)
		board = game.placeBomb(board, 1, 1)
		board = game.incrementNeighbors(board, 0, 1)
		board = game.incrementNeighbors(board, 1, 1)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around single bomb touching the right boundary', function() {
		let desiredResult = [
			[1, 			2, 			2 ],
			[1, 	'bomb',	'bomb'],
			[1, 			2, 			2 ],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.placeBomb(board, 2, 1)
		board = game.incrementNeighbors(board, 1, 1)
		board = game.incrementNeighbors(board, 2, 1)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around bomb touching the top boundary', function() {
		let desiredResult = [
			[2, 	'bomb',	2],
			[2, 	'bomb',	2],
			[1, 			1, 	1],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 1, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.incrementNeighbors(board, 1, 0)
		board = game.incrementNeighbors(board, 1, 1)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around bomb touching the bottom boundary', function() {
		let desiredResult = [
			[1, 			1,	1],
			[2, 	'bomb',	2],
			[2, 	'bomb',	2],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 1, 1)
		board = game.placeBomb(board, 1, 2)
		board = game.incrementNeighbors(board, 1, 1)
		board = game.incrementNeighbors(board, 1, 2)
		assert.deepEqual(desiredResult, board)
	})
	it('should increment tiles around edges', function() {
		let desiredResult = [
			['bomb', 	2, 'bomb'],
			[			2, 	4, 		 2],
			['bomb', 	2, 'bomb'],
		]
		let board = game.create2DArray(3, 3, 0)
		board = game.placeBomb(board, 0, 0)
		board = game.placeBomb(board, 2, 0)
		board = game.placeBomb(board, 0, 2)
		board = game.placeBomb(board, 2, 2)
		board = game.incrementNeighbors(board, 0, 0)
		board = game.incrementNeighbors(board, 2, 0)
		board = game.incrementNeighbors(board, 0, 2)
		board = game.incrementNeighbors(board, 2, 2)
		assert.deepEqual(desiredResult, board)
	})
})
