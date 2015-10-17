//*****************************
// GLOBAL VARIABLES
//*****************************

var playerHand = []; // should this be in global scope or inside this function?
var dealerHand = []; // should this be in global scope or inside this function?
var cards = []; //this is also named inside the deck function, but i think it should be in global scope instead
var wallet = 100;
var playerArea = document.getElementById('player-area');
var dealerArea = document.getElementById('dealer-area');
var displayPlayerTotal;
var displayDealerTotal;
var playerTotal = 0;
var dealerTotal = 0;


//*****************************
// CREATE DECK ARRAY
//*****************************
//window onload here?

var card = function(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
}

var deck = function(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['hearts','diams','spades','clubs'];
    this.values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    var cards = []; // I think this might need to be in global scope also/instead
    for (var s=0; s<this.suits.length; s++) {
        for(var n=0; n<this.names.length; n++) {
            cards.push(new card(this.values[n], this.names[n], this.suits[s]) );
        }
    }
    return cards;
}

var shuffle = function(deck) {
    for (var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
        return deck;
};

var theDeck = new deck();


//*****************************
// DEAL
//*****************************

var deal = function() {
	playerHand = [];
	dealerHand = [];
	cards = [];
	shuffle(theDeck);

	wallet = wallet - 5;
	addCardToPlayer();
	var waitDealer = setTimeout(addCardToDealer, 700);
	// dealerHand[0].setAttribute('id', 'first'); // <-- this line doesn't work
	// need to somehow remove nth-child from dealer's card
	var waitPlayer = setTimeout(addCardToPlayer, 1400);
	var waitDealer2 = setTimeout(addCardToDealer, 2100);
	// var wait = setTimeout(pause, 2200);

	// if (playerTotal < 21) {
	// 	console.log('player can hit now')
	// }
}

var addCardToDealer = function() {
    var newCard = theDeck.pop();
    dealerHand.push(newCard);
	var lengthOfDealerHand = dealerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card';
	var ascii_char = '&' + dealerHand[lengthOfDealerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + dealerHand[lengthOfDealerHand].name + '</span><span class="suit">' + ascii_char + '</span>';
	dealerArea.appendChild(div); 
	dealerTotal = dealerTotal + newCard.value; 
	var wait = setTimeout(pause, 2200);
}

var addCardToPlayer = function() {
	var newCard = theDeck.pop(); 
	playerHand.push(newCard);
	var lengthOfPlayerHand = playerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card';
	var ascii_char = '&' + playerHand[lengthOfPlayerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + playerHand[lengthOfPlayerHand].name + '</span><span class="suit">' + ascii_char + '</span>';
	playerArea.appendChild(div); 
	playerTotal = playerTotal + newCard.value;
	var wait = setTimeout(pause, 2200);
	 // displayTotal = getElementById('playertext'); /<-- this doesn't work yet...
	 // p.innerHTML = playerTotal;
	 // playertext.appendChild(p);
	 
	 // p = document.createElement('p'); //<---this works but it makes a whole new p tag
	 // p.className = 'player-text';
	 // p.innerHTML = 'player total: ' + playerTotal;
	 // playerArea.appendChild(p);


	// playerDealt++
	// playerAces
}

var pause = function() {
    console.log('wallet has ' + wallet);
    console.log('player has ' + playerTotal + ', dealer has ' + dealerTotal);
    checkForBlackjack();
}

/* deal function: 
	  subtract money from the player's wallet
	  pop a card from the main deck array
	  push the card into the player's hand array
	  DOM: display the player card 
	  timeout
	  pop a card from the main deck array
	  push the card into the dealer's hand array
	  DOM: display the dealer card FACEDOWN 
	  * setAttribute for that card, id that makes it black
	  timeout
	  (again) pop a card from the main deck array
	  (again) push the card into the player's hand array
	  (again) DOM: display the player card 
	  timeout
	  pop a card from the main deck array
	  push the card into the dealer's hand array
	  DOM: display the dealer card
	  display dealer's sum total
	  display player's sum total 
	  call ___checkForWin___
 */


//*****************************
// PLAYER'S TURN
//*****************************
var checkForBlackjack = function() {
	if ((dealerTotal == playerTotal) && (dealerTotal == 21)) {
		// return push;
	    console.log("push");
	}
	else if (playerTotal == 21) {
	  	console.log('player got blackjack');
	  	// return ---player got blackjack
	  	// player win $$ add ___betAmount * 1.5x___ to wallet
	  	// deal button is on again
	}
	else if (dealerTotal == 21) {
	  	console.log('dealer got blackjack');
	    // return ---dealer got blackjack
	    // player lose $$, subtract ___betAmount___ from wallet
	    // deal button is on again
	} 
	else if ((dealerTotal < 21) && (playerTotal > 21)) {
		p = document.createElement('p'); //<---this works but it makes a whole new p tag
		// p.className = 'player-text';
		p.innerHTML = 'you went bust';
		playerArea.appendChild(p);
		console.log('you busted')
	}
}

var win = function() {
	console.log('player won!')
}

var hit = function() {
	if (playerTotal <= 20) {
		addCardToPlayer();
		pause();
		console.log('added card to player. Player total is now ' + playerTotal);
		// checkForBlackjack();
	}
}

var push = function() {
	p = document.createElement('p'); //<---this works but it makes a whole new p tag
	p.className = 'player-text';
	p.innerHTML = 'you got a push';
	playerArea.appendChild(p);
	wallet = wallet + 5;
}

var bust = function() {
	// p = document.createElement('p'); //<---this works but it makes a whole new p tag
	// p.className = 'player-text';
	// p.innerHTML = 'you busted';
	// playerArea.appendChild(p);
	// console.log('you busted')
}

// var checkForWin = function {
// 	if 
// }

/* checkForWin function
	  // First, check for blackjacks
	  if (dealerHand === playerHand) && (dealerHand <= 21) {
		return push;
	  } 
	  else if (playerHand === 21) && (dealerHand !== 21) {
	  	return ---player got blackjack
	  	player win $$ add ___betAmount * 1.5x___ to wallet
	  	deal button is on again
	  }
	  else if (dealerHand === 21) && (playerHand !== 21) {
	    return ---dealer got blackjack
	    player lose $$, subtract ___betAmount___ from wallet
	    deal button is on again
	  } 
	  

	  // Next, check to see if anyone has busted
	  if (playerHand > 21) && (dealerHand)


	  // Next, check to see if the player is eligible to hit 
	  if (dealerHand < 21)



	  else if (playerHand > 21) {
	  	return ---bust 
	  	player lose $$, subtract ___betAmount___ from wallet
	  }
	  else if () {
		
	  }

	  _?_ are "push" and "winner" functions? wtf should they be?
 */

 //*****************************
// PLAYER : HIT & STAND
//******************************