import Hands from '../src/Hands.js';
import Hand from '../src/Hand.js';
import Card from '../src/Card.js'
import Player from '../src/players.js';
import { Game } from '../src/Game.js';

describe('Test different hands for winner', function(){
  const hands = new Hands();

  // beforeEach(function(){
  // })


  //two pairs
  it('should test two pair draw, both pairs equal, but one has higher 5th card', function(){
    let firstHand = new Hand([3,3,6,10,10])
    let secondHand = new Hand([3,3,5,10,10])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.winner).toEqual(true);
  })

  it('should test two pair draw, but one of pairs is higher', function(){
    let firstHand = new Hand([3,3,6,11,11])
    let secondHand = new Hand([3,3,5,10,10])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.winner).toEqual(true);
  })


  ////// full house //////
  it('should test full house draw', function(){
    let firstHand = new Hand([3,3,10,10,10])
    let secondHand = new Hand([3,3,10,10,10])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.draw).toEqual(true);
    expect(secondHand.draw).toEqual(true);
  })

  it('should test full house one of the three kind is higher', function(){
    let firstHand = new Hand([3,3,10,10,10])
    let secondHand = new Hand([3,3,9,9,9])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.winner).toEqual(true);
  })

  it('should test full house one of the pairs is higher', function(){
    let firstHand = new Hand([5,5,10,10,10])
    let secondHand = new Hand([2,2,10,10,10])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.winner).toEqual(true);
  })

  ////// flush ////////
  it('should test flush is better than pair, two pair, three kind, four kind, full house', function(){
    let firstHand = new Hand([3,4,5,6,7])
    let secondHand = new Hand([10, 10, 3, 4, 5])
    let thirdHand= new Hand([10, 10, 10, 3, 4])
    let fourthHand = new Hand([10, 10, 10 , 10, 5])
    let fifthHand = new Hand([3, 3, 10, 10, 10])
    hands.findBestHands([firstHand, secondHand, thirdHand, fourthHand, fifthHand])
    expect(firstHand.winner).toEqual(true);
  })

  it('should test flush draw, one of the hands has higher top card', function(){
    let firstHand = new Hand([3,4,5,6,7])
    let secondHand = new Hand([2,3,4,5,6])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.winner).toEqual(true);
  })

  it('should test flush draw, exact', function(){
    let firstHand = new Hand([1,2,3,4,5])
    let secondHand = new Hand([1,2,3,4,5])
    hands.findBestHands([firstHand, secondHand])
    expect(firstHand.draw).toEqual(true);
    expect(secondHand.draw).toEqual(true);
  })

  it('should convert array of cards to array of hands', function(){
    let player1Cards = [];
    for (var i = 0; i < 5; i++) {
      player1Cards.push(new Card((i+3).toString(), 'Diamonds'));
    }
    let player2Cards = [];
    for (var i = 0; i < 5; i++) {
      player2Cards.push(new Card((i+2).toString(), 'Spades'));
    }

    let hands = new Hands();
    let firstHand = new Hand(player1Cards)
    let secondHand = new Hand(player2Cards)
    hands.findBestHands([new Hand(player1Cards), new Hand(player2Cards)]);
    expect(hands.arrOfHands[0].winner).toEqual(true);
  })

  it('should convert array of cards to array of hands and determine a tie with flushes', function(){
    let player1Cards = [];
    for (var i = 0; i < 5; i++) {
      player1Cards.push(new Card((i+2).toString(), "Diamonds"));
    }
    let player2Cards = [];
    for (var i = 0; i < 5; i++) {
      player2Cards.push(new Card((i+2).toString(), "Spades"));
    }

    let hands = new Hands();
    let firstHand = new Hand(player1Cards)
    let secondHand = new Hand(player2Cards)
    hands.findBestHands([new Hand(player1Cards), new Hand(player2Cards)]);
    expect(hands.arrOfHands[0].draw).toEqual(true);
  })

  it('should determine the best hand using community cards', function(){
    let numberOfPlayers = 2;
    let players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push(new Player());
    }
    // Layout table
    let game = new Game(players);
    for (var i = 0; i < 2; i++) {
      game.players[0].hand.push(new Card((i+2).toString(), "Diamonds"));
      game.players[1].hand.push(new Card((i+2).toString(), "Diamonds"));
      game.communityCards.push(new Card((i+2).toString(), "Clubs"));
    }
    for (var i = 2; i < 5; i++) {
      game.communityCards.push(new Card((i+2).toString(), "Diamonds"));
    }

    let winner = game.getWinner();
    expect(winner.idx.toString()).toEqual("0,1");
    expect(winner.message).toEqual("Straight-Flush");
  });

})
