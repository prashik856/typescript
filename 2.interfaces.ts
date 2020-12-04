// INTERFACES
// type checking focuses on the shape that values have.
// duck typing or structural subtyping.

// First Interface
function printLabel(labeldObj: {label: string} ) {
    console.log(labeldObj.label);
}
let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
/*
The type checker checks the call to printLabel. 
The printLabel function has a single parameter that requires that 
the object passed in has a property called label of type string.
Notice that our object actually has more properties than this, 
but the compiler only checks that at least the ones required 
are present and match the types required.
*/
interface LabeledValue {
    label: string;
}
function printLabel1(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}
myObj = {size: 10, label: "Size 10 Object"};
printLabel1(myObj);
/*
The interface LabeledValue is a name we can now use to describe 
the requirement in the previous example. 
t still represents having a single property called label 
that is of type string
*/


// Optional Properties.
/**Not all properties of an interface may be required. 
 * Some exist under certain conditions or may not be there at all. 
 * */
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): 
{color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if(config.color){
        newSquare.color = config.color;
    }
    if(config.width){
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
/**Interfaces with optional properties are written similar to other 
 * interfaces, with each optional property denoted by a ? at the 
 * end of the property name in the declaration. 
 * The advantage of optional properties is that you can describe 
 * these possibly available properties while still also preventing 
 * use of properties that are not part of the interface. 
 * For example, had we mistyped the name of the color property in 
 * createSquare, we would get an error message letting us know:
 * */

 // Readonly properties
 /**Some properties should only be modifiable when an object is 
  * first created. 
  * You can specify this by putting readonly before the name of 
  * the property: */
 interface Point {
     readonly x: number;
     readonly y: number;
 }
 // We can now create an object. Once created, 
 //these values cannot be changed.
 let p1: Point = {x: 10, y: 20};
 /**
  * p1.x = 5; // error!
Cannot assign to 'x' because it is a read-only property.
  */
 // When we want readonly array, we can use ReadonlyArray<T> \
 // rather than using Array<T>
 let a: number[] = [1,2,3,4,5];
 let ro: ReadonlyArray<number> = a;
 // Now, we cannot assign anymore values to ro, it will result 
 // in an error.
 /**
  * ro[0] = 12; // error!
Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
  */
//On the last line of the snippet you can see that even assigning 
//the entire ReadonlyArray back to a normal array is illegal. 
//You can still override it with a type assertion, though:
a = ro as number[];

// readonly vs const
/**The easiest way to remember whether to use readonly or const is 
 * to ask whether you’re using it on a variable or a property. 
 * Variables use const whereas properties use readonly. */

 
 // Excess Property Checks
 // Error example:
 /**
  * interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare = createSquare({ colour: "red", width: 100 });
Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
  Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
  */
// TypeScript does excessive property checking
// Getting around these checks is actually really simple.
let mySqaure2 = createSquare({width: 100, opacity: 0.5} as SquareConfig);
/**However, a better approach might be to add a string index 
 * signature if you’re sure that the object can have some extra 
 * properties that are used in some special way. 
 * If SquareConfig can have color and width properties with the 
 * above types, but could also have any number of other properties
 * */
interface SquareConfig1 {
    color? : string;
    width? : number;
    [propName: string]: any;
}
// Here, we are saying a SquareConfig can have any number of
// properties, and as long as they aren't color or width, their 
// type don't matter.
/**One final way to get around these checks, which might be a 
 * bit surprising, is to assign the object to another variable: 
 * Since squareOptions won’t undergo excess property checks, 
 * the compiler won’t give you an error.

let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions); 
*/
// But don't do this kinda shit. Always follow typescript's excess
// property checks


// FUNCTION TYPES
// Interface with function types
interface SearchFunc {
    (source: string, subString: string): boolean;
}
/**Once defined, we can use this function type interface like 
 * we would other interfaces. 
 * Here, we show how you can create a variable of a function 
 * type and assign it a function value of the same type. 
 * */
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string){
    let result = source.search(subString);
    return result > -1;
}
/**For function types to correctly type check, the names of 
 * the parameters do not need to match. 
 * */
mySearch = function (src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  };
// We can just ignore the type of arguments when defining the function.
// Since it is already defined in the interface.
mySearch = function (src, sub) {
    let result = src.search(sub);
    return result > -1;
  };
/**Had the function expression returned numbers or strings, 
 * the type checker would have made an error that indicates 
 * return type doesn’t match the return type described in 
 * the SearchFunc interface. 
 * */
/**let mySearch: SearchFunc;

mySearch = function (src, sub) {
Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
  Type 'string' is not assignable to type 'boolean'.
  let result = src.search(sub);
  return "string";
}; */


// Indexable Types.
/**Indexable types have an index signature that describes the 
 * types we can use to index into the object, along with 
 * the corresponding return types when indexing. */
interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
/**Above, we have a StringArray interface that has an index signature.
 *  This index signature states that when a StringArray is 
 * indexed with a number, it will return a string. 
 * There are two types of supported index signatures: 
 * string and number.
 * when indexing with a number, JavaScript will actually convert 
 * that to a string before indexing into an object. 
 * That means that indexing with 100 (a number) is the same thing 
 * as indexing with "100" (a string)
 * */
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
/*
interface NotOkay {
    [x: number]: Animal;
    //Numeric index type 'Animal' is not assignable 
    //to string index type 'Dog'.
    [x: string]: Dog;
}
*/
/*
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, the type of 'name' is not a subtype of the indexer
Property 'name' of type 'string' is not assignable to string index type 'number'.
} 
*/
//properties of different types are acceptable if the 
//index signature is a union of the property types:
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; // ok, length is a number
    name: string; // ok, name is a string
  }
