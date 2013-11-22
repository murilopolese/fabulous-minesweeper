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

    it('check if there is space above', function(done) {
        var matrix = game.createMatrix(3, 3);
        if(game.verifySpaceAbove(matrix, 1) &&
            !game.verifySpaceAbove(matrix, 0)) {
            done();
        } else {
            done('Space above verification is wrong.');
        }
    });
    it('check if there is space below', function(done) {
        var matrix = game.createMatrix(3, 3);
        if(game.verifySpaceBelow(matrix, 1) &&
            !game.verifySpaceBelow(matrix, 2)) {
            done();
        } else {
            done('Space below verification is wrong.');
        }
    });
    it('check if there is space right', function(done) {
        var matrix = game.createMatrix(3, 3);
        if(game.verifySpaceRight(matrix, 1) &&
            !game.verifySpaceRight(matrix, 2)) {
            done();
        } else {
            done('Space right verification is wrong.');
        }
    });
    it('check if there is space left', function(done) {
        var matrix = game.createMatrix(3, 3);
        if(game.verifySpaceLeft(matrix, 1) &&
            !game.verifySpaceLeft(matrix, 0)) {
            done();
        } else {
            done('Space left verification is wrong.');
        }
    });

    it('check space around', function(done) {
        var matrix = game.createMatrix(3, 3);
        if(  game.verifySpaceAround(matrix, 1, 1) 
            && !game.verifySpaceAround(matrix, 0, 0)
            && !game.verifySpaceAround(matrix, 0, 1) 
            && !game.verifySpaceAround(matrix, 0, 2) 
            && !game.verifySpaceAround(matrix, 1, 0) 
            && !game.verifySpaceAround(matrix, 1, 2) 
            && !game.verifySpaceAround(matrix, 2, 0) 
            && !game.verifySpaceAround(matrix, 2, 1) 
            && !game.verifySpaceAround(matrix, 2, 2)
            ) {
            done();
        } else {
            done(new Error('Space around verification is wrong.'));
        }
    })

    it('put bomb', function(done) {
        var matrix = game.createMatrix(4, 3);
        matrix = game.putBomb(matrix, 1, 1);
        if(matrix[1][1] == game.bomb) {
            done();
        } else {
            done(
                new Error('Bomb hasn\'t been planted. Counter terrorists win.')
            );
        }
    });
    
    it('bomb counter around for one bomb', function(done) {
        var matrix = game.createMatrix(4, 4);
        matrix = game.putBomb(matrix, 1, 1);
        matrix = game.bombCounter(matrix, 1, 1);
        if(
            // Check above
            matrix[0][0] == 1 && matrix[1][0] == 1 && matrix[2][0] == 1
            // check right and left
            && matrix[0][1] == 1 && matrix[2][1] == 1
            // check below
            && matrix[0][2] == 1 && matrix[1][2] == 1 && matrix[2][2] == 1
        ) {
            done();
        } else {
            done(new Error('Counter for one bomb is wrong.'));
        }
    });

    it('bomb counter around for two bombs', function(done) {
        var matrix = game.createMatrix(4, 3);
        matrix = game.putBomb(matrix, 1, 1);
        matrix = game.putBomb(matrix, 2, 1);
        matrix = game.bombCounter(matrix, 1, 1);
        matrix = game.bombCounter(matrix, 2, 1);
        if(
            // Check above
            matrix[0][0] == 1 && matrix[1][0] == 2 
            && matrix[2][0] == 2 && matrix[3][0] == 1
            // check right and left
            && matrix[0][1] == 1 && matrix[3][1] == 1
            // check below
            && matrix[0][2] == 1 && matrix[1][2] == 2 
            && matrix[2][2] == 2 && matrix[3][2] == 1
            // check if bombs still bombs
            && matrix[1][1] == game.bomb && matrix[2][1] == game.bomb

        ) {
            done();
        } else {
            done(new Error('Counter for two bombs is wrong.'));
        }
    });

    it('bomb counter for bomb in the corner', function(done) {
        var matrix = game.createMatrix(2, 2);
        matrix = game.putBomb(matrix, 0, 0);
        matrix = game.bombCounter(matrix, 0, 0);
        if(
            // check right and left
            matrix[1][0] == 1
            // check below
            && matrix[0][1] == 1 && matrix[1][1] == 1

        ) {
            done();
        } else {
            done(new Error('Counter for two bombs is wrong.'));
        }
    })
})