import Card from './Card.js';

//Author: Ben Martinson

export default class Hands{
  constructor(){

    this.findFullHouse = this.findFullHouse.bind(this);
    this.find4Kind = this.find4Kind.bind(this);
    this.find3Pair = this.find3Pair.bind(this);
    this.find2Pair = this.find2Pair.bind(this);
    this.findPair = this.findPair.bind(this);
    this.findHighCard = this.findHighCard.bind(this);

    this.hands = [[this.findFullHouse, "Full House"],[this.find4Kind, "4 of a Kind"] ,[this.find3Pair, "3 of a Kind"],
                  [this.find2Pair, "Two Pair"], [this.findPair, "Pair"], [this.findHighCard, "High Card"]];
    this.cards = []
    this.cards.push(new Card('4', 'heart'));
    this.cards.push(new Card('7', 'heart'));
    this.cards.push(new Card('6', 'heart'));
    this.cards.push(new Card('5', 'heart'));
    this.cards.push(new Card('2', 'heart'));

    this.bestHand;
    this.counts = []
    this.message = "None";
    this.getCounts();
    this.findBestHand();
    console.log(this.message, this.bestHand);
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

  findBestHand(){
    for (let i = 0; i < this.hands.length; i++) {
      let hand = this.hands[i];
      let result = hand[0](this.cards);
      this.message = hand[1];
      if(result.length !== 0){
        this.bestHand = result;
        return;
      }
    }
  }

  findPair(){
    for (let i = 0; i < this.counts.length; i++) {
      if(this.counts[i] === 2){
        return [i, i];
      }
    }
    return [];
  }

  find2Pair(){
    let firstPair;
    let secondPair;

    for (let i = 0; i < this.counts.length; i++) {
      if(this.counts[i] === 2){
        if(firstPair){
          return [firstPair, [i, i]];
        } else {
          firstPair = [i, i];
        }
      }
    }
    return [];
  }

  find3Pair(){
    for (var i = 0; i < this.counts.length; i++) {
      if(this.counts[i] === 3){
        return [i, i, i];
      }
    }
    return [];
  }

  find4Kind(){
    for (var i = 0; i < this.counts.length; i++) {
      if(this.counts[i] === 4){
        return [i, i, i, i];
      }
    }
    return [];
  }


  findBestHands(cards1, cards2){}


  findFullHouse(cards){
    let threePair = this.find3Pair();
    let pair = this.findPair();
    console.log(threePair, pair);
    if(threePair.length && pair.length)
      return [threePair, pair];
    return [];
  }

  // const findFullHouse = (cards) => {
  //   let threePair = this.find3Pair();
  //   let pair = this.findPair();
  //   console.log(this);
  //   if(threePair && pair)
  //     return [threePair, pair];
  //   return [];
  // }

  findHighCard(cards){
    for (var i = this.counts.length; i > 0; i--) {
      if(this.counts[i] > 0)
        return i;
    }
    return [];
  }




}






// find2Pair(cards, that){
//   let pairs = that.findPairs(cards);
//   console.log(pairs);
//   if(pairs.length === 4)
//     return pairs
//   return [];
// }
//
// findPairs(cards){
//   let tempCards = [...cards];
//   let pairs = []
//
//   for (let i = 0; i < tempCards.length; i++) {
//     for (var x = i+1; x < tempCards.length; x++) {
//       if(tempCards[i].value === tempCards[x].value){
//         //pair found
//         pairs.push(tempCards[i]);
//         pairs.push(tempCards[x]);
//         tempCards.splice(x, 1)
//         tempCards.splice(i, 1)
//       }
//     }
//   }
//   return pairs;
// }
//
// find4Kind(cards){
//   let pairs = [];
//   for (let i = 0; i < cards.length; i++) {
//     for (let x = i+1; x < cards.length; x++) {
//       for (let r = x+1; r < cards.length; r++) {
//         for (let l = r+1; l < cards.length; l++) {
//           if(cards[i].value === cards[x].value && cards[i].value === cards[r].value && cards[i].value === cards[l].value){
//             //pair found
//             pairs.push(cards[i])
//             pairs.push(cards[x])
//             pairs.push(cards[r])
//             pairs.push(cards[l])
//           }
//         }
//       }
//     }
//   }
//   return pairs;
//
// }
//
//
// find3Pair(cards){
//   let pairs = [];
//   for (let i = 0; i < cards.length; i++) {
  //     for (let x = i+1; x < cards.length; x++) {
    //       for (let r = x+1; r < cards.length; r++) {
      //         if(cards[i].value === cards[x].value && cards[i].value === cards[r].value){
        //           //pair found
        //           pairs.push(cards[i])
        //           pairs.push(cards[x])
        //           pairs.push(cards[r])
        //         }
        //       }
        //     }
        //   }
        //   return pairs;
        // }
