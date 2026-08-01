

function gameBoard() {
    let columns = 3;
    let rows = 3;
    let board = [];

    for(let i = 0; i<rows; i++){
        board[i] = [];
        for(let j =0; j< columns; j++){
            board[i].push(Cell());
        }
    }
    const printBoard = () =>{
        const printBoardWithValue =board.map((row)=> row.map((cell)=> cell.getValue())
        );
        console.log(printBoardWithValue);

    }
    const getBoard = () => board;
    
    const pickSquare = (row,column,player) =>{
        if(board[row][column].getValue() == ''){
            board[row][column].addChoice(player);
        }
        printBoard();
    }
    const checkWinner = () =>{
        let playerOneRowCounter;
        let playerOneColCounter;

        let playerTwoRowCounter ;
        let playerTwoColCounter;  

        let playerOneDiaCounter = 0;
        let playerTwoDiaCounter = 0;

        let playerOneDiaOpCounter= 0;
        let playerTwoDiaOpCounter= 0;

        let drawState = true;



        for(let i = 0; i<rows; i++){

            playerOneRowCounter = 0;
            playerOneColCounter = 0;

            playerTwoRowCounter = 0;
            playerTwoColCounter = 0;

            if(board[i][i].getValue() == "X"){
                    playerOneDiaCounter++;
                    // console.log('dia 2 counter: ', playerOneDiaCounter);
            }
            if(board[i][i].getValue() == "O"){
                    playerTwoDiaCounter++;
                    // console.log('dia 2 counter: ', playerTwoDiaCounter);
            }

  
            if(board[i][2-i].getValue() == "X"){
                playerOneDiaOpCounter++;
                // console.log('dia 2 p1 counter: ', playerOneDiaOpCounter);
            }
            if(board[i][2-i].getValue() == "O"){
                playerTwoDiaOpCounter++;
                // console.log('dia 2 p2 counter: ', playerTwoDiaOpCounter);
            }
            

            for(let j =0; j< columns; j++){

                if(board[i][j].getValue() == "X"){
                    playerOneRowCounter++;
                    // console.log('counter: ', playerOneRowCounter);
                }
                if(board[j][i].getValue() == "X"){
                    playerOneColCounter++;
                    // console.log('counter: ', playerOneColCounter);
                }
                if(board[i][j].getValue() == "O"){
                    playerTwoRowCounter++;
                    // console.log('counter: ', playerTwoRowCounter);
                }
                if(board[j][i].getValue() == "O"){
                    playerTwoColCounter++;
                    // console.log('counter: ', playerTwoColCounter);
                }
                if(board[i][j].getValue() == ''){
                    drawState = false;
                }


                
            }
                if(playerOneRowCounter == 3 || playerOneColCounter == 3 ||  playerOneDiaCounter == 3|| playerOneDiaOpCounter ==3){
                    console.log("Player 1 is the winner");
                    return;
                }else if(playerTwoRowCounter == 3 || playerTwoColCounter == 3 ||playerTwoDiaCounter == 3 || playerTwoDiaOpCounter == 3){
                    console.log("Player 2 is the winner");
                    return;
                }

        }
        if (drawState){
            console.log("draw")
            }
    }
    return{getBoard, printBoard, pickSquare,checkWinner}

};
function Cell(){
    let value = '';

    const addChoice = (player) => {
        value = player;
    };
    const getValue = () => value;

    return {addChoice, getValue};
}
function gameController(
    playerOneName = 'player one',
    playerTwoName = 'player two'
){
    const players = [{
        name: playerOneName,
        value: 'X'
    },{
        name: playerTwoName,
        value:'O'
    }];

    let activePlayer = players[0];
    board = gameBoard();
    

    const switchPlayerTurn = ()=>{
        if (activePlayer == players[0]) {
            activePlayer = players[1]
        }else{
            activePlayer = players[0]
        };
    }
    const playRound = (row,column)=>{
        if(board.pickSquare(row,column,activePlayer.value)){
            switchPlayerTurn();
            board.checkWinner();
        }else{
            console.log("space is occupied.")
        }
    
    }
    board.printBoard();
    return {board, playRound};
};

game= gameController();