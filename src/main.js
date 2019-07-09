
import './css/styles.css';
import $ from 'jquery';
import {Game} from './Game.js';
import {Deck} from './Deck.js';
import Hands from './Hands.js';
import Player from './players.js';

// Create players
let numberOfPlayers = 2;
let players = [];
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(new Player());
}
// Layout table


// Start game
let game = new Game(players);
game.dealCards(2, true);
// display player cards

game.takeBets();
// flop
game.dealCards(3);
game.takeBets();
// river
game.dealCards(1);
game.takeBets();
// turn
game.dealCards(1);
game.takeBets();

$(document).ready(function(){
  $('.computer-chips').html('<img src="./Assets/2-Clubs.png">');

})




// test.addBet();
