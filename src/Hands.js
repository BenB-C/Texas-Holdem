import Card from './Card.js';

//Author: Ben Martinson

export default class Hands{
  constructor(){

    this.hands = [[this.findFullHouse, "Full House"],[this.find4Kind, "4 of a Kind"] ,[this.find3Pair, "3 of a Kind"],  [this.findPairs, "Pair"], [this.findHighCard, "High Card"]];
    let cards = []
    cards.push(new Card('2', 'heart'));
    cards.push(new Card('2', 'heart'));
    cards.push(new Card('3', 'heart'));
    cards.push(new Card('3', 'heart'));
    cards.push(new Card('3', 'heart'));

    this.bestHand;
    this.message = "None";
    this.findBestHand(cards);
    console.log(this.message, this.bestHand);
  }

  findBestHand(cards){
    for (let i = 0; i < this.hands.length; i++) {
      let hand = this.hands[i];
      let result = hand[0](cards, this);
      this.message = hand[1];
      if(result.length !== 0){
        this.bestHand = result;
        if(this.message === "Pair" && result.length > 2){
          if(result.length === 4){
            this.message = "Two Pair";
          }
        }
        return;
      }
    }
  }

  findBestHands(cards1, cards2){}

  findPairs(cards){
    let pairs = []

    for (let i = 0; i < cards.length; i++) {
      for (var x = i+1; x < cards.length; x++) {
        if(cards[i].value === cards[x].value){
          //pair found
          pairs.push(cards[i])
          pairs.push(cards[x])
        }
      }
    }
    return pairs;
  }

  find4Kind(cards){
    let pairs = [];
    for (let i = 0; i < cards.length; i++) {
      for (let x = i+1; x < cards.length; x++) {
        for (let r = x+1; r < cards.length; r++) {
          for (let l = r+1; l < cards.length; l++) {
            if(cards[i].value === cards[x].value && cards[i].value === cards[r].value && cards[i].value === cards[l].value){
              //pair found
              pairs.push(cards[i])
              pairs.push(cards[x])
              pairs.push(cards[r])
              pairs.push(cards[l])
            }
          }
        }
      }
    }
    return pairs;

  }


  find3Pair(cards){
    let pairs = [];
    for (let i = 0; i < cards.length; i++) {
      for (let x = i+1; x < cards.length; x++) {
        for (let r = x+1; r < cards.length; r++) {
          if(cards[i].value === cards[x].value && cards[i].value === cards[r].value){
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

  findFullHouse(cards, that){
    let pair = that.findPairs(cards);
    let threePair = that.find3Pair(cards);
    console.log(that.find4Kind(cards), threePair, pair, pair.length >= 4);
    if(that.find4Kind(cards) && threePair && pair && pair.length >= 4){
      return cards;
    }
    return [];
  }

  findHighCard(cards){
    return [];
  }




}
