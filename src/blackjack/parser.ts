import { Card } from "cards";

export function parseCardToString(card: Card, isHidden: boolean): string {
    if (isHidden) return 'CARD_BACK'; 
    return (card.rank.name + '_OF_' + card.suit.name).toUpperCase();    
}