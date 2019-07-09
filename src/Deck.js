import Card from './Card.js';
import Player from './players.js';

export class Deck {
  constructor() {
    this.values = ['ace', 'king', 'queen', 'jack'];
    for (let i = 2; i <= 10; i++) {
      this.values.push(i.toString());
    }
    this.suits = ['heart', 'diamond', 'spade', 'club'];
    this.cards = [];
    this.suits.forEach( suit =>{
      this.values.forEach( value => {
        this.cards.push(new Card(value, suit));
      });
    });
  }

  nextCard() {
    let randIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randIndex, 1)[0];
  }
}
