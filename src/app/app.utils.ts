import {Player} from "./commun/model/player.model";
import {CardValues} from "./commun/enum/cardValues.enum";

export function getCardValue(value: string) : number {
  switch (value) {
    case CardValues.ACE: return 11;
    case CardValues.C10: return 10;
    case CardValues.KING: return 10;
    case CardValues.JACK : return 10;
    case CardValues.QUEEN: return 10;
    case CardValues.C2: return 2;
    case CardValues.C3: return 3;
    case CardValues.C4: return 4;
    case CardValues.C5: return 5;
    case CardValues.C6: return 6;
    case CardValues.C7: return 7;
    case CardValues.C8: return 8;
    case CardValues.C9: return 9;
    default: return 0;
  }
}

export function getScoreValue(player: Player) : number {
  if (!player || !player.cards || player.cards.length === 0) {
    return 0;
  }

  return player.cards
    .map(card => getCardValue(card.value))
    .reduce((sum, card) => sum += card, 0);
}

export function getStatus(score: number) {
  if (score < 11) return 'Poulain'
  else if (score < 17) return 'Etre humain'
  else if (score < 21) return 'Jedi'
  else if (score === 21) return 'Master'
  else return 'Perdu';
}
