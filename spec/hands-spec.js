import Hands from '../src/Hands.js';
import Hand from '../src/Hand.js';

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

})
