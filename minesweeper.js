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
    verifyLimit: function(matrix, x, y) {
        if(x < matrix.length-1 && x >= 0 &&
           y < matrix.length-1 && y >= 0) {
            return true;
        }
        return false;
    },
    putBomb: function(matrix, x, y) {
        if(this.verifyLimit(matrix, x, y)) {
            matrix[x][y] = this.bomb;
        }
        return matrix;
    },


}
module.exports = game;