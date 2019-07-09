import {Deck} from './Deck.js';
import { Player } from './players.js';
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
    this.currentlyBettingIndex = (this.dealerIndex + 1) % this.players.length;
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
    if(this.betsNeeded-- > 0){
      this.takeBet(this.currentlyBettingIndex);
    }
    else{
      this.resetBetting();
    }
  }

  resetBetting(){
    this.currentBet = 0;
    this.players.forEach(function(player){
      player.hasFolded = false;
    })
  }

  takeBet(playerIdx) {
    //$(".display-bet-buttons").hide();
    if(!this.players[playerIdx].hasFolded){
      if (this.players[playerIdx].isComputer) {
        setTimeout(() => {
          console.log("computer-turn");
          this.incTurn();

        }, 1500)
      } else {
        //$(".display-bet-buttons").show();
      }
    }
    console.log('pot', this.pot);
    console.log('currentBet', this.currentBet);
  }

  handleFold(){
    console.log("player has folded");
    this.players[this.currentlyBettingIndex].hasFolded = true;
  }

  handleCall(){
    //place bet equal to current bet
    console.log('bet Placed', this.currentBet);
    this.players[this.currentlyBettingIndex].placeBet(this.currentBet)
    this.pot += this.currentBet;
  }

  handleRaise(amount){
    //place bet equal to bet + raise amount
    amount = 100;
    this.betsNeeded = this.players.length;
    console.log('bet Placed', this.currentBet+amount);
    this.players[this.currentlyBettingIndex].placeBet(this.currentBet + amount)
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

}
