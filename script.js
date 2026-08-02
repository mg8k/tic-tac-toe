

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
            printBoard();
            return 1;
        }
        printBoard();
        return 0;



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
                    return "X";
                }else if(playerTwoRowCounter == 3 || playerTwoColCounter == 3 ||playerTwoDiaCounter == 3 || playerTwoDiaOpCounter == 3){
                    console.log("Player 2 is the winner");
                    return "O";
                }

        }
        if (drawState){
            console.log("draw")
            return "draw";
            }
    }
    const clearBoard = () =>{


    for(let i = 0; i<rows; i++){
        board[i] = [];
        for(let j =0; j< columns; j++){
            board[i].push(Cell());
        }
    
    }
    };
    return{getBoard, printBoard, pickSquare,checkWinner, clearBoard}

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
    const board = gameBoard();
    let gameOver;
    let result;
    

    const switchPlayerTurn = ()=>{
        if (activePlayer == players[0]) {
            activePlayer = players[1]
        }else{
            activePlayer = players[0]
        };
    }
    const playRound = (row,column)=>{
        if(gameOver) return;
        if(!board.pickSquare(row,column,activePlayer.value)){
            console.log("space is occupied.")
            return;
        }
        result = board.checkWinner();
        if(result){
            gameOver = true;
            return;
        }
        switchPlayerTurn();
    }
    const restartGame= ()=>{
        board.clearBoard();
        gameOver = false;
        activePlayer = players[0];
    }
    // board.printBoard();
    const getBoard = ()=> board.getBoard();
    const getWinner = () => board.checkWinner();
    return {playRound,restartGame,getBoard,getWinner};
};


const mainApp = (()=>{

    const body = document.querySelector("body");

    const container = document.createElement("div");

    const tictactoe = document.createElement("div");
    const restartBtn = document.createElement("button");
    const result = document.createElement("div");    

    const playersDiv = document.createElement("div");
    const player1Div = document.createElement("div");
    const player2Div = document.createElement("div");

    const player1 = document.createElement("input");
    const player2 = document.createElement("input");
    const player1Label = document.createElement("label");
    const player2Label = document.createElement("label");
    player1Label.textContent = "Player 1"
    player2Label.textContent = "Player 2"

    const game= gameController(player1.value || "Player one"
        ,player2.value|| "player two");
    const myboard = game.getBoard();


    player1.setAttribute("type", "text");
    player1.setAttribute("id", "playerOne");
    player1Label.setAttribute("for", "playerOne");

    player2.setAttribute("type", "text");
    player2.setAttribute("id", "playerTwo");
    player2Label.setAttribute("for", "playerTwo");
    
    restartBtn.textContent = "New Game / Restart";
    result.classList.add("result");
    tictactoe.classList.add("tictactoe");
    restartBtn.classList.add("restart-btn");
    container.classList.add("container");

    result.textContent = "New Game please input players 1 and 2 names.";

    player1Div.classList.add("player1Div");
    player2Div.classList.add("player2Div");

    playersDiv.classList.add("playersDiv");


    player1Div.appendChild(player1Label);
    player1Div.appendChild(player1);

    player2Div.appendChild(player2Label);
    player2Div.appendChild(player2);

    playersDiv.appendChild(player1Div);
    playersDiv.appendChild(player2Div);

    container.appendChild(result);
    container.appendChild(tictactoe);
    container.appendChild(restartBtn);
    container.appendChild(playersDiv);



        restartBtn.addEventListener("click", () =>{
            game.restartGame();
            tictactoe.querySelectorAll(".cell").forEach((cell)=>{
                cell.textContent="";
                result.textContent = "New Game";
            });
        });


    for(let i =0; i < 3; i++){
        for(let j =0 ; j < 3; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click",() => {
                if(player1.value == "" || player2.value == ""){
                    result.textContent = "Please input players 1 and 2 names!"
                    result.style.fontWeight="bolder"
                    player1.focus();
                    return;
                }
                game.playRound(i,j);
                cell.textContent = myboard[i][j].getValue();
                result.style.fontWeight="normal"
                result.textContent = "New Game"

                const winner = game.getWinner();
                switch (winner){
                    case "X":
                    result.textContent = `${player1.value} is the Winner.`;
                        break;
                    case "O":
                        result.textContent = `${player2.value} is the Winner`;
                        break;
                    case "draw":
                        result.textContent = "Draw";
                        return;
                    default:
                        break;

                }
            })

            tictactoe.appendChild(cell);
        }
    }
    body.appendChild(container);

})();

