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
    });

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
    });

    it('put 10 random bombs', function(done) {
        var w = 5; // matrix width
        var h = 5; // matrix height
        var bombs = 10; // How many bombs
        var nBombs = 0; // Bomb counter

        var matrix = game.createMatrix(w, h);
        matrix = game.putRandomBombs(matrix, bombs);
        for(var x = 0; x < w; x++) {
            for(var y = 0; y < h; y++) {
                if(matrix[x][y] == game.bomb) {
                    nBombs++;
                }
            }
        }
        if(nBombs == bombs) {
            done();
        } else {
            done(new Error('putRandomBombs is not working.'));
        }
    });
});

describe('Game Operations', function() {

    it('Create game matrix', function(done) {
        var rMatrix = game.createMatrix(2, 2, game.hidden);
        if(rMatrix[0][0] == game.hidden) {
            done();
        } else {
            done(new Error('Hidden matrix is not working.'));
        }
    });

    it('Open tile', function(done) {
        var matrix = game.createMatrix(3, 3);
        matrix = game.putBomb(matrix, 1, 1);
        matrix = game.bombCounter(matrix, 1, 1);
        
        var rMatrix = game.createMatrix(5, 5, game.hidden);
        rMatrix = game.openTile(matrix, rMatrix, 0, 0);
        rMatrix = game.openTile(matrix, rMatrix, 1, 1);
        
        if( rMatrix[0][0] == 1
            && rMatrix[1][1] == game.bomb
            && rMatrix[0][2] == game.hidden) {
            done();
        } else {
            done(new Error('Open tile is not working.'));
        }
    });

    it('Recursive open tiles around', function(done) {
        var matrix = game.createMatrix(4, 4);
        matrix = game.putBomb(matrix, 1, 1);
        matrix = game.bombCounter(matrix, 1, 1);
        
        var rMatrix = game.createMatrix(4, 4, game.hidden);
        rMatrix = game.openTile(matrix, rMatrix, 3, 0);
        if( rMatrix[3][0] == 0
            && rMatrix[3][1] == 0
            && rMatrix[3][2] == 0
            && rMatrix[3][3] == 0
            && rMatrix[0][3] == 0
            && rMatrix[1][3] == 0
            && rMatrix[2][3] == 0
            ) {
            done();
        } else {
            done(new Error('Recursive open tiles is not working.'));
        }
    });

    it('Check win', function(done) {
        var matrix = game.createMatrix(6, 6);
        matrix = game.putBomb(matrix, 2, 2);
        matrix = game.bombCounter(matrix, 2, 2);

        var rMatrix = game.createMatrix(6, 6, game.hidden);
        rMatrix = game.openTile(matrix, rMatrix, 0, 0);
        var win = game.checkWin(matrix, rMatrix);
        
        var rMatrix2 = game.createMatrix(6, 6, game.hidden);
        rMatrix = game.openTile(matrix, rMatrix2, 1, 1);
        var win2 = game.checkWin(matrix, rMatrix2);

        if(win && !win2) {
            done();
        } else {
            done(new Error('Check win is not working,'))
        }

    })

})
