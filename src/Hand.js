import Card from './Card.js'

export default class Hand{
  constructor(cards){
    // this.cards = cards;
    this.cards = []
    this.cards.push(new Card(cards[0], 'heart'));
    this.cards.push(new Card(cards[1], 'heart'));
    this.cards.push(new Card(cards[2], 'heart'));
    this.cards.push(new Card(cards[3], 'heart'));
    this.cards.push(new Card(cards[4], 'heart'));


    this.counts = []
    this.message = "None";
    this.bestHand = [];
    this.handRank = 0;
    this.winner = false;
    this.getCounts();
  }

  getCounts(){
    for (var i = 0; i < 13; i++) {
      this.counts.push(0);
    }
    console.log(this.counts);
    this.cards.forEach(function(card, idx){
      this.counts[card.value]++
    }, this)
    console.log(this.counts);
  }

}
