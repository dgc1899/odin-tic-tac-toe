function player(name) {
    const playerName = name;
    let currentRoundScore = 0;
    let currentGameScore = 0;
    let tokenType = 0;

    const getPlayerName = () => {return playerName};
    const addRoundScore = () => {currentRoundScore++};
    const getRoundScore = () => {return currentRoundScore};
    const addGameScore = () => {currentGameScore++};
    const getGameScore = () => {return currentGameScore};
    const getTokenType = () => {return tokenType};
    const setTokentype = (token) => {tokenType = token};

    return {getPlayerName, addRoundScore, getRoundScore, getTokenType, setTokentype};
}

export {player};