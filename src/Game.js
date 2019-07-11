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
    this.roundCount = 0;
    this.betsNeeded = players.length;
    this.communityCards = [];
    this.dealerIndex = this.players.length - 1;
    // this.currentlyBettingIndex = (this.dealerIndex + 1) % this.players.length;
    this.currentlyBettingIndex = 1;
    this.computerBetChoices = [[400, "Straight-Flush"],[300, "Flush"],[250, "Straight"],
                  [200,"Full House"],[160, "4 of a Kind"] ,[120, "3 of a Kind"],
                  [80, "Two Pair"], [50, "Pair"], [20, "High Card"]];

    this.roundCardNum = [2, 3, 1, 1];

  }

  resetHand(){
    this.pot = 0;
    this.roundCount = 0;
    this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
    this.communityCards = [];
  }

  dealCards(roundCount) {
    console.log("dealCards roundCount", this.roundCount);
    let numberOfCards = this.roundCardNum[roundCount]
    let isFirstDeal = this.roundCount === 0;
    let cards = this.deck.cards;
    let communityCards = this.communityCards;
    for (let i = 0; i < numberOfCards; i++) {
      if (isFirstDeal) {
        this.players.forEach((player, idx) => {
          let nextCard = this.deck.nextCard();
          player.hand.push(nextCard);
          console.log("player " + idx + " was dealt " + nextCard);
        }, this);
      } else {
        this.communityCards.push(this.deck.nextCard());
      }
    }
    console.log("CommunityCards", communityCards.toString());
    this.players.forEach((player, idx) => console.log("Player" + idx + "has: " + player.hand.toString()));

    this.roundCount += 1;
  }

  nextCard() {
    let randomIndex = Math.floor(Math.round() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }


  computerBet(){
    const turn = this.players[this.currentlyBettingIndex];
    // const bestHand = this.getBestHand().message;
    if(turn.amountToBet === 0)
      turn.amountToBet = this.chooseBet();


    let randPercToDecideFold = 1;
    if(this.currentBet !== 0){
      randPercToDecideFold = Math.floor(Math.random() * 6); //between 20%-99%
    }

    let randPercToDecideCallCheck = Math.floor(Math.random() * 2); //between 20%-99%
    if(randPercToDecideFold === 0){
      //fold
      console.log("computer choice = Folded");
      this.handleFold();
      return;
    } else if(randPercToDecideCallCheck === 2 || turn.amountToBet === 0){
      //call or check
      this.eitherCallOrCheck(turn);
    } else {
      //raise
      let randPerc = Math.floor(Math.random() * 80) + 19; //between 20%-99%
      let randomBet = Math.floor(turn.amountToBet * (randPerc/100));
      turn.amountToBet -= randomBet;

      if(randomBet > 4){
        console.log("computer choice = raise: ", randomBet);
        this.handleRaise(randomBet);
      } else {
        this.eitherCallOrCheck(turn);
      }

    }

    console.log("computer turn.bet", turn.bet);

  }

  eitherCallOrCheck(turn){
    if(turn.bet - this.currentBet === 0){
      console.log("computer choice = checked");
      this.handleCheck();
    } else {
      console.log("computer choice = called");
      this.handleCall();
    }
  }

  chooseBet(){
    // this.computerBetChoices.forEach(function(hand){
    //   if(hand[1] === bestHand){
    //     totalBet = hand[0]
    //   }
    // })

    //let randPerc = Math.floor(Math.random() * 80) + 19; //between 20%-99%
    //let randBet = randPerc * totalBet;
    let totalBet = Math.floor(Math.random() * 80) + 19; //between 20%-99%
    console.log('totalBet', totalBet);
    return totalBet;
  }

  checkPlayersStillIn(){
    let count = 0;
    this.players.forEach(function(player){
      if(!player.hasFolded)
        ++count;
    })
    return count;
  }

  incTurn(){
    //TODO: check if everyone has folded, or if roundCount = 4, and if so end hand
    if(this.checkPlayersStillIn() < 2 || this.roundCount === 4) return "roundDone";

    this.currentlyBettingIndex = (this.currentlyBettingIndex + 1) % this.players.length;
    if(this.betsNeeded > 0){
      if (!this.players[this.currentlyBettingIndex].hasFolded){
        this.betsNeeded--
        if(this.players[this.currentlyBettingIndex].isComputer){

          return "computerTurn";
        }else {
          return "userTurn";
        }
      } else{
          this.incTurn();
      }
    } else{
      return "reset";
    }
  }

  resetBetting(){
    this.currentBet = 0;
    this.currentlyBettingIndex = 1;

    this.betsNeeded = this.players.length;
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
    if(!amount) amount = 100;
    let stillIn = 0;
    // this.players.forEach(function())
    this.betsNeeded = this.players.length-1;
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

  // isNextPlayerUser(){
  //   return this.currentlyBettingIndex === this.players.length-1 && !this.players[0].hasFolded;
  // }

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
