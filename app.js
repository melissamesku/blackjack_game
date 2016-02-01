/* NOTES : BUG FIXES AND UPDATES

   BUG --UPDATE: THIS HAS BEEN FIXED-- : The dealerTotal, when there's a dealerAce, is off. It gives too many cards to the dealer when stand() executes. 
   Example: the dealer was given 3,A,K,2,6,5. The dealer should not be given the last card (5) because he already had a total of
   22 after dealerAces subtracts 10. Oddly, playerAces seems to work fine. Example: player got 3,A,K and won with that hand. 
   Player natural blackjack printed twice. Oddly, other situations don't print twice. I don't know why just this one thing 
   (the player natural blackjack) prints twice. 
   UPDATE: Fixed

   BUG --UPDATE: THIS HAS BEEN FIXED-- : Need to make dealer's card turn over when dealer only has two cards but the player wins (?) (or busts!).
   This seems to only happen sometimes (two cards each, and player won 20 to 18, and dealers card did in fact turn over). CONFIRMED.  
   GOOD: Looks like it's fixed: when player wins and dealer loses with two cards, results are good and card turns over correctly.
   GOOD: When player busts and dealer has two cards, card does not turn over but this is OK - we don't need to see dealer card!
   GOOD: When both players push with only two cards each, everything's good - the card turns over correctly.
   DEBUG NOTE: GOOD: When you win and dealer has 3 cards, it's fine (dealer card turns over). 
   DEBUG NOTE: GOOD: When you push, even when dealer has only two cards, all's well (dealer card turns over). 
   DEBUG NOTE: GOOD: When you lose to dealer blackjack or when dealer still has only two cards, it's fine (dealer card turns over).
   DEBUG NOTE: GOOD: When you both have two cards and both push, at least under 21, dealer card turns over
   UPDATE: Fixed

   BUG --UPDATE: THIS HAS BEEN FIXED-- : When player gets 21 with three cards, it still stays "blackjack", when actually it should just say that player wins, because
   a blackjack is technically when you only have two cards. 
   UPDATE: Fixed 

   POSSIBLE FEATURE UPGRADE: Disable buttons when they don't need to be active.
   POSSIBLE FEATURE UPGRADE: Add splitting functionality?
   POSSIBLE FEATURE UPGRADE: Play with more decks of cards
   POSSIBLE FEATURE UPGRADE: Make it so natural blackjack requires a face card, not just a 10
   POSSIBLE FEATURE UPGRADE: Give subsequent dealer cards a setTimeout
   POSSIBLE FEATURE UPGRADE: Make hearts and diamonds red

   JAN 26-27: 
   FIXED SOME BUGS & CREATED NEW ONES
   BUG: When dealer gets 21, and player loses with less points, the results print twice. (I think this is fixed now)
   BUG: Player had blackjack on first deal; dealer did not, but no results were printed at all. CONFIRMED, but when I hit "stand" there's A DIFFERENT PROBLEM:
   BUG (NEW): Player had blackjack on first deal, dealer did not, but results printed like 4 times because it checked for every new card he was dealt, but he shouldn't be dealt anything once I get blackjack, also I had to hit "stand" for that to happen
   ...this means that 
   GOOD: When dealer gets natural blackjack 21, and player loses with less points, results correct. CONFIRMED!
*/

//*****************************
// GLOBAL VARIABLES
//*****************************

// var playerHand = []; 
// var dealerHand = []; 
var cards = []; 
var wallet = 100;
var playerArea = document.getElementById('player-area');
var dealerArea = document.getElementById('dealer-area');
var newCard;
// var displayPlayerTotal;
// var displayDealerTotal;
// var playerTotal = 0;
// var dealerTotal = 0;
// var playerAces = 0;
// var dealerAces = 0;
// var blackjacks = 0;


//*****************************
// CREATE A SHUFFLED DECK
//*****************************

var card = function(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
}

