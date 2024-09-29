export enum GameStates {
    CONTINUE = "Game goes on!",
    PLAYER_WIN = "Player win!",
    PLAYER_LOST = "Player lost!",
    DEALER_WIN = "Dealer win!",
    DEALER_LOST = "Dealer lost!",
    DRAW = "Draw!",
}

export const dealersAnswers = {
    [GameStates.PLAYER_LOST]: ['You lost!', 'I beat you :('],
    [GameStates.PLAYER_WIN]: ['You won!', 'You are lucky!', 'You beat me!'],
    [GameStates.DEALER_WIN]: ['I won!', 'I beat you!', 'You lost!'],
    [GameStates.DEALER_LOST]: ['You won!', 'You are lucky!', 'You beat me!'],
    [GameStates.DRAW]: ['Draw!', 'It\'s a draw!', 'No one won!'],
    [GameStates.CONTINUE]: ['Game goes on!', 'Let\'s play!', 'Your turn!'],
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