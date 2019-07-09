
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

  const card = new Image();
  card.src = `card${card1.value}Of${card1.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card1.value}-${card1.suit}.png'>`);
  card.src = `card${card2.value}Of${card2.suit}`;
  $('#playerCards' + playerID).append(`<img class="card" src='./Assets/${card2.value}-${card2.suit}.png'>`);
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

$(document).ready(function(){
  let playerIndex = 0;
  let card1 = new Card("Ace", "Diamonds");
  let card2 = new Card("Queen", "Spades");
  displayCards(playerIndex, card1, card2);
  let amountOfChips = 2000;
  displayChips(playerIndex, amountOfChips);
});



// test.addBet();
