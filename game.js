$(document).ready(function() {
    console.log('Choose your weapons.');
    
    var renderBoard = function() {
        $('#game').html('');
        for(var x = 0; x < matrix.length; x++) {
            for(var y = 0; y < matrix[0].length; y++) {
                var tileClass = 'tile tile10';
                var value = '';
                if(rMatrix[x][y] == game.hidden) {
                    tileClass += ' hidden';
                }
                if(typeof rMatrix[x][y] == 'number') {
                    tileClass += ' open';
                    value = rMatrix[x][y];
                }
                $('#game').append('<div data-x="'+x+'" data-y="'+y+'" class="'+tileClass+'">'+value+'</div>');
            }
        }
    }
    
    var matrix = game.createMatrix(10, 10);
    matrix = game.putRandomBombs(matrix, 10);
    var rMatrix = game.createMatrix(10, 10, game.hidden);
    renderBoard();

    $('#game').on('click', '.tile', function() {
        game.openTile(matrix, rMatrix, $(this).data('x'), $(this).data('y'));
        renderBoard();
        return false;
    })
    
})
