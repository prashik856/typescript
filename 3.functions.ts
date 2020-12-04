//FUNCTIONS

// functions
// Can be named or anonymous
// Named function in JS
function add(x,y) {
    return x + y;
}

// Anonymous function
let myAdd = function (x,y) {
    return x + y;
}

// Functions can refer to variables outside of function body
let z = 100;
function addToZ(x, y){
    return x + y + z;
}

// Function Types
// TYPING THE FUNCTION
// Adding types to our function
function add1(x: number, y: number): number {
    return x + y;
}
let myAdd1 = function (x: number, y: number): number {
    return x + y
}

// Writing function type
let myAdd2: (x: number, y: number) => number = function (
    x: number, 
    y: number
): number {
    return x + y;
}

// type of arguments and the return type.
// Both are required.
let myAdd3: (baseValue: number, 
             increment: number) => number = 
function (
    x: number,
    y: number
): number {
    return x + y;
}
// As long as parameter types line up, it is considered as a 
// valid type for the function
// regardless of the names we give the parameters in the function type.
// Make it clear that return type is by (=>) between parameters and
// the return type.

// Inferring the types
// TypeScript can figure out the type even if we only
// have types on one side of the equation
let myAdd4 = function (x: number, y: number): number {
    return x + y;
};
// Full function type
let myAdd5: (baseValue: number, increment: number) => number =
function (x, y) {
    return x + y;
}
// Called contextual typing.


// Optional and Default parameters
// Every param is assumed to be required.
function buildName(firstName: string, lastName: string): string {
    return firstName + " " + lastName;
}
let result1: string = buildName("Bob", "builder");
//let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
//adding a ? to the end of parameters we want to be optional

function buildName1(firstName: string, lastName?: string) {
    if (lastName) return firstName + " " + lastName;
    else return firstName;
  }
  let result2 = buildName1("Bob"); // works correctly now
  let result3 = buildName1("Bob", "Adams", "Sr."); // error, too many parameters
  //Expected 1-2 arguments, but got 3.
  let result4 = buildName1("Bob", "Adams"); // ah, just right
  
// default-initialized parameters
function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
  }
  
  let result5 = buildName2("Bob"); // works correctly now, returns "Bob Smith"
  let result6 = buildName2("Bob", undefined); // still works, also returns "Bob Smith"
  let result7 = buildName2("Bob", "Adams", "Sr."); // error, too many parameters
  //Expected 1-2 arguments, but got 3.
  let result8 = buildName2("Bob", "Adams"); // ah, just right


// Rest Parameters
// Many arguments passed to function
function buildName3(firstName: string, 
                    ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
// ... is called ellipsis.

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName3;


// this
// this and arrow functions
// Set when function is called.
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        return function () {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard/13);
            return {
                suit: this.suits[pickedSuit],
                card: pickedCard%13
            };
        };
    },
};

let cardPicker = deck.createCardPicker;
let pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
/**createCardPicker is a function that itself returns a function 
 * 
*/

// Writing the same using arrow syntax.
deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
  
        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  let cardPicker1 = deck.createCardPicker();
  let pickedCard1 = cardPicker1();
  alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);


  // this parameters
  // the type of this.suits[pickedSuit] is still any
  // That’s because this comes from the function expression 
  // inside the object literal.
  /** you can provide an explicit this parameter. 
   * this parameters are fake parameters that come first in 
   * the parameter list of a function: */
function f(this: void){
    // makes sure this is unusable in this standalone function
}

// Add a couple of interfaces, to make the types cleare and 
// easier to reuse:
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck2: Deck = {
    suits: ["heards", "spades", "clubs", "diamons"],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {
                suit: this.suits[pickedSuit],
                card: pickedCard % 13
            };
        };
    },
};

let cardPicker3 = deck2.createCardPicker();
let pickedCard2 = cardPicker3();
/**
 * Now TypeScript knows that createCardPicker expects to be 
 * called on a Deck object. 
 * That means that this is of type Deck now, not any, 
 * so --noImplicitThis will not cause any errors.
 */


// This parameters in callbacks
// When function is imported from a library, this is
// how we can pass the this function
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
  }


// Overloads
// return different types of objects based on the shape of 
//the arguments passed in.
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard3 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard4 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

/**Here, the pickCard function will return two different things 
 * based on what the user has passed in. 
 * If the users passes in an object that represents the deck, 
 * the function will pick the card. 
 * If the user picks the card, we tell them which card 
 * they’ve picked. 
 * How do we use type function here?
 * The answer is to supply multiple function types for the 
 * same function as a list of overloads. 
 * This list is what the compiler will use to resolve function calls.
 * */

let suits1 = ["hearts", "spades", "clubs", "diamonds"];

function pickCard2(x: { suit: string; card: number }[]): number;
function pickCard2(x: number): { suit: string; card: number };
function pickCard2(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck1 = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard6 = myDeck[pickCard2(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard5 = pickCard2(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);