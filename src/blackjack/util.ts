export enum GameStates {
    CONTINUE = "Game goes on!",
    PLAYER_WIN = "Player win!",
    PLAYER_LOST = "Player lost!",
    DEALER_WIN = "Dealer win!",
    DEALER_LOST = "Dealer lost!",
    DRAW = "Draw!",
}

export const dealersAnswers = {
    [GameStates.PLAYER_LOST]: ['a', 'aa', 'aaa'],
    [GameStates.PLAYER_WIN]: ['b', 'bb', 'bbb'],
    [GameStates.DEALER_WIN]: ['c', 'cc', 'ccc'],
    [GameStates.DEALER_LOST]: ['d', 'dd', 'ddd'],
    [GameStates.DRAW]: ['e', 'ee', 'eee'],
    [GameStates.CONTINUE]: ['f', 'ff', 'fff'],
} as Record<GameStates, string[]>;

export const CardValues = {
    "A": 11,
    "K": 10,
    "Q": 10,
    "J": 10,
    "10": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
} as Record<string, number>;