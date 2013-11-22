(function() {
    var game = {};

    // global on the server, window in the browser
    var root, previous_game;

    root = this;
    if (root != null) {
      previous_game = root.game;
    }

    // GAME PROPERTIES
    game.bomb = 'b';
    game.hidden = 'h';
    
    // MATRIX OPERATIONS
    game.createMatrix = function(w, h, initValue) {
        if(initValue == undefined) {
            initValue = 0;
        }
        var matrix = new Array(w);
        for(var x = 0; x < w; x++) {
            matrix[x] = new Array(h);
            for(var y = 0; y < h; y++) {
                matrix[x][y] = initValue;
            }
        }
        return matrix;
    };
    game.verifyInsideMatrix = function(matrix, x, y) {
        if(x >=0 && x <= matrix.length-1
            && y >= 0 && y <= matrix[0].length-1) {
            return true;
        }
        return false;
    };
    game.verifySpaceAround = function(matrix, x, y) {
        if( this.verifySpaceAbove(matrix, y)  
            && this.verifySpaceBelow(matrix, y) 
            && this.verifySpaceRight(matrix, x) 
            && this.verifySpaceLeft(matrix, x)
            ) {
            return true;
        }
        return false;
    };
    game.putBomb = function(matrix, x, y) {
        if(this.verifyInsideMatrix(matrix, x, y)) {
            matrix[x][y] = this.bomb;
        }
        return matrix;
    };
    game.verifySpaceAbove = function(matrix, y) {
        if(y > 0) {
            return true;
        }
        return false;
    };
    game.verifySpaceBelow = function(matrix, y) {
        if(matrix[0] != undefined &&
            y < matrix[0].length-1) {
            return true;
        }
        return false;
    };
    game.verifySpaceRight = function(matrix, x) {
        if(x < matrix.length-1) {
            return true;
        }
        return false;
    };
    game.verifySpaceLeft = function(matrix, x, y) {
        if(x > 0) {
            return true;
        }
        return false;
    };
    game.checkBomb = function(tile) {
        return tile == this.bomb;
    };
    game.bombCounter = function(matrix, x, y) {
        if(this.verifySpaceAbove(matrix, y)
            && !this.checkBomb(matrix[x][y-1])
            ) {
            // Add countar above
            matrix[x][y-1]++;
        }
        if(this.verifySpaceLeft(matrix, x)
            && !this.checkBomb(matrix[x-1][y]) 
            ) {
            // Add counter left
            matrix[x-1][y]++;
        }
        if(this.verifySpaceRight(matrix, x)
            && !this.checkBomb(matrix[x+1][y])
            ) {
            // Add counter right
            matrix[x+1][y]++;
        }
        if(this.verifySpaceBelow(matrix, y)
            && !this.checkBomb(matrix[x][y+1])
            ) {
            // Add counter below
            matrix[x][y+1]++;
        }
        if(this.verifySpaceAbove(matrix, y)
            && this.verifySpaceLeft(matrix, x)
            && !this.checkBomb(matrix[x-1][y-1])
            ) {
            // Add countar above and left
            matrix[x-1][y-1]++;
        }
        if(this.verifySpaceAbove(matrix, y)
            && this.verifySpaceRight(matrix, x)
            && !this.checkBomb(matrix[x+1][y-1])
            ) {
            // Add countar above and right
            matrix[x+1][y-1]++;
        }
        if(this.verifySpaceBelow(matrix, y)
            && this.verifySpaceLeft(matrix, x)
            && !this.checkBomb(matrix[x-1][y+1])
            ) {
            // Add countar below and left
            matrix[x-1][y+1]++;
        }

        if(this.verifySpaceBelow(matrix, y)
            && this.verifySpaceRight(matrix, x)
            && !this.checkBomb(matrix[x+1][y+1])
            ) {
            // Add countar below and right
            matrix[x+1][y+1]++;
        }
        return matrix;
    };
    game.putRandomBombs = function(matrix, n) {
        var bombsLeft = n;
        while(bombsLeft > 0) {
            result = this.putRandomBomb(matrix, bombsLeft);
            bombsLeft = result.bombsLeft;
            matrix = result.matrix;
        }
        return matrix;
    };
    // This function will return how many bombs are left 
    // and the modified matrix
    game.putRandomBomb = function(matrix, nBombs) {
        // Generate random cordinates
        var rX = parseInt(Math.random()*matrix.length);
        var rY = parseInt(Math.random()*matrix[0].length);
        if(!this.checkBomb(matrix[rX][rY])) {
            matrix = this.putBomb(matrix, rX, rY);
            matrix = this.bombCounter(matrix, rX, rY);
            nBombs--;
            return {
                bombsLeft: nBombs, 
                matrix: matrix
            };
        } else {
            return this.putRandomBomb(matrix, nBombs);
        }
    };
    
    // GAME OPERATIONS
    game.openTile = function(matrix, rMatrix, x, y) {
        if(this.verifyInsideMatrix(matrix, x, y)
            && rMatrix[x][y] == game.hidden) {
            // Reveal tile
            rMatrix[x][y] = matrix[x][y];
            // If is not 0, just reveal it
            if(matrix[x][y] != 0) {
                return rMatrix;
            } else {
                return this.openTilesAround(matrix, rMatrix, x, y);
            }

        } 
        return rMatrix;
    };
    game.openTilesAround = function(matrix, rMatrix, x, y) {
        // Open above
        rMatrix = this.openTile(matrix, rMatrix, x, y-1);
        // Open below
        rMatrix = this.openTile(matrix, rMatrix, x, y+1);
        // Open above and left
        rMatrix = this.openTile(matrix, rMatrix, x-1, y-1);
        // Open above and right
        rMatrix = this.openTile(matrix, rMatrix, x+1, y-1);
        // Open left
        rMatrix = this.openTile(matrix, rMatrix, x-1, y);
        // Open right
        rMatrix = this.openTile(matrix, rMatrix, x+1, y);
        // Open below and left
        rMatrix = this.openTile(matrix, rMatrix, x-1, y+1);
        // Open below and right
        rMatrix = this.openTile(matrix, rMatrix, x+1, y+1);
        return rMatrix;
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = game;
    }
    // included directly via <script> tag
    else {
        root.game = game;
    }
}());