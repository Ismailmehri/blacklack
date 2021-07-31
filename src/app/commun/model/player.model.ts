import {PlayerInterface} from "../interface/player.interface";
import {CardInterface} from "../interface/card.interface";

export class Player implements  PlayerInterface {
  constructor(name: string) {
    this.name = name;
  }

  cards: CardInterface[] = [];
  name: string = '';
}
