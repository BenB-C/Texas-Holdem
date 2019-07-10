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
//   // test displayCards
//   let playerIndex = 0;
//   let card1 = new Card("Ace", "Diamonds");
//   let card2 = new Card("Queen", "Spades");
//   displayCards(playerIndex, card1, card2);
//   // test displayChips
//   let amountOfChips = 2000;
// //   displayChips(playerIndex, amountOfChips);

//   // Start game

// let addInitialChips = new Player();
// $('#playChips').append(addInitialChips.chips)
// $('#comChips').append(addInitialChips.chips)


//   game.dealCards(2, true);

//   // display player0 cards
//   let player0 = game.players[0];
//   displayCards(0, player0.hand[0], player0.hand[1]);
//   console.log(player0.hand[0]);

//   // display player1 cards
//   let player1 = game.players[1];
//   displayFaceDownCards(1, player1.hand[0], player1.hand[1]);
//   console.log(player1.hand[0]);

//   // deal 3 more cards

//   game.dealCards(3);

//   addCommunityCard(game.communityCards[0]);
//   addCommunityCard(game.communityCards[1]);
//   addCommunityCard(game.communityCards[2]);



//   // display cards dealt


//   displayButtons();

  // user is first
  $(".start-game").click(function(){
    $(this).hide();
    playNewHand();

  })

  $(".bet-button").click(function(){
    let choice = $(this)[0].id;
    //do work

    if(choice === "fold"){
      hideButtons();
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
    hideButtons();
    let result = game.incTurn();
    handleResult(result);
  });

  // Remove raise from player chips, add to player bet

  $('#submitBet').click(function(){
    $("#raiseForm").hide();

    game.handleRaise($('#raiseBet').val());
    console.log($('#raiseBet').val());
  });
  
});
