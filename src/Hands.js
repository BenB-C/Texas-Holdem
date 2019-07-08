import Card from './Card.js';

//Author: Ben Martinson

export default class Hands{
  constructor(){

    this.hands = [[this.find3Pair, "3 of a kind"],  [this.findPairs, "Pair"], [this.findHighCard, "High Card"]];
    let cards = []
    cards.push(new Card('2', 'heart'));
    cards.push(new Card('2', 'heart'));
    cards.push(new Card('3', 'heart'));
    cards.push(new Card('4', 'heart'));
    cards.push(new Card('5', 'heart'));

    this.bestHand;
    this.message = this.findBestHand(cards);
    console.log(this.message, this.bestHand);
  }

  findBestHand(cards){
    this.hands.forEach(function(hand, idx){
      let result = hand[0](cards);
      console.log();
      let message = hand[1];
      if(result.length !== 0){
        this.bestHand = result;
        if(message === "Pair"){
          if(this.checkFourOfKind(result)){
            message = "Four of a Kind";
          } else if(result.length === 4){
            message = "Two Pair";
          }
        }
        return message;
      }
    }, this)
  }

  findBestHands(cards1, cards2){}

  findPairs(cards){
    let pairs = []

    for (let i = 0; i < cards.length; i++) {
      for (var x = i+1; x < cards.length; x++) {
        if(cards[i] === cards[x]){
          //pair found
          pairs.push(cards[i])
          pairs.push(cards[x])
        }
      }
    }
    return pairs;
  }

  checkFourOfKind(pairs){
    return pairs[0].value === pairs[1].value
  }


  find3Pair(cards){
    let pairs = [];
    for (let i = 0; i < cards.length; i++) {
      for (let x = i+1; x < cards.length; x++) {
        for (let r = x+1; r < cards.length; r++) {
          if(cards[i] === cards[x] && cards[i] === cards[r]){
            //pair found
            pairs.push(cards[i])
            pairs.push(cards[x])
            pairs.push(cards[r])
          }
        }
      }
    }
    return pairs;
  }

  findHighCard(cards){
    return [];
  }




}
