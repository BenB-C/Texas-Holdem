import {Deck} from './Deck.js';
import { Player } from './players.js';
import Hand from './Hand.js';
import Hands from './Hands.js';
import $ from 'jquery'

export class Game {
  constructor(players) {
    this.deck = new Deck();
    this.players = players;
    this.pot = 0;
    this.currentBet = 0;
    this.betsNeeded = players.length;
    this.communityCards = [];
    this.dealerIndex = this.players.length - 1;
    // this.currentlyBettingIndex = (this.dealerIndex + 1) % this.players.length;
    this.currentlyBettingIndex = 0;
  }

  dealCards(numberOfCards, isFirstDeal) {
    let cards = this.deck.cards;
    let communityCards = this.communityCards;
    for (let i = 0; i < numberOfCards; i++) {
      if (isFirstDeal) {
        this.players.forEach((player, idx) => {
          let nextCard = this.deck.nextCard();
          player.hand.push(this.deck.nextCard());
          console.log("player " + idx + " was dealt " + player.hand.toString());
        }, this);
      } else {
        this.communityCards.push(this.deck.nextCard());
        console.log("player " + i + " was dealt " + player.hand.toString());
      }
    }
    console.log("CommunityCards", communityCards.toString());
    this.players.forEach(player => console.log(player.hand.toString()));
  }

  nextCard() {
    let randomIndex = Math.floor(Math.round() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }

  takeBets() {
    console.log("takeBets");
  }



  incTurn(){
    this.currentlyBettingIndex = (this.currentlyBettingIndex + 1) % this.players.length;
    console.log('idx', this.currentlyBettingIndex);
    if(this.betsNeeded > 0){
      if (!this.players[this.currentlyBettingIndex].hasFolded){
        this.betsNeeded--
        if(this.players[this.currentlyBettingIndex].isComputer){

          return "computerTurn";
        }else {
          return "userTurn";
        }
      }
      this.incTurn();
    } else{
      return "reset";
    }
  }

  resetBetting(){
    this.currentBet = 0;
    this.players.forEach(function(player){
      player.hasFolded = false;
    })
  }

  // takeBet(playerIdx) {
  //   //$(".display-bet-buttons").hide();
  //   if(!this.players[playerIdx].hasFolded){
  //     if (this.players[playerIdx].isComputer) {
  //       this.currentPlayerComp = true;
  //     } else {
  //       this.currentPlayerComp = false;
  //       //$(".display-bet-buttons").show();
  //     }
  //   }
  //   console.log('pot', this.pot);
  //   console.log('currentBet', this.currentBet);
  // }

  handleFold(){
    console.log("player has folded");
    this.players[this.currentlyBettingIndex].hasFolded = true;
  }

  handleCall(){
    //place bet equal to current bet
    console.log('bet Placed', this.currentBet);
    let bettingPlayer = this.players[this.currentlyBettingIndex];
    let amountToCall = this.currentBet - bettingPlayer.bet;
    bettingPlayer.placeBet(amountToCall);
    this.pot += amountToCall;
  }

  handleRaise(amount){
    //place bet equal to bet + raise amount
    amount = 100;
    let stillIn = 0;
    // this.players.forEach(function())
    this.betsNeeded = this.players.length;
    console.log('bet Placed', this.currentBet+amount);
    let bettingPlayer = this.players[this.currentlyBettingIndex];
    let amountToCall = this.currentBet - bettingPlayer.bet;
    bettingPlayer.placeBet(amountToCall + amount);
    this.currentBet += amount;
    this.pot += amount;
  }

  handleCheck(){
    //might not need
  }

  isNextPlayerUser(){
    console.log('here');
    return this.currentlyBettingIndex === this.players.length-1 && !this.players[0].hasFolded;
  }

  getBestHand(playerIdx) {
    let player = this.players[playerIdx];
    let setsOfFiveCards = [this.communityCards];
    this.communityCards.forEach((communityCard, communityCardIdx) => {
      player.hand.forEach((card, cardIdx) => {
        let setOfFiveCards = [];
        for (var i = 0; i < 5; i++) {
          if (i === communityCardIdx) {
            setOfFiveCards.push(player.hand[cardIdx]);
          } else {
            setOfFiveCards.push(this.communityCards[i]);
          }
        }
        setsOfFiveCards.push(setOfFiveCards);
      });
    });
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 5; j++) {
        let setOfFiveCards = this.communityCards.map((communityCard, k) => {
          if (k === i) {
            return player.hand[0];
          } else if (k === j) {
            return player.hand[1];
          } else {
            return this.communityCards[k];
          }
        });
        setsOfFiveCards.push(setOfFiveCards);
      }
    }
    let hands = setsOfFiveCards.map(setOfFiveCards => {
      return new Hand(setOfFiveCards);
    });
    let handsChecker = new Hands();
    handsChecker.findBestHands(hands);
    let winningCards;
    handsChecker.arrOfHands.forEach(hand => {
      if (hand.winner) {
        winningCards = hand.cards;
      }
    });
    return winningCards;
  }

  getWinner() {
    let winner = {};
    let playersBestHands = this.players.map((player, i) => {
      let bestHand = this.getBestHand(i);
      return new Hand(bestHand);
    });
    let handsChecker = new Hands();
    handsChecker.findBestHands(playersBestHands);
    let winnerIndexes = [];
    handsChecker.arrOfHands.forEach((hand, i) => {
      if (hand.winner || hand.draw) {
        winnerIndexes.push(i);
      }
    });
    return { idx: winnerIndexes, message: handsChecker.arrOfHands[winnerIndexes[0]].message };
  }
}
