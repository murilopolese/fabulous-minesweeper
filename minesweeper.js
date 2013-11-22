var game = {
    bomb: 'bomb',
    createMatrix: function(w, h) {
        var matrix = new Array(w);
        for(var x = 0; x < w; x++) {
            matrix[x] = new Array(h);
            for(var y = 0; y < h; y++) {
                matrix[x][y] = 0;
            }
        }
        return matrix;
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
        if(this.verifySpaceAround(matrix, x, y)) {
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
    }

}
module.exports = game;