var game = {
    // GAME PROPERTIES
    bomb: 'b',
    hidden: 'h',
    
    // MATRIX OPERATIONS
    createMatrix: function(w, h, initValue) {
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
    },
    verifyInsideMatrix: function(matrix, x, y) {
        if(x >=0 && x <= matrix.length-1
            && y >= 0 && y <= matrix[0].length-1) {
            return true;
        }
        return false;
    },
    verifySpaceAround: function(matrix, x, y) {
        if( this.verifySpaceAbove(matrix, y)  
            && this.verifySpaceBelow(matrix, y) 
            && this.verifySpaceRight(matrix, x) 
            && this.verifySpaceLeft(matrix, x)
            ) {
            return true;
        }
        return false;
    },
    putBomb: function(matrix, x, y) {
        if(this.verifyInsideMatrix(matrix, x, y)) {
            matrix[x][y] = this.bomb;
        }
        return matrix;
    },
    verifySpaceAbove: function(matrix, y) {
        if(y > 0) {
            return true;
        }
        return false;
    },
    verifySpaceBelow: function(matrix, y) {
        if(matrix[0] != undefined &&
            y < matrix[0].length-1) {
            return true;
        }
        return false;
    },
    verifySpaceRight: function(matrix, x) {
        if(x < matrix.length-1) {
            return true;
        }
        return false;
    },
    verifySpaceLeft: function(matrix, x, y) {
        if(x > 0) {
            return true;
        }
        return false;
    },
    checkBomb: function(tile) {
        return tile == this.bomb;
    },
    bombCounter: function(matrix, x, y) {
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
    },
    putRandomBombs: function(matrix, n) {
        var bombsLeft = n;
        while(bombsLeft > 0) {
            result = this.putRandomBomb(matrix, bombsLeft);
            bombsLeft = result.bombsLeft;
            matrix = result.matrix;
        }
        return matrix;
    },
    // This function will return how many bombs are left 
    // and the modified matrix
    putRandomBomb: function(matrix, nBombs) {
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
    },
    
    // GAME OPERATIONS
    openTile: function(matrix, rMatrix, x, y) {
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
    },
    openTilesAround: function(matrix, rMatrix, x, y) {
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
    }
}
module.exports = game;