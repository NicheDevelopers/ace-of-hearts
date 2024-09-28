import { Card } from "cards";
import { CardImages } from "./cardImages";

export function parseCardToString(card: Card, isHidden: boolean): keyof typeof CardImages {
    if (isHidden) return 'CARD_BACK'; 
    return (card.rank.name + '_OF_' + card.suit.name).toUpperCase() as keyof typeof CardImages;    
}