import { boardManager } from "./gameManager.js";
import { gameBoard } from "./gameBoard.js";
import { player } from "./player.js";

const screenController = (function() {
    const currentPlayerHeader = document.querySelector(".current-player-header");
    const mainContentContainer = document.querySelector(".main-content-container");
    const btnReset = document.querySelector(".buttons>button:nth-of-type(2)");
    const btnStart = document.querySelector(".buttons>button");
    const scoreContainer = document.querySelector(".score");
    const player1Score = document.querySelector(".score>span");
    const player2Score = document.querySelector(".score>span:nth-of-type(2)");

    let currentPlayer;

    function drawBoard(values) {
        //Method will create board and initialize player counters and hide current player header
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const gameSquare = document.createElement("button");
                gameSquare.classList.add("game-button");
                gameSquare.setAttribute("data-row", `${i}`);
                gameSquare.setAttribute("data-column", `${j}`);
                gameSquare.setAttribute("data-value", values[i][j]);
                mainContentContainer.appendChild(gameSquare);
                switch (values[i][j]) {
                    case 0:
                        gameSquare.textContent = "";
                        break;
                    case 1:
                        gameSquare.textContent = "X";
                        break;
                    case 2:
                            gameSquare.textContent = "O";

                }
            } 
        }
    }
    function setupGame() {
        drawBoard(gameBoard.getBoard());
        currentPlayerHeader.textContent = "";
        currentPlayerHeader.hidden = true;
        btnReset.setAttribute("disabled", "disabled");
        scoreContainer.hidden = true;

        mainContentContainer.addEventListener("click", clickGrid);
        btnStart.addEventListener("click", () => {boardManager.setIsGameActive(true)});
    }

    function clickGrid(event) {
        if (boardManager.getIsGameActive()) {
            if (event.target.tagName === "BUTTON" && Number(event.target.getAttribute("data-value")) === 0) {
                const row = Number(event.target.getAttribute("data-row"));
                const column  = Number(event.target.getAttribute("data-column"));
                boardManager.playRound(row, column);
                updateScreen();
            }
        }
    }
    function resetGame() {
        
    }
    function updateScreen() {
        currentPlayerHeader.textContent = `${boardManager.getCurrentPlayer()}'s turn`;
        currentPlayerHeader.hidden = false;
        currentPlayerHeader.hidden = false;
        scoreContainer.hidden = false;
        mainContentContainer.innerHTML = '';
        drawBoard(gameBoard.getBoard());
        player1Score.textContent = `Player 1: ${boardManager.getScores()[0]}`;
        player2Score.textContent = `Player 2: ${boardManager.getScores()[1]}`;
    
    }

    return {setupGame};
})();

screenController.setupGame();