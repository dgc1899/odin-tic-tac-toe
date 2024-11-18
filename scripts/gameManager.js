import { player } from "./player.js";
import { gameBoard } from "./gameBoard.js";

const boardManager = (function() {
    let isGameActive = false;
    const totalRounds = 3;
    let currentRound;
    let board = gameBoard;
    let player1 = player("player1");
    let player2 = player("player2");

    const beginGame = function() {
        let winner;
        isGameActive = true;
        currentRound = 1;
        for (let i = 0; i < totalRounds; i++) {
            playRound();
        }
        if (player1.getRoundScore() > player2.getRoundScore()) {
            winner = player1;
        }
        else if (player2.getRoundScore() > player1.getRoundScore()) {
            winner = player2
        }
        else {
            winner = "DRAW";
        }
        console.log("This game is over");
        console.log(`Final scores: Player 1 - ${player1.getRoundScore()} | Player 2 - ${player2.getRoundScore()}`);
        console.log(`The winner is: ${winner.getPlayerName()}`);
    }

    const playRound = function() {
        let roundVictory = false;
        player1.setTokentype(1);
        player2.setTokentype(2);

        board.printBoard();
        let currentPlayer = player1;

        while(!roundVictory && !checkBoardFull()) {
            if (checkBoardFull()) {
                console.log("The board is full!");
                board.resetBoard();
                board.printBoard();
            }
            setToken(currentPlayer);

            roundVictory = checkVictory();
            if (roundVictory) {
                currentPlayer.addRoundScore();
                console.log(`${currentPlayer.getPlayerName()} wins this round!`);
                board.resetBoard();
            }
        
            if (currentPlayer === player1) {
                currentPlayer = player2;
            }
            else {
                currentPlayer = player1;
            }
            
        }
    }

    const setToken = function(player) {
        let set = false;
        while (!set) {
            let position = prompt(`${player.getPlayerName()}, strike at: `);
            let positionRow = position.split(" ")[0];
            let positionColumn = position.split(" ")[1];
            if (board.getBoardPosition(positionRow, positionColumn) === 0) {
                board.addToken(player.getTokenType(), positionRow, positionColumn);
                board.printBoard();
                set = true;
            }
            else {
                console.log("Position already occupied");
            }
        }
    }

    const checkVictory = function() {
        let victory = false;
        const gb = board.getBoard();

        if (checkRows(gb) || checkColumns(gb) || checkDiagonal(gb) || checkInverseDiagonal(gb)) {
            return true;
        }
        return false;
    } 

    const checkRows = function(gb) {
        let results = [false, false, false];
        for (let i = 0; i < 3; i++) {
        let rowValue = gb[i][0];
        for (let j = 0; j < 3; j++) {
            if (rowValue === 0) {
                results[i] = false;
                break;
            }
            else if (gb[i][j] !== rowValue) {
                results[i] = false;
                break;
            }
            else if (j == gb.length - 1) {
                results[i] = true;
            }
        }
      }
      return results.includes(true) ?  true :  false;
    }

    const checkColumns = function(gb) {
        let results = [false, false, false];
        for (let i = 0; i < 3; i++) {
        let columnValue = gb[0][i];
        for (let j = 0; j < 3; j++) {
            if (columnValue === 0) {
                results[i] = false;
                break;
            }
            else if (gb[j][i] !== columnValue) {
                results[i] = false;
                break;
            }
            else if (j == gb.length - 1) {
                results[i] = true;
            }
        }
      }
      return results.includes(true) ?  true :  false;
    }

    const checkDiagonal = function(gb) {
        let diagValue = gb[0][0];
        for (let i = 0; i < 3; i++) {
            if (diagValue === 0) { return false; }
            else if (diagValue !== 0) {
                if (gb[i][i] != diagValue){
                    return false
                }
            }
            
        }
        return true;
    }

    const checkInverseDiagonal = function(gb) {
        for (let i = 2; i >= 0; i--) {
            let j = 2 - i;
            let diagValue = gb[0][2];
            if (diagValue === 0) { return false; }
            else if (diagValue !== 0) {
                if (gb[j][i] != diagValue && diagValue != 0) {
                    return false
                }
            }
        }
        return true;
    }

    const checkBoardFull = function(gb) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.getBoardPosition(i,j) === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    return {beginGame};
})();

export {boardManager};