/* TO DO

   Disable buttons when they shouldn't be active.

   BUG: The dealerTotal, when there's a dealerAce, is off. It gives too many cards to the dealer when stand() executes. 
   Example: the dealer was given 3,A,K,2,6,5. The dealer should not be given the last card (5) because he already had a total of
   22 after dealerAces subtracts 10. Oddly, playerAces seems to work fine. Example: player got 3,A,K and won with that hand. 
   Player natural blackjack printed twice. Oddly, other situations don't print twice. I don't know why just this one thing 
   (the player natural blackjack) prints twice. 
   UPDATE: I think this is fixed; I need to keep playing to test it

   BUG: I need to change it so the checkForBlackjack function isn't called every time a card goes down DURING THE INITIAL DEAL, 
   because it is printing a win twice, which also doubles the amount that goes in the wallet.
   UPDATE: "Dealer got blackjack" on initial deal - it prints twice on dealer area, and "you lose" prints twice on player area
   UPDATE - GOOD: "You got blackjack" prints once
*/

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
var playerAces = 0;
var dealerAces = 0;


//*****************************
// CREATE DECK ARRAY
//*****************************

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
	var removeCards = container.getElementsByClassName("card");
	while (removeCards[0]) {
		removeCards[0].parentNode.removeChild(removeCards[0]);
	}
	var removeP = container.getElementsByClassName("status");
	while (removeP[0]) {
		removeP[0].parentNode.removeChild(removeP[0]);
	}
	playerHand = [];
	dealerHand = [];
	playerTotal = 0;
	dealerTotal = 0;
	playerAces = 0;
	dealerAces = 0;
	cards = [];
	shuffle(theDeck);
	wallet = wallet - 5;
	addCardToPlayer();
	var waitDealer = setTimeout(addCardToDealer, 700);
	var waitPlayer = setTimeout(addCardToPlayer, 1400);
	var waitDealer2 = setTimeout(addCardToDealer, 2100);
}

var addCardToDealer = function() {
    var newCard = theDeck.pop();
    dealerHand.push(newCard);
	var lengthOfDealerHand = dealerHand.length - 1;
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
	var wait = setTimeout(pause, 2200);
	checkForBlackjack();
}

var addCardToPlayer = function() {
	var newCard = theDeck.pop(); 
	playerHand.push(newCard);
	var lengthOfPlayerHand = playerHand.length - 1;
	div = document.createElement('div');
	div.className = 'card';
	var ascii_char = '&' + playerHand[lengthOfPlayerHand].suit + ';'; 
	div.innerHTML = '<span class="number">' + playerHand[lengthOfPlayerHand].name + '</span><span class="suit"><sub>' + ascii_char + '</sub></span>';
	playerArea.appendChild(div); 
	playerTotal = playerTotal + newCard.value;
	if (newCard.value == 11) {
		playerAces = playerAces + 1;
	}
	var wait = setTimeout(pause, 2200);
	checkForBlackjack();
}

var pause = function() {
    console.log('pause. wallet has $' + wallet);
    console.log('pause. player has ' + playerTotal + ', dealer has ' + dealerTotal);
}

//*****************************
// WIN CONDITIONS
//******************************
var checkForBlackjack = function() {
	if ((dealerTotal == playerTotal) && (dealerTotal == 21)) {
		p = document.createElement('p');
		p.className = 'status';
		p.innerHTML = 'Damn! You both got Blackjack!';
		dealerArea.appendChild(p);
		document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
		return pushed();
	}
	else if ((playerTotal == 21) && (dealerHand.length == 2)) {
	  	return playerNaturalBlackjack();
	}
	else if ((dealerTotal == 21) && (dealerHand.length == 2)) {
		p = document.createElement('p'); 
		p.className = 'status';
		p.innerHTML = 'Dealer got blackjack';
		dealerArea.appendChild(p);
		document.getElementById("down").className = document.getElementById("down").className.replace( /(?:^|\s)black(?!\S)/g , '' );
	  	return lose();
	} 
	else if (dealerTotal == 21) {
		p = document.createElement('p'); 
		p.className = 'status';
		p.innerHTML = 'Dealer got 21';
		dealerArea.appendChild(p);
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
	p.innerHTML = 'you got a push!';
	playerArea.appendChild(p);
	
	wallet = wallet + 5;
	printStatus();
}

var bust = function() {
	p = document.createElement('p');
	p.className = 'status';
	p.innerHTML = 'You busted!';
	playerArea.appendChild(p);

	printStatus();
}

var playerNaturalBlackjack = function() {
	p = document.createElement('p');
	p.className = 'status';
	p.innerHTML = "You got blackjack!<br/>You win 1.5x your bet";
	playerArea.appendChild(p);
	
	wallet = wallet + 12.50;
	printStatus();
}

var win = function() {
	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'You win!';
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
	p.innerHTML = "Dealer had " + dealerTotal + " &mdash;  You had " + playerTotal;
	playerArea.appendChild(p);

	p = document.createElement('p'); 
	p.className = 'status';
	p.innerHTML = 'Wallet: $' + wallet;
	var walletArea = document.getElementById('wallet-area');
	walletArea.appendChild(p);
}

