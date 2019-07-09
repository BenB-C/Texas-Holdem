import { Deck } from './deck.js';
export default class Player {
  constructor () {
    this.turn = false;
    this.hand = [];
    this.chips = 2000;
    this.isComputer = true;
    this.bet = 0;

    this.hasFolded = false;
  };

  placeBet(amount) {
    this.chips -= amount;
    this.bet += amount;
  };

  collectWinnings(amount) {
    this.chips += amount;
  }

}
