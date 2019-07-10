
import './css/styles.css';
import $ from 'jquery';
import {Game} from './Game.js';
import {Deck} from './Deck.js';
import Hands from './Hands.js';
import Player from './players.js';
import Card from './Card.js';
import './imageImports.js';


// let displayCards = (playerID, card1, card2) => {
// let displayCards = function (playerID, card1, card2) {
function displayCards(playerID, card1, card2) {

  let card = new Image();
  card.src = `card${card1.value}Of${card1.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card1.value}-${card1.suit}.png'>`);
  card = new Image();
  card.src = `card${card2.value}Of${card2.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card2.value}-${card2.suit}.png'>`);
}

function displayChips(playerID, amount) {

}

// Create players
let numberOfPlayers = 2;
let players = [];
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(new Player());
}

players[0].isComputer = false;
// Layout table
let game = new Game(players);



function displayButtons(){
  $(".display-bet-buttons").show();
  $("#fold").show();
  $("#raise").show();
  $("#call").hide();
  $("#check").hide();
  (game.currentBet === 0) ? $("#check").show() : $("#call").show();
}

function hideButtons(){
  $("#fold").hide();
    $("#raise").hide();
    $("#call").hide();
    $("#check").hide();
}

function handleResult(result){
  if(result === "computerTurn"){
    setTimeout(function(){
      //call ai function
      console.log('computer turn')
      game.computerBet();
      let result = game.incTurn();
      handleResult(result)
    }, 1500)
  } else if(result === "userTurn"){
      console.log('user turn')
    displayButtons();
  } else if(result === "roundDone"){
    playNewRound();
  } else {
    playNewHand();
  }
}

function playNewHand(){
  game.resetHand();
  playNewRound();

}

function playNewRound(){
  game.resetBetting();

  game.deck = new Deck();
  game.dealCards(game.roundCount)

  $(".show-winner").empty();
  let result = game.incTurn();
  handleResult(result);
  // flop
  // game.dealCards(3);
  // game.incTurn();
  // // river
  // game.dealCards(1);
  // game.incTurn();
  // // turn
  // game.dealCards(1);
  // game.incTurn();
  // //
  // let result = game.getWinner();
  // console.log(result);
  // let toDisplay = "<p>";
  // if(result.idx.length > 1){ //multiple winners
  //   result.idx.forEach(function(idx){
  //     toDisplay += `Player ${result.idx+1} has tied for the win with a ${result.message}<br>`;
  //   })
  // } else {
  //   toDisplay = `Player ${result.idx+1} has won the round with a ${result.message}<br>`;
  // }
  // $(".show-winner").html(toDisplay + "</p>");

}


$(document).ready(function(){
  // test displayCards
  let playerIndex = 0;
  let card1 = new Card("Ace", "Diamonds");
  let card2 = new Card("Queen", "Spades");
  displayCards(playerIndex, card1, card2);
  // test displayChips
  let amountOfChips = 2000;
  displayChips(playerIndex, amountOfChips);

  // Start game
  game.dealCards(2, true);
  // display player cards

  // user is first
  $(".start-game").click(function(){
    $(this).hide();
    playNewHand();

  })

  $(".bet-button").click(function(event){
    let choice = $(this)[0].id;
    //do work
    if(choice === "fold"){
      hideButtons();
      game.handleFold();
    } else if (choice === "call"){
      game.handleCall();
    } else if(choice === "raise"){
      game.handleRaise();
    } else if(choice === "check"){
      game.handleCheck();
    }
    hideButtons();
    let result = game.incTurn();
    handleResult(result);

  })
})
