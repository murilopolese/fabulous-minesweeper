var game = {
    createMatrix: function(w, h) {
        var matrix = new Array(w);
        for(var x = 0; x < w; x++) {
            matrix[x] = new Array(h);
            for(var y = 0; y < h; y++) {
                matrix[x][y] = 0;
            }
        }
        return matrix;
    }

}
module.exports = game;