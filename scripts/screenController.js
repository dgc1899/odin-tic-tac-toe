import { boardManager } from "./gameManager.js";
import { gameBoard } from "./gameBoard.js";
import { player } from "./player.js";

const screenController = (function() {
    const mainTag = document.querySelector("main");
    const currentPlayerHeader = document.querySelector(".current-player-header");
    const mainContentContainer = document.querySelector(".main-content-container");
    const btnReset = document.querySelector(".buttons>button:nth-of-type(2)");
    const btnStart = document.querySelector(".buttons>button");
    const scoreContainer = document.querySelector(".score");
    const player1Score = document.querySelector(".score>span");
    const player2Score = document.querySelector(".score>span:nth-of-type(2)");
    const currentRound = document.querySelector(".current-round-header");
    const dialog = document.createElement("dialog");

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
                        break;

                }
            } 
        }
    }

    function createModal() {
        dialog.innerHTML = '';
        const form = document.createElement("form");
        const header = document.createElement("h3");
        const container = document.createElement("div");
        const label = document.createElement("label");
        const input = document.createElement("input");
        const container_2 = document.createElement("div");
        const label_2 = document.createElement("label");
        const input_2 = document.createElement("input");
        const btnConfirm = document.createElement("button");

        form.setAttribute("action", "#");
        form.setAttribute("method", "POST");
        form.setAttribute("id", "namesForm");
        form.classList.add("form-container");

        header.innerHTML = "Player names."

        container.classList.add("form-element");
        container_2.classList.add("form-element");

        label.setAttribute("for", "txtPlayer1");
        label.innerHTML = "Player 1: ";

        input.setAttribute("type","text");
        input.setAttribute("id","txtPlayer1");
        input.setAttribute("name","txtPlayer1");

        label_2.setAttribute("for", "txtPlayer2");
        label_2.innerHTML = "Player 2: ";

        input_2.setAttribute("type","text");
        input_2.setAttribute("id","txtPlayer2");
        input_2.setAttribute("name","txtPlayer2");

        btnConfirm.innerHTML = "Confirm";
        btnConfirm.classList.add("form-confirm-button");
        btnConfirm.setAttribute("type", "submit");
        btnConfirm.setAttribute("form", "namesForm");
        btnConfirm.addEventListener("click", (event) => {
            event.preventDefault();
            let player1_name = input.value;
            let player2_name = input_2.value;
            boardManager.setPlayerName(player1_name, player2_name);
            dialog.close();
            player1Score.textContent = `${boardManager.getPlayerName()[0]}: ${boardManager.getScores()[0]}`;
            player2Score.textContent = `${boardManager.getPlayerName()[1]}: ${boardManager.getScores()[1]}`;
        })

        container.appendChild(label);
        container.appendChild(input);
        container_2.appendChild(label_2);
        container_2.appendChild(input_2);
        form.appendChild(container);
        form.appendChild(container_2);
        dialog.append(header);
        dialog.appendChild(form);
        dialog.appendChild(btnConfirm);
        
        document.body.appendChild(dialog);
    }

    function displayModal() {
        document.addEventListener("DOMContentLoaded", event => {
            dialog.showModal();
        })
    }

    function setupGame() {
        createModal();
        mainContentContainer.innerHTML = '';
        drawBoard(gameBoard.getBoard());
        currentPlayerHeader.textContent = "";
        currentPlayerHeader.hidden = true;
        currentRound.textContent = "";
        currentRound.hidden = true;
        btnReset.setAttribute("disabled", "disabled");
        scoreContainer.hidden = true;

        mainContentContainer.addEventListener("click", clickGrid);
        btnStart.addEventListener("click", () => {
            btnStart.setAttribute("disabled", "disabled");
            boardManager.setIsGameActive(true);
            currentPlayerHeader.hidden = false;
            scoreContainer.hidden = false;
            currentPlayerHeader.textContent = `${boardManager.getCurrentPlayer()}'s turn`;
            currentRound.hidden = false;
            currentRound.textContent = `Round ${boardManager.getCurrentRound()}`;
        });
        btnReset.addEventListener("click", resetGame);

        displayModal();
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
        boardManager.endGame(true);
        setupGame();
        btnStart.disabled = false;

    }

    function endGame(winnerName) {
        const endDialog = document.createElement("dialog");
        const announcement = document.createElement("h3");
        const btnClose = document.createElement("button");
        endDialog.classList.add("end-modal");
    
        endDialog.innerHTML = `Congratulations, ${winnerName}, you've won!`
        btnClose.innerHTML = "Close";

        endDialog.appendChild(announcement);
        endDialog.appendChild(btnClose);
        document.body.appendChild(endDialog);

        endDialog.showModal();

        btnClose.addEventListener("click", event => {
            event.preventDefault;
            endDialog.close();
        })

        setupGame();
        btnStart.disabled = false;
    }

    function updateScreen() {
        if (boardManager.getIsGameActive()) {
            if (boardManager.checkBoardFull()) {
                boardManager.clearBoard(); 
            }
            currentPlayerHeader.textContent = `${boardManager.getCurrentPlayer()}'s turn`;
            btnReset.disabled = false;
            player1Score.textContent = `${boardManager.getPlayerName()[0]}: ${boardManager.getScores()[0]}`;
            player2Score.textContent = `${boardManager.getPlayerName()[1]}: ${boardManager.getScores()[1]}`;
        }
        currentRound.textContent = `Round ${boardManager.getCurrentRound()}`;
        mainContentContainer.innerHTML = '';
        drawBoard(gameBoard.getBoard());
    }

    return {setupGame, endGame};
})();

export {screenController};

screenController.setupGame();