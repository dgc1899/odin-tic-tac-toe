import { player } from "./player.js";
import { gameBoard } from "./gameBoard.js";

const boardManager = (function() {
    let isGameActive = false;
    const totalRounds = 3;
    let currentRound;
    let board = gameBoard;
    let currentPlayer;
    let player1 = player("player1");
    let player2 = player("player2");
    let roundVictory = false;

    let winner;
    isGameActive = true;
    currentRound = 1;
    currentPlayer = player1;

    const endGame = function() {
        isGameActive = false;
        board.resetBoard();
        player1.resetScore();
        player2.resetScore();
    }

    const playRound = function(targetRow, targetColumn) {
        player1.setTokentype(1);
        player2.setTokentype(2);

        if (!roundVictory && !checkBoardFull()) {
            if (checkBoardFull()) {
                board.resetBoard();
            }
            setToken(currentPlayer, targetRow, targetColumn);

            roundVictory = checkVictory();
            if (roundVictory) {
                currentPlayer.addRoundScore();
                board.resetBoard();
                endGame();
            }
        
            if (currentPlayer === player1) {
                currentPlayer = player2;
            }
            else {
                currentPlayer = player1;
            }
            
        }
    }

    const setToken = function(player, positionRow, positionColumn) {
        let set = false;
        while (!set) {
            if (board.getBoardPosition(positionRow, positionColumn) === 0) {
                board.addToken(player.getTokenType(), positionRow, positionColumn);
                set = true;
            }
            else {
                //console.log("Position already occupied");
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
                    return false;
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

    const getIsGameActive = function() {return isGameActive};

    const setIsGameActive = function(value) {isGameActive = value; console.log(isGameActive)};

    const getScores = function(name) {return [player1.getRoundScore(), player2.getRoundScore()]};

    const getCurrentPlayer = function() {return currentPlayer.getPlayerName()};

    return { endGame, playRound, getIsGameActive, setIsGameActive, getScores, getCurrentPlayer };
})();

export {boardManager};