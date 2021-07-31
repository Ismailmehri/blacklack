import {CardInterface} from "../interface/card.interface";

export class Card implements CardInterface {
  code: string = '';
  image: string = '';
  suit: string = '';
  value: string = '';
  images: any;
}
