const gameBoard = (function() {
    let boardArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const addToken = (tokenType, rowPosition, columnPosition) => {boardArray[rowPosition][columnPosition] = tokenType};
    const getBoard = () => {return boardArray};
    const getBoardPosition = (row, column) => {return boardArray[row][column]};
    const printBoard = () => {
        boardArray.forEach((row, index) => {
            console.log(row.map(cell => cell || " ").join(" | "));
            if (index < boardArray.length - 1) {
                console.log("---+---+---"); // Separator line between rows
            }
        });
    }
    const resetBoard = () => {boardArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]};

    return {addToken,getBoard, getBoardPosition, printBoard, resetBoard};
}) ();

export {gameBoard};