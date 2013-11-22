var game = require('../minesweeper.js');

describe('Matrix operations', function() {
    it('create', function(done) {
        var matrix = game.createMatrix(4, 3);
        if(matrix.length == 4 && matrix[0].length == 3) {
            done();
        } else {
            done(new Error('Matrix with wrong dimensions.'));
        }
    });
})