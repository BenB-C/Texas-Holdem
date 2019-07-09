import { Deck } from './deck.js';
export default class Player {
  constructor () {
    this.turn = false;
    this.hand = [];
    this.chips = 2000;
    this.bet = 0;
  };

}
