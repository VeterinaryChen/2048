var board = new Array();
var score = 0;

$(document).ready(function () {
    newgame();
});

function newgame() {
    //init board
    init();
    //Generate two number in random if the grid is blank
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    //delete all number-cell
    $('.number-cell').remove();

    //add new number-cell to all grid-cell
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {

    if (nospace(board)) {
        return false;
    }

    //Random Position
    var randomPositionX = parseInt(Math.floor(Math.random() * 4));
    var randomPositionY = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randomPositionX][randomPositionY] == 0) {
            break;
        }
        randomPositionX = parseInt(Math.floor(Math.random() * 4));
        randomPositionY = parseInt(Math.floor(Math.random() * 4));
    }

    //Random Number
    var randomNumber = Math.random() < 0.5 ? 2 : 4;

    //Display Random Number
    board[randomPositionX][randomPositionY] = randomNumber;

    showNumberWithAnimation(randomPositionX, randomPositionY, randomNumber);

    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default:
            break;
    }
})


function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move and add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        //move and add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[j][i] != 0) {
                for (var k = j + 1; k < 4; k++) {
                    if (board[k][i] == 0 && noBlockVertical(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    } else if (board[k][i] == board[j][i] && noBlockVertical(i, j, k, board)) {
                        //move and add
                        showMoveAnimation(i, j, k, j);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[j][i] != 0) {
                for (var k = j - 1; k < 4; k++) {
                    if (board[k][i] == 0 && noBlockVertical(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    } else if (board[k][i] == board[j][i] && noBlockVertical(i, j, k, board)) {
                        //move and add
                        showMoveAnimation(i, j, k, j);
                        board[k][i] += board[j][i];
                        board[j][i] = 0;
                        score += board[k][i];
                        updateScore(score);
                        continue;
                    }
                }

            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board))
        gameover();
}

function gameover() {
    alert("gameover!");
}