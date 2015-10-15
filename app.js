// Basic pseudo code
// 1. Place Bet
// 2. Deck Array is shuffled
// 3. 2 cards from Array are dealt to player
// 4. 2 cards from Array are dealt to dealer
// 5. player and dealer check value of cards
// 6. if player cards add up to 21, player wins (Blackjack)
// 7.  if player cards don't add up to 21, then:
// 8.  loop --
            // 9. player chooses to hit or stand
            // 10. if hit, add card from deck to hand and add values of player cards
            // 11. loop continues until the player decides to stand
// 12. after loop ======>
// 13. compare hands of player and dealer
// 14. if player is under 21 and greater than dealer, player wins;
// 15. if dealer is under 21 and greater than player, dealer wins;
// 16. if player and dealer have same values, it is a push ('tie');
// 17. if player wins, they get bet plus dealer’s bet
// 18. if dealer wins, they keep the bet

var playerHand = []; // should this be in global scope or inside this function?
var dealerHand = []; // should this be in global scope or inside this function?
var cards = []; //this is also named inside the deck function, but i think it should be in global scope instead

var card = function(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
}

var deck = function(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
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

var myDeck = new deck();

window.onload = function(){
	// where should this go? kyle has it placed here, with everything that follows to be inside the bracket on next line :/
	myDeck = shuffle(myDeck);
	console.log(myDeck);
	for(var z=0; z<myDeck.length; z++) {
		div = document.createElement('div');
		div.className = 'card';
		if(myDeck[i].suit == 'Diamonds'){
			var ascii_char = '&diams;';
		} else {
			var ascii_char = '&' + myDeck[i].suit.toLowerCase() + ';';
		}
		div.innerHTML = '<span class="number">' + myDeck[i].name + '</span><span class="suit">' + ascii_char + '</span>';
		document.body.appendChild(div);
	}

}



var dealOrDraw = function() {
	// if (dealt == true) draw();
	// else deal();
	console.log("you clicked 'deal'")
} 

//give card to dealer face down, card to player, card to dealer, card to player
var deal = function() {
	var dealerHand = []; // should this be in global scope or inside this function?
	var playerHand = []; // should this be in global scope or inside this function?
	var giveCards = cards.pop();
	dealerHand.push(newCard);
	// console.log("rad");
	// shuffle(myDeck);
	// var giveCard1 = document.getElementById('player-card-1');
	// giveCard1.innerHTML = "yeah";
}

// var playerCards =[];
// var playerCardOne = cards.pop();
// var playerCardTwo = cards.pop();
// playerCards.push(playerCardOne, playerCardTwo);

















// window.onload = function() {

//     for(var i=0; i < myDeck.length; i++){
//         div = document.createElement('div');
//         div.className = 'card';

//         if(myDeck[i].suit == 'Diamonds'){
//             var ascii_char = '&diams;';
//         } else {
//             var ascii_char = '&' + myDeck[i].suit.toLowerCase() + ';';
//         }

//         div.innerHTML = '<span class="number">' + myDeck[i].name + '</span><span class="suit">' + ascii_char + '</span>';
//         document.body.appendChild(div);
//     }

// }






// var randomRating = Math.random() * 10;
// var twoRandomScores = function() {
//     var score1 = randomRating;
//     var score2 = randomRating;
//     return score1 + score2;
// }
// twoRandomScores();