//you can make index signatures readonly in order to 
//prevent assignment to their indices:
/*
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
Index signature in type 'ReadonlyStringArray' only permits reading.
*/
//You can’t set myArray[2] because the index signature is readonly.

// Class Types Interfaces
//explicitly enforcing that a class meets a particular contract
interface ClockInterface1 {
    currentTime: Date;
    setTime(d: Date): void;
}
class Clock1 implements ClockInterface1 {
    currentTime: Date = new Date();
    setTime(d: Date){
        this.currentTime = d;
    }
    constructor(h: number, m: number) {}
}
//You can also describe methods in an interface that 
//are implemented in the class, as we do with setTime 
//in the below example:
/** Interfaces describe the public side of the class, rather than 
 * both the public and private side. 
 * This prohibits you from using them to check that a class 
 * also has particular types for the private side of 
 * the class instance.
 * */


 // Difference between the static and instance sides of classes
 /**When working with classes and interfaces, it helps to keep in 
  * mind that a class has two types: the type of the static side 
  * and the type of the instance side. 
  * when a class implements an interface, only the instance side 
  * of the class is checked.
  * Since the constructor sits in the static side, it is 
  * not included in this check.
  * we define two interfaces, ClockConstructor for the constructor 
  * and ClockInterface for the instance methods. 
  * Then, for convenience, we define a constructor function 
  * createClock that creates instances of the type that is passed 
  * to it:
  * */
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}
function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number):
    ClockInterface{
        return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick(){
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number){}
    tick(){
        console.log("tick tock");
    }
}
let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
/** 
 * Because createClock’s first parameter is of type 
 * ClockConstructor, in createClock(AnalogClock, 7, 32), 
 * it checks that AnalogClock has the correct constructor 
 * signature.
*/
// Simple way of using this:
/*
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
};
*/


// Extending Interfaces
/**Like classes, interfaces can extend each other. 
 * This allows you to copy the members of one interface into 
 * another, which gives you more flexibility in how you 
 * separate your interfaces into reusable components. 
 * */
interface Shape {
    color: string;
  }

interface PenStroke {
penWidth: number;
}

interface Square extends Shape, PenStroke {
sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// Hybrid Types
//object that acts as both a function and an object
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = function(start: number) {} as Counter;
    counter.interval = 123;
    counter.reset = function () {};
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// INTERFACES EXTENDING CLASSES
/**
 * When an interface type extends a class type it inherits 
 * the members of the class but not their implementations. 
 * It is as if the interface had declared all of the members 
 * of the class without providing an implementation. 
 * Interfaces inherit even the private and protected members of 
 * a base class. 
 * This means that when you create an interface that extends a 
 * class with private or protected members, that interface 
 * type can only be implemented by that class or a subclass of it.
 */

class Control {
    private state: any;
}

interface SelectableControl extends Control{
    select(): void;
}

class Button extends Control implements SelectableControl {
    select(){}
}
class TextBox extends Control {
    select(){}
}
// class ImageControl implements SelectableControl {
//     private state: any;
//     select() {}
// }
// This will give an error
/**Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
  Types have separate declarations of a private property 'state'. */
  /**
   * In the above example, SelectableControl contains all of the 
   * members of Control, including the private state property. 
   * Since state is a private member it is only possible for 
   * descendants of Control to implement SelectableControl. 
   * This is because only descendants of Control will have a 
   * state private member that originates in the same declaration, 
   * which is a requirement for private members to be compatible.
   *
   * 
   * Within the Control class it is possible to access the 
   * state private member through an instance of SelectableControl. 
   * Effectively, a SelectableControl acts like a Control that 
   * is known to have a select method. 
   * The Button and TextBox classes are subtypes of 
   * SelectableControl (because they both inherit from Control 
   * and have a select method). 
   * The ImageControl class has it’s own state private member 
   * rather than extending Control, so it cannot implement 
   * SelectableControl.
   */
  