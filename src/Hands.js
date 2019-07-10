import Card from './Card.js';
import Hand from './Hand.js'

//Author: Ben "billy-bob" Martinson

export default class Hands{
  constructor(arrOfHands){

    this.arrOfHands = []
    this.arrOfHands.push(new Hand([1,2,3,4,5]));
    this.arrOfHands.push(new Hand([2,2,3,4,5]));
    this.arrOfHands.push(new Hand([2,3,3,3,1]));
    this.arrOfHands.push(new Hand([2,2,2,1,1]));
    this.arrOfHands.push(new Hand([4,4,4,1,1]));
    this.arrOfHands.push(new Hand([3,3,3,4,4]));

    this.findFullHouse = this.findFullHouse.bind(this);
    this.find4Kind = this.find4Kind.bind(this);
    this.find3Pair = this.find3Pair.bind(this);
    this.find2Pair = this.find2Pair.bind(this);
    this.findPair = this.findPair.bind(this);
    this.findHighCard = this.findHighCard.bind(this);

    this.hands = [[this.findFullHouse, "Full House"],[this.find4Kind, "4 of a Kind"] ,[this.find3Pair, "3 of a Kind"],
                  [this.find2Pair, "Two Pair"], [this.findPair, "Pair"], [this.findHighCard, "High Card"]];


    this.findBestHands();
  }


  findBestHand(hand){
    for (let i = 0; i < this.hands.length; i++) {
      let result = this.hands[i][0](hand);

      hand.handRank = i;
      hand.message = this.hands[i][1];
      if(result.length !== 0){
        hand.bestHand = result;
        return;
      }
    }
  }

  findPair(hand){
    for (let i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 2){
        return [i, i];
      }
    }
    return [];
  }

  find2Pair(hand){
    let firstPair;
    let secondPair;

    for (let i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 2){
        if(firstPair){
          return [firstPair, [i, i]];
        } else {
          firstPair = [i, i];
        }
      }
    }
    return [];
  }

  find3Pair(hand){
    for (var i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 3){
        return [i, i, i];
      }
    }
    return [];
  }

  find4Kind(hand){
    for (var i = 0; i < hand.counts.length; i++) {
      if(hand.counts[i] === 4){
        return [i, i, i, i];
      }
    }
    return [];
  }


  findBestHands(){
    let handResults = []
    let bestHandSoFar = 10; //Lower is better
    let highestHandIdx = -1; //To reset winning to false when a higher hand is found

    this.arrOfHands.forEach(function(hand, idx){
      this.findBestHand(hand);
      if(hand.handRank <= bestHandSoFar){
        if(hand.handRank === bestHandSoFar){
          if(!this.dealWithSameHand(hand, this.arrOfHands[highestHandIdx]))
            return;
        }
        //
        bestHandSoFar = hand.handRank;
        if(highestHandIdx !== -1){
          this.arrOfHands[highestHandIdx].winner = false;
        }
        highestHandIdx = idx;
        hand.winner = true;
      }
    }, this)
    console.log(this.arrOfHands);
  }

  dealWithSameHand(newHand, OldHand){
    if(newHand.handRank === 0 || newHand.handRank === 1 || newHand.handRank === 2 || newHand.handRank === 4 || newHand.handRank === 5)
      return (newHand.bestHand[0] > OldHand.bestHand[0])

    if(newHand.handRank === 0){

    }
  }


  findFullHouse(hand){
    let threePair = this.find3Pair(hand);
    let pair = this.findPair(hand);
    if(threePair.length && pair.length)
      return [threePair, pair];
    return [];
  }


  findHighCard(hand){
    for (var i = hand.counts.length; i > 0; i--) {
      if(hand.counts[i] > 0)
        return i;
    }
    return [];
  }

}
