// LITERALS
// strings, number or boolean
// We're making a guarantee that this variable
// helloWorld will never change, by using const.

// So, TypeScript sets the type to be "Hello World" not string
const helloWorld = "Hello World";

// On the other hand, a let can change, and so the compiler declares it a string
let hiWorld = "Hi World";
/**The process of going from an infinite number of potential cases 
 * (there are an infinite number of possible string values) 
 * to a smaller, finite number of potential case 
 * (in helloWorld’s case: 1) is called narrowing. */


 // String Literal Types
 type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // It's possible that someone could reach this
      // by ignoring your types though.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
//button.animate(0, 0, "uneasy");
//Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.


// Numeric Literal Types
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
  }
  
  const result = rollDice();
//A common case for their use is for describing config values:
interface MapConfig {
    lng: number;
    lat: number;
    tileSize: 8 | 16 | 32;
  }
  
//  setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });


// Boolean Literal Types
//TypeScript also has boolean literal types. 
//You might use these to constrain object values whose 
//properties are interrelated.
interface ValidationSuccess {
    isValid: true;
    reason: null;
  }
  
  interface ValidationFailure {
    isValid: false;
    reason: string;
  }
  
  type ValidationResult = ValidationSuccess | ValidationFailure;