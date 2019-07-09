import {Deck} from './Deck.js';
import { Player } from './players.js';
export class Game {
  constructor(players) {
    this.deck = new Deck();
    this.players = players;
    this.pot = 0;
    this.communityCards = [];
  }

  dealCards(numberOfCards, isFirstDeal) {
    let cards = this.deck.cards;
    let communityCards = this.communityCards;
    for (let i = 0; i < numberOfCards; i++) {
      if (isFirstDeal) {
        this.players.forEach(player => {
          let nextCard = this.deck.nextCard();
          player.hand.push(this.deck.nextCard());
        }, this);
      } else {
        this.communityCards.push(this.deck.nextCard());
      }
    }
    console.log("CommunityCards", communityCards);
  }

  nextCard() {
    let randomIndex = Math.floor(Math.round()*this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }

  takeBets() {
    console.log("takeBets");
  }

}
