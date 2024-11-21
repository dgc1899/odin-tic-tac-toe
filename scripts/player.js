function player(name) {
    const playerName = name;
    let currentRoundScore = 0;
    let tokenType = 0;

    const getPlayerName = () => {return playerName};
    const addRoundScore = () => {currentRoundScore++};
    const getRoundScore = () => {return currentRoundScore};
    const resetScore = () => {currentRoundScore = 0};
    const getTokenType = () => {return tokenType};
    const setTokentype = (token) => {tokenType = token};

    return {getPlayerName, addRoundScore, getRoundScore, resetScore, getTokenType, setTokentype};
}

export {player};