var deck = function(){
    this.values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['hearts','diams','spades','clubs'];
    
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

shuffle(theDeck);


//*****************************
// DEAL 'EM
//*****************************

var deal = function() {
	var removeCards = container.getElementsByClassName("card");
	while (removeCards[0]) {
		removeCards[0].parentNode.removeChild(removeCards[0]);
	}
	var removeStatus = container.getElementsByClassName("status");
	while (removeStatus[0]) {
		removeStatus[0].parentNode.removeChild(removeStatus[0]);
	}
	playerHand = [];
	dealerHand = [];
	playerTotal = 0;
	dealerTotal = 0;
	playerAces = 0;
	dealerAces = 0;
	blackjacks = 0;
	cards = [];
	wallet = wallet - 5;
	addCardToPlayer();
	setTimeout(addCardToDealer, 700);
	setTimeout(addCardToPlayer, 1400);
	setTimeout(addCardToDealer, 2100);
	// console.log(theDeck.length);
}


var addCardToDealer = function() {
    var newCard = theDeck.pop();
    dealerHand.push(newCard);
	lengthOfDealerHand = dealerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card black';
	div.setAttribute('id', 'down');
	var ascii_char = '&' + dealerHand[lengthOfDealerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + dealerHand[lengthOfDealerHand].name + '</span><span class="suit"><sub>' + ascii_char + '</sub></span>';
	dealerArea.appendChild(div); 
	dealerTotal = dealerTotal + newCard.value; 
	if (newCard.value == 11) {
		dealerAces = dealerAces + 1;
	}
	setTimeout(2200);
	if ((lengthOfDealerHand >= 1) && (blackjacks == 0)) {
		checkForBlackjack();
		// console.log("checkForBlackjack in addCardToDealer " + blackjacks);
	}
}

var addCardToPlayer = function() {
	var newCard = theDeck.pop(); 
	playerHand.push(newCard);
	lengthOfPlayerHand = playerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card';
	var ascii_char = '&' + playerHand[lengthOfPlayerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + playerHand[lengthOfPlayerHand].name + '</span><span class="suit"><sub>' + ascii_char + '</sub></span>';
	playerArea.appendChild(div); 
	playerTotal = playerTotal + newCard.value;
	if (newCard.value == 11) {
		playerAces = playerAces + 1;
	}
	setTimeout(2200);
	if ((lengthOfPlayerHand >= 1) && (blackjacks == 0)) {
		checkForBlackjack();
		// console.log("checkForBlackjack in addCardToPlayer " + blackjacks);
	}
}


//*****************************
// WIN CONDITIONS
//*****************************

var checkForBlackjack = function() {
	if (blackjacks == 1) {
		console.log('blackjack already declared, so these hands are over'); //not sure if this works yet
		return;
	}
	else if ((dealerTotal == playerTotal) && (dealerTotal == 21)) {
		p = document.createElement('p');
		p.className = 'status';
		p.innerHTML = 'Damn! You both got Blackjack!';
		dealerArea.appendChild(p);
		document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
		return pushed();
	}
	else if ((playerTotal == 21) && (playerHand.length == 2)) {
		document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
	  	blackjacks = blackjacks + 1;
	  	return playerNaturalBlackjack();
	}
	else if ((dealerTotal == 21) && (dealerHand.length == 2)) {
		p = document.createElement('p'); 
		p.className = 'status';
		p.innerHTML = 'Dealer got blackjack';
		dealerArea.appendChild(p);
		document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
	  	blackjacks = blackjacks + 1;
	  	return lose();
	} 
	else if (dealerTotal == 21) {
		p = document.createElement('p'); 
		p.className = 'status';
		p.innerHTML = 'Dealer got 21';
		dealerArea.appendChild(p);
		blackjacks = blackjacks + 1;
	  	return lose();
	} 
	else if ((playerAces >= 1) && (playerTotal > 21)) {
		playerTotal = playerTotal - 10;
		playerAces = playerAces - 1;
	}
	else if ((dealerAces >= 1) && (dealerTotal > 21)) {
		dealerTotal = dealerTotal - 10;
		dealerAces = dealerAces - 1;
	}
	else if (playerTotal > 21) {
		return bust();
	}
}

var hit = function() {
	if (playerTotal == 21) {
		stand();
	}
	if (playerTotal <= 20) {
		addCardToPlayer();
	}
}

var stand = function() {
	document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
	checkForBlackjack();
	if (dealerTotal < 17) { 
		for (var d=0; dealerTotal < 17; d++){
			addCardToDealer();
			console.log('dealer gets another card');
		}
	} 
	if ((dealerTotal >= 17 && dealerTotal < 21) && (dealerTotal == playerTotal)) { 
	    return pushed();
	}
	else if ((dealerTotal >= 17 && dealerTotal < 21) && (playerTotal > dealerTotal)) { 
		return win();
	}
	else if ((dealerTotal >= 17 && dealerTotal < 21) && (playerTotal < dealerTotal)) { 
		p = document.createElement('p'); 
	    p.className = 'status';
		p.innerHTML = 'Dealer wins';
		dealerArea.appendChild(p);
		return lose();
	}
	else if ((dealerTotal > 21) && (playerTotal <= 21)) { 
		p = document.createElement('p'); 
		p.className = 'status';
		p.innerHTML = 'Dealer busted';
		dealerArea.appendChild(p);
		return win();
	}
	else if (playerTotal > 21) {
		return bust();
	}
}

var pushed = function() {
	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'Push';
	playerArea.appendChild(p);
	
	wallet = wallet + 5;
	printStatus();
}

var bust = function() {
	p = document.createElement('p');
	p.className = 'status';
	p.innerHTML = 'You busted';
	playerArea.appendChild(p);

	printStatus();
}

var playerNaturalBlackjack = function() {
	p = document.createElement('p');
	p.className = 'status';
	p.innerHTML = "Blackjack<br/>You win 1.5x your bet";
	playerArea.appendChild(p);
	
	wallet = wallet + 12.50;
	printStatus();
}

var win = function() {
	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'You win';
	playerArea.appendChild(p);
	
	wallet = wallet + 10;
	printStatus();
}

var lose = function() {
	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'You lose!';
	playerArea.appendChild(p);

	printStatus();
}

var printStatus = function() {
	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = "You had " + playerTotal + " &mdash; Dealer had " + dealerTotal;
	playerArea.appendChild(p);

	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'Wallet: $' + wallet;
	var walletArea = document.getElementById('wallet-area');
	walletArea.appendChild(p);
}



