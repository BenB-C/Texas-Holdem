import './css/styles.css';
import $ from 'jquery';
import {Game} from './Game.js';
import {Deck} from './Deck.js';
import Hands from './Hands.js';
import Player from './players.js';
import Card from './Card.js';
import './imageImports.js';

function displayCards(playerID, card1, card2) {

  let userCards = new Image();
  userCards.src = `card${card1.value}Of${card1.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card1.value}-${card1.suit}.png'>`);
  userCards.src = `card${card2.value}Of${card2.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card2.value}-${card2.suit}.png'>`);
}

function displayFaceDownCards(playerID, card1, card2) {
  let faceDownCards = new Image();
  faceDownCards.src = `card${card1.value}Of${card1.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card1.value}-${card1.suit}.png'>`);
  faceDownCards.src = `card${card2.value}Of${card2.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card2.value}-${card2.suit}.png'>`);
}

function addCommunityCard(card) {
  let cardImage = new Image();
  cardImage.src = `card${card.value}Of${card.suit}`;
  $('#table').append(`<img class="card" src='./Assets/${card.value}-${card.suit}.png'>`);
}

function displayChips(playerID, amount) {

}

// Import images
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
}
const images = importAll(require.context('./Assets', false, /\.(png|jpe?g|svg)$/));


// Create players
let numberOfPlayers = 2;
let players = [];
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(new Player());
}

players[0].isComputer = false;
// Layout table
let game = new Game(players);

// game.takeBets();
// // flop
// game.dealCards(3);
// game.takeBets();
// // river
// game.dealCards(1);
// game.takeBets();
// // turn
// game.dealCards(1);
// game.takeBets();

function displayButtons(){
  console.log('here');
  if(game.isNextPlayerUser() || game.currentBet === 0){
    //$(".display-bet-buttons").show();
    $("#fold").show();
    $("#raise").show();
    $("#call").hide();
    $("#check").hide();

    //todo: add condition for blind
    console.log(game.currentBet);
    (game.currentBet === 0) ? $("#check").show() : $("#call").show();

  }else {
    $("#fold").hide();
    $("#raise").hide();
    $("#call").hide()
    $("#check").hide()
  }

}

$(document).ready(function(){
  // Start game

let addInitialChips = new Player();
$('#playChips').append(addInitialChips.chips)
$('#comChips').append(addInitialChips.chips)


  game.dealCards(2, true);

  // display player0 cards
  let player0 = game.players[0];
  displayCards(0, player0.hand[0], player0.hand[1]);
  console.log(player0.hand[0]);

  // display player1 cards
  let player1 = game.players[1];
  displayFaceDownCards(1, player1.hand[0], player1.hand[1]);
  console.log(player1.hand[0]);

  // deal 3 more cards

  game.dealCards(3);

  addCommunityCard(game.communityCards[0]);
  addCommunityCard(game.communityCards[1]);
  addCommunityCard(game.communityCards[2]);



  // display cards dealt


  displayButtons();


  // game.currentlyBettingIndex = (game.dealerIndex + 1) % game.players.length;

  game.takeBet(game.currentlyBettingIndex);


  $(".bet-button").click(function(){
    let choice = $(this)[0].id;
    console.log(choice);
    //do work

    if(choice === "fold"){
      $(".display-bet-buttons").hide();

      game.handleFold();
    } else if (choice === "call"){
      game.handleCall();
    } else if(choice === "raise"){
      // get amount from user input

      $('#raiseForm').show();
      // game.handleRaise();
    } else if(choice === "check"){
      game.handleCheck();
    }

    displayButtons();
    game.incTurn(displayButtons);
    displayButtons();

  });

  // Remove raise from player chips, add to player bet

  $('#submitBet').click(function(){
    $("#raiseForm").hide();

    game.handleRaise($('#raiseBet').val());
    console.log($('#raiseBet').val());

  });

});



// test.addBet();
