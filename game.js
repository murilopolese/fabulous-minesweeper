// Enable cheat with these global variables
var matrix;
var rMatrix;
var boardSize = 8;
var amountOfBombs = 10;

$(document).ready(function() {
    console.log('Choose your weapons.');
    newGame();

    // Bind a click event on board tiles
    $('#game').on('click', '.tile', function() {
        game.openTile(matrix, rMatrix, $(this).data('x'), $(this).data('y'));
        renderBoard();
        return false;
    })
    
})
// This function render the board game
var renderBoard = function() {
    $('#game').html('');
    for(var x = 0; x < rMatrix.length; x++) {
        for(var y = 0; y < rMatrix[0].length; y++) {
            // There are the default classes for a tile
            var tileClass = 'tile tile10';
            // By default, a tile has no text inside
            var value = '';
            // If tile is hidden, add class "hidden"
            if(rMatrix[x][y] == game.hidden) {
                tileClass += ' hidden';
            }
            // If tile is a number add class "hidden"
            if(typeof rMatrix[x][y] == 'number') {
                tileClass += ' open';
                value = rMatrix[x][y];
            }
            // NOTE: If it is a bomb, will not add class hidden nor open and
            // the tile will have no background, so it will be dark grey as the
            // board game is.

            // Render tile and append it to board game container
            $('#game').append('<div data-x="'+x+'" data-y="'+y+'" class="'+tileClass+'">'+value+'</div>');
        }
    }
}
// Check game matrix with rendered matrix to check if you won
var checkWin = function() {
    if(game.checkWin(matrix, rMatrix)) {
        $('#checkWin').html(':D');
        console.log('Parabéns!')
    } else {
        $('#checkWin').html(':C');
        console.log('Try again and harder!');
    }
};
// Create a new game (o rly?)
var newGame = function() {
    // Create game board matrix and put random bombs on it
    matrix = game.createMatrix(boardSize, boardSize);
    matrix = game.putRandomBombs(matrix, amountOfBombs);
    // Creating a matrix to render the game board and compare with 
    // the game board matrix
    rMatrix = game.createMatrix(boardSize, boardSize, game.hidden);
    renderBoard();
    
    $('#checkWin').html(':|');
}
