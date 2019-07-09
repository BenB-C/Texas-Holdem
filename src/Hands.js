import Card from './Card.js';
import Hand from './Hand.js'

//Author: Ben Martinson

export default class Hands{
  constructor(arrOfHands){

    this.arrOfHands = []
    // this.arrOfHands.push(new Hand([2,2,2,"King","Ace"]));
    this.arrOfHands.push(new Hand([2,2,5,10,10]));
    this.arrOfHands.push(new Hand([3,3,5,10,10]));
    // this.arrOfHands.push(new Hand([3,3,3,4,4]));

    this.findFullHouse = this.findFullHouse.bind(this);
    this.findStraightFlush = this.findStraightFlush.bind(this);

    this.hands = [[this.findStraightFlush, "Straight-Flush"],[this.findFlush, "Flush"],[this.findStraight, "Straight"],
                  [this.findFullHouse, "Full House"],[this.find4Kind, "4 of a Kind"] ,[this.find3Pair, "3 of a Kind"],
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

  findStraightFlush(hand){
    return this.findFlush(hand) && this.findStraight(hand)
  }

  findFlush(hand){
    let suit = hand.cards[0].suit;
    for (let i = 1; i < hand.cards.length; i++){
      if(hand.cards[i].suit !== suit){
        return [];
      }
    }
    return hand.cards;
  }

  findStraight(hand){
    //hand must be sorted;
    for (let i = 1; i < hand.cards.length; i++) {
      if(hand.cards[i].value - hand.cards[i-1].value !== 1)
        return [];
    }
    return hand.cards;
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
          if(!this.dealWithSameHand(hand, this.arrOfHands[highestHandIdx])){
            console.log('here');
            return; //Same hand, but the previous had a higher card
          }
        }
        //new hand is highest rank so far
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

  dealWithSameHand(newHand, oldHand){
    let newBest = newHand.bestHand;
    let prevBest = oldHand.bestHand;

    //if full house draw, check the three kind first, then the pair
    if(newHand.handRank === 2){
      if(newBest[0][0] !== prevBest[0][0]){
        return newBest[0][0] > prevBest[0][0]
      }
      else if(newBest[1][0] !== prevBest[1][0]){
        return newBest[1][0] > prevBest[1][0]
      } else {
        //must be draw
        newHand.draw = true;
        oldHand.draw = true;
        return true;
      }
    }

    //check for 2 pairs
    if(newHand.handRank === 6){
      
    }

    //check for tieBreakers (high cards of best hand)
    if(newHand.handRank !== this.hands.length-1){
      if(newBest[newBest.length-1].value !== prevBest[prevBest.length-1].value){
        return newBest[newBest.length-1].value > prevBest[prevBest.length-1].value
      }
    }


    //if got here, need to check for High cards
    for(let i = newHand.cards.length-1; i >=0; --i){
       if(newHand.cards[i].value !== oldHand.cards[i].value)
        return newHand.cards[i].value > oldHand.cards[i].value
    }

    //must be a draw
    newHand.draw = true;
    oldHand.draw = true;

  }


  findFullHouse(hand){
    let threePair = this.find3Pair(hand);
    let pair = this.findPair(hand);
    if(threePair.length && pair.length)
      return [threePair, pair];
    return [];
  }


  findHighCard(hand){
    return [hand.cards[hand.cards.length-1]];
  }

}
