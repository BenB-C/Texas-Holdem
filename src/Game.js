import {Deck} from './Deck.js';
import { Player } from './players.js';
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
    let numberOfCards = this.roundCardNum[roundCount]
    let isFirstDeal = roundCount > 0;
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
      }
    }
    console.log("CommunityCards", communityCards.toString());
    this.players.forEach(player => console.log(player.hand.toString()));

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



    let randPercToDecideFold = Math.floor(Math.random() * 6); //between 20%-99%
    let randPercToDecideCallCheck = Math.floor(Math.random() * 2); //between 20%-99%
    if(randPercToDecideFold === 0){
      //fold
      console.log("computer choice = Folded");
      this.handleFold();
      return;
    } else if(randPercToDecideCallCheck === 2 || turn.amountToBet === 0){
      //call or check
      if(turn.bet - this.currentBet === 0){
        console.log("computer choice = checked");
        this.handleCheck();
      } else {
        console.log("computer choice = called");
        this.handleCall();
      }
    } else {
      //raise
      let randPerc = Math.floor(Math.random() * 80) + 19; //between 20%-99%
      let randomBet = Math.floor(turn.amountToBet * (randPerc/100));
      console.log("computer choice = raise: ", randomBet);
      turn.amountToBet -= randomBet;
      this.handleRaise(randomBet);
    }

    console.log("computer turn.bet", turn.bet);

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

  incTurn(){
    //TODO: check if everyone has folded, or if roundCount = 4, and if so end hand
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

  // isNextPlayerUser(){
  //   return this.currentlyBettingIndex === this.players.length-1 && !this.players[0].hasFolded;
  // }

}
