// Boolean
let isDone: boolean = false;

// Number
// either floating point values or Bigintegers.
// floating pointer are of type number, while BigIntegers are of type
// bigint
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

// String
// Textual data type.
// Use double quotes or single quote to manipulate string data
let color: string = "blue";
color = 'red';

// Templating strings
// Need to start string declaration with backtick/backquote (`)
// character.
// Embedded expressions are of the form ${expr}
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
// Equivalent to declarint sentence like so:
sentence = "Hello, my name is " + fullName + ".\n\n"
            + "I'll be " + (age + 1) + " years old next month.";


// Array
// Working with array values.
let list: number[] = [1,2,3];
// Generic array type, Array<elemType>
let list1: Array<number> = [1,2,3];

// Tuple
// Express an array with fixed number of elements whose types are
// known, but need not be the same.
// String and a number value pair.
let x: [string, number];
x = ["hello", 10]; // OK Initialization
//x = [10, "hello"]; // Wrong initialization

// Accessing an element with known index, correct type is retrieved
console.log(x[0].substring(1));
//console.log(x[1].substring(1)); // Error
// Cannot access an element outside the set of known indices.
//x[3] = "world"; // Error!

// Enum
// A way of giving friendly names to set of numberic values.
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;
// By default, enums begin numbering their members starting at 0.
// We can change this by manually setting the value of it's members.
enum Color1 {
    Red = 1,
    Green,
    Blue,
}
let c1: Color1 = Color1.Green;
// Manually set all the values
enum Color2 {
    Red = 1,
    Green = 2,
    Blue = 4,
}
let c2 : Color2 = Color2.Green;
// Looking up to the corresponding value.
// We can also go from numeric value to the name of that value in enum.
// E.g. we don't know whose value is mapped to 2.
let colorName: string = Color1[2];
console.log(colorName); // Displays Green

// Unknown
// dynamic values.
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false; // boolean
// We can narrow it down by doing the typeof checks, 
// comparison checks, or more advanced type guards.
declare const maybe: unknown;
if(maybe === true){
    const aBoolean: boolean = maybe;
    // Typescript now knows that maybe variable can be a boolean now. 
}
if (typeof maybe === "string"){
    const aString: string = maybe;
}

// Any
// Not all info is available.
declare function getValue(key: string): any;
const str: string = getValue("myString");
// Unike unknown, variables of type any allows us to access artitrary
// properties, even one that don't exists.
let looselyTyped: any = 4;
// Ok, ifItExists() might exists at runtime
looselyTyped.ifItExists();
// Ok, toFixed exists (but compiler doesn't check)
looselyTyped.toFixed();
let strictlyTyped: unknown = 4;
//strictlyTyped.toFixed(); // Object is of type : 'unknown'
// 'any' will continue to propagate through objects.
let looselyTyped1: any = {};
let d = looselyTyped1.a.b.c.d;
// ^ = led d: any
// Avoid using any when not necessary.

// Void
// opposite of any: the absence of having any type at all.
function warnUser(): void {
    console.log("This is a warning message");
}
// void var can oly be assigned 'null' or 'undefined' value.
let unusable: void = undefined;
// ok if --strictNullChecks is not given.
unusable = null;

// Null and Undefined.
// Not much else we can assign to these variables.
let u: undefined = undefined;
let n: null = null;
// By default, null and undefined are subtypes of al other types.
// That means, we can assign null and undefined to something
// like number.
// However, when using the --strictNullChecks flag, null and
// undefined are only assignable to unknown, any and their 
// respective types.
// undefined is also assignable to void.
// Use --strictNullChecks whenever possible.

// Never
// Type of values that never occur.
// Used in function that always throws an exception.
// functions returning never must not have a reachable end point
function error(message: string): never {
    throw new Error(message);
}
// Inferred return type is never
function fail(){
    return error("Something failed")
}
function infiniteLoop(): never {
    while(true){}
}

// Object
// Object is a type that represents the non-primitive type:
// i.e. anything that is not number, string, boolean, bigint,
// symbol, null or undefined.
// With object type, APIs like Object.create be better represented.
declare function create(o: object | null): void; 
create({prop: 0});
create(null);
// create(42); // not applicable here.

// Type Assertions
// Trust me, I know what I am doing.
// Type assertions have two forms.
// One is as-syntax
let someValue: unknown = "This is a string";
let strLength: number = (someValue as string).length;
// Other is angle-bracket syntax:
let strLength1: number = (<string>someValue).length;
// Both are same!

// About Number, String, Boolean, Symbol and Object
// This type should never be used, mate. 
function reverse(s: String): String {
    return s.split("").reverse().join("");
}
// Always use lower cases when we are declaring an object.
function reverse1(s: string): string {
    return s.split("").reverse().join("");
}