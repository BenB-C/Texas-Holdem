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
  $('#playerCards' + playerID).html(`<p>Player 2</p>`);
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

function updateChipsDisplay() {
  console.log('player bet = ', game.players[0].bet);
  game.players.forEach( (player, i) => {
    $('#playChips' + i).text(game.players[i].chips);
    $('#playBet' + i).text(game.players[i].bet);
  });
  $('#potChips').text(game.pot);
  console.log("chips display updated");
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
  updateChipsDisplay();
  if(result === "computerTurn"){
    setTimeout(function(){
      //call ai function
      console.log('computer turn')
      let computerBet = game.computerBet();
      $(".show-message").html(`<p>${computerBet}</p>`);
      let result = game.incTurn();
      handleResult(result)
    }, 1500)
  } else if(result === "userTurn"){
      console.log('user turn')
    displayButtons();
  } else if(result === "roundDone"){
    // display computer's cards
    displayCards(1, game.players[1].hand[0], game.players[1].hand[1]);
    handleWinner();
    // playNewHand(); TODO?
  } else {
    game.resetBetting();
    playNewRound();
  }
}

function playNewHand(){
  game.resetHand();
  playNewRound();

}

function handleWinner() {
  if(game.players[0].hasFolded){
    $(".show-winner").html("Player 1 has folded and Player 2 has won by default. <br>");
    return
  }

  if(game.players[1].hasFolded){
    $(".show-winner").html("Player 2 has folded and Player 1 has won by default. <br>");
    return
  }

  let result = game.getWinner();
  console.log(result);
  let toDisplay = "<p>";
  if(result.idx.length > 1){ //multiple winners
    result.idx.forEach(function(idx){
      toDisplay += `Player ${result.idx+1} has tied for the win with a ${result.message}<br>`;
    })
  } else {
    toDisplay = `Player ${result.idx+1} has won the round with a ${result.message}<br>`;
  }
  $(".show-winner").html(toDisplay + "</p>");
}

function playNewRound(){
  game.resetBetting();

  updateChipsDisplay();

  game.deck = new Deck();
  game.dealCards(game.roundCount)

  $("#round-count-type").text(game.roundNames[game.roundCount]);


  if (game.roundCount === 1) {
    // display user cards
    let player0 = game.players[0];
    displayCards(0, player0.hand[0], player0.hand[1]);
    console.log(player0.hand[0]);
    console.log(player0.hand[1]);
  } else if (game.roundCount === 2) {
    addCommunityCard(game.communityCards[0]);
    addCommunityCard(game.communityCards[1]);
    addCommunityCard(game.communityCards[2]);
  } else if (game.roundCount === 3){
    addCommunityCard(game.communityCards[3]);
  } else if (game.roundCount === 4){
    addCommunityCard(game.communityCards[4]);
  }
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


}

function nextTurn(){
  hideButtons();
  let result = game.incTurn();
  handleResult(result);
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



//   game.dealCards(2, true);


//   // deal 3 more cards

//   game.dealCards(3);

//



//   // display cards dealt


//   displayButtons();

  // user is first
  $("#loader").click(function(){
    $('#loader').hide();
    $(this).hide();
  $(".round-count").show();
    updateChipsDisplay();
    playNewHand();

})

  $(".bet-button").click(function(){
    let choice = $(this)[0].id;
    //do work
    if(choice === "fold"){
      $(".show-message").text('');
      hideButtons();
      game.handleFold();
      // nextTurn();
      handleWinner();
    } else if (choice === "call"){
      $(".show-message").text('');
      game.handleCall();
      nextTurn();
    } else if(choice === "raise"){
      // get amount from user input

      $('#raiseForm').show();
      // game.handleRaise();
    } else if(choice === "check"){
      $(".show-message").text('');
      game.handleCheck();
      nextTurn();
    }

  });

  // Remove raise from player chips, add to player bet

  $('#submitBet').click(function(event){
    $(".show-message").text('');
    event.preventDefault();
    $("#raiseForm").hide();

    game.handleRaise(parseInt($('#raiseBet').val()));
    nextTurn();
    console.log($('#raiseBet').val());
  });

});
