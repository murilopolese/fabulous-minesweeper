// Enable cheat
var matrix;
var rMatrix;
var boardSize = 8;
var amountOfBombs = 10;
$(document).ready(function() {
    console.log('Choose your weapons.');
    
    
    matrix = game.createMatrix(boardSize, boardSize);
    matrix = game.putRandomBombs(matrix, amountOfBombs);

    rMatrix = game.createMatrix(boardSize, boardSize, game.hidden);
    renderBoard();

    $('#game').on('click', '.tile', function() {
        game.openTile(matrix, rMatrix, $(this).data('x'), $(this).data('y'));
        renderBoard();
        return false;
    })
    
})
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
var checkWin = function() {
    if(game.checkWin(matrix, rMatrix)) {
        $('#checkWin').html(':D');
        console.log('Parabéns!')
    } else {
        $('#checkWin').html(':C');
        console.log('Try again and harder!');
    }
};
var newGame = function() {
    matrix = game.createMatrix(boardSize, boardSize);
    matrix = game.putRandomBombs(matrix, amountOfBombs);
    rMatrix = game.createMatrix(boardSize, boardSize, game.hidden);
    $('#checkWin').html(':|');
    renderBoard();
}
