import { player } from "./player.js";
import { gameBoard } from "./gameBoard.js";
import { screenController } from "./screenController.js";

const boardManager = (function() {
    let isGameActive = false;
    const totalRounds = 3;
    let currentRound;
    let board = gameBoard;
    let currentPlayer;
    let roundVictory = false;
    let winner;
    let player1;
    let player2;
    currentRound = 1;

    const setPlayerName = function(name_1, name_2) {
        player1 = player(name_1);
        player2 = player(name_2);

        currentPlayer = player1;

    }

    const endGame = function(reset) {
        if (!reset) {
            console.log(`${player1.getRoundScore()} \n ${player2.getRoundScore()}`);
            if (player1.getRoundScore() > player2.getRoundScore()) {
                winner = player1.getPlayerName();
            }
            else if (player1.getRoundScore() < player2.getRoundScore()) {
                winner = player2.getPlayerName();
            }
            else {
                winner = "Draw!";
            }
        }
        isGameActive = false;
        board.resetBoard();
        player1.resetScore();
        player2.resetScore();
        currentRound = 1;

        if (!reset) {
            screenController.endGame(winner);

        }
    }

    const playRound = function(targetRow, targetColumn) {
        isGameActive = true;
        roundVictory = false;
        player1.setTokentype(1);
        player2.setTokentype(2);
        
        if (currentRound <= totalRounds) {
            if (!roundVictory && !checkBoardFull()) {
                setToken(currentPlayer, targetRow, targetColumn);
    
                roundVictory = checkVictory();
                if (roundVictory) {
                    if (currentRound === 3) {
                        currentPlayer.addRoundScore();
                        endGame(false);
                    }
                    else {
                        currentPlayer.addRoundScore();
                        board.resetBoard();
                        currentRound++;
                    }
                }
                if (currentPlayer === player1) {
                    currentPlayer = player2;
                }
                else {
                    currentPlayer = player1;
                }
            } 
        }
        else {
            board.resetBoard();
        }

       
    }

    const setToken = function(player, positionRow, positionColumn) {
        let set = false;
        while (!set) {
            if (board.getBoardPosition(positionRow, positionColumn) === 0) {
                board.addToken(player.getTokenType(), positionRow, positionColumn);
                set = true;
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

    const clearBoard = function() {
        board.resetBoard();
    }

    const getIsGameActive = function() {return isGameActive};

    const setIsGameActive = function(value) {isGameActive = value; console.log(isGameActive)};

    const getScores = function(name) {return [player1.getRoundScore(), player2.getRoundScore()]};

    const getCurrentPlayer = function() {return currentPlayer.getPlayerName()};

    const getCurrentRound = function() {return currentRound};

    const getPlayerName = function() {
        return [player1.getPlayerName(), player2.getPlayerName()];
    }

    return { endGame, playRound, getIsGameActive, setIsGameActive, getScores,
         getCurrentPlayer, getCurrentRound, checkBoardFull, clearBoard, setPlayerName, getPlayerName };
})();

export {boardManager};