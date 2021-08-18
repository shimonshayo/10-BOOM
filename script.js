

let boardGame = document.getElementsByClassName('boardGame')[0],
    boardXArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    squaresArray = [],
    hitsArray = [],
    boardSize = 10, 
    boardBOOMs = 10;
    counterMiss = 0;

function createBoard() { 
    const BOOMsArray = Array(boardBOOMs).fill('BOOM'), 
        emptyArray = Array(boardSize * boardSize - boardBOOMs).fill('empty'), 
        boardArray = emptyArray.concat(BOOMsArray), 
        shuffledArray = boardArray.sort(() => Math.random() - 0.5); //math.random() gives you a value between 0 and 1. by subtracting 0.5 you will get values between -0.5 and 0.5

    //setting two dimensional arrays
    for (let indexY = 0; indexY < boardSize; indexY++) {
        for (let indexX = 0; indexX < boardSize; indexX++) {
            var boardSquare = document.createElement('div');
            boardSquare.setAttribute('yAxis', indexY + 1);
            boardSquare.setAttribute('xAxis', boardXArray[indexX]);
            boardSquare.addEventListener('click', function (e) { boardEvent(e); }, false);

            boardSquare.classList.add('empty');

            if (indexX % 10 === 0) {
                boardSquare.classList.add('label-y-axis');
            }

            if (indexY % 10 === 0) {
                boardSquare.classList.add('label-x-axis');
            }

            squaresArray.push(boardSquare);

        }

    }

    //using the two dimensional array
    for (let index = 0; index < squaresArray.length; index++) {
        squaresArray[index].setAttribute('tabIndex', index + 1);
        squaresArray[index].classList.add(shuffledArray[index]);
        boardGame.appendChild(squaresArray[index])
    }

}


function boardEvent(e) {
    var allBoardSquares = boardGame.getElementsByClassName('empty');

    if (!e.target.classList.contains('HIT--')) {
        if (hitsArray.length === boardBOOMs - 1) setTimeout(function () {
            for (let index = 0; index < allBoardSquares.length; index++) {
                allBoardSquares[index].classList.add('WIN--');
            }
           
            alert('You Won!');

            return
        }, 240);

        if (e.target.classList.contains('BOOM')) {
            e.target.classList.add('HIT--');
            hitsArray.push(e.target);
        }

        if (!e.target.classList.contains('BOOM')) e.target.classList.add('MISS--' , counterMiss++);
        
        if(counterMiss>=6){
            alert('You lost, please try again');
        }
    }

}

createBoard();


