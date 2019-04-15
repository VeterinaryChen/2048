var board = new Array();
var score = 0;

$(document).ready(function () {
    newgame();
});

function newgame(){
    //init board
    init();
    //Generate two number in random if the grid is blank
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for (var i=0 ; i<4 ; i++){
        for(var j=0 ; j<4 ; j++){
            var gridCell = $('#grid-cell-'+i+'-'+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for(var i=0 ; i<4 ; i++){
        board[i]=new Array();
        for (var j=0 ; j<4 ; j++){
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView(){
    //delete all number-cell
    $('.number-cell').remove();

    //add new number-cell to all grid-cell
    for(var i=0 ; i<4 ; i++){
        for (var j=0 ; j<4 ;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
            }

        }

    }
}

function generateOneNumber(){

    if (nospace(board)){
        return false;
    }

    //Random Position
    var randomPositionX = parseInt(Math.floor(Math.random()*4));
    var randomPositionY = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randomPositionX][randomPositionY]==0){
            break;
        }
        randomPositionX = parseInt(Math.floor(Math.random()*4));
        randomPositionY = parseInt(Math.floor(Math.random()*4));
    }

    //Random Number
    var randomNumber = Math.random()<0.5?2:4;

    //Display Random Number
    board[randomPositionX][randomPositionY] = randomNumber;

    showNumberWithAnimation(randomPositionX,randomPositionY,randomNumber);

    return true;
}