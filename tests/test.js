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
    it('verify limits', function(done) {
        var matrix = game.createMatrix(4, 3);
        if(game.verifyLimit(matrix, 1, 1) &&
            !game.verifyLimit(matrix, 1, 4)) {
            done();
        } else {
            done(new Error('Matrix boundaries verification not working.'));
        }
    })
    it('put bomb', function(done) {
        var matrix = game.createMatrix(4, 3);
        matrix = game.putBomb(matrix, 1, 1);
        if(matrix[1][1] == game.bomb) {
            done();
        } else {
            done(new Error('Bomb hasn\'t been planted. Counter terrorists win.'));
        }
    })
})