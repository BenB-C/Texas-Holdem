
import $ from 'jquery';
import {Game} from './Game.js';
import {Deck} from './Deck.js';
import Hands from './Hands.js';
import Player from './players.js';



let numberOfPlayers = 4;
let players = [];
for (let i = 0; i < numberOfPlayers; i++) {
  players.push(new Player());
}
let game = new Game(players);
game.dealCards(2, true);
game.players.forEach((player, i) => {
  console.log("Player " + i + " was dealt:" + player.hand);
});
let gameOver  = false;
while (!gameOver) {
  game.takeBets();
  game.dealCards(3);
  game.takeBets();
  game.dealCards(1);
  game.takeBets();
  game.dealCards(1);
  game.takeBets();
  gameOver = true;
}
$(document).ready(function(){

})




// test.addBet();
