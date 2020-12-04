// CLASSES
// simple class-based examples
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");



// INHERITANCE
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`)
    }
}

class Dog extends Animal {
    bark() {
        console.log("Woof! Woof!");
    }
}

const dog = new Dog();
dog.bark();
dog.move(0);
dog.bark();

// Dog is derived class and Animal is base class
// More complex example 
class Animal1 {
    name: string;
    constructor(theName: string){
        this.name = theName;
    }
    move(distanceInMeters: number = 0){
        console.log(`${this.name} move ${distanceInMeters}.`);
    }
}

class Snake extends Animal1 {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 5){
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal1 {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 45){
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal1 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// Again, we see the extends keywords used to create two 
//new subclasses of Animal: Horse and Snake.
// One difference from the prior example is that each derived 
// class that contains a constructor function must call super() 
// which will execute the constructor of the base class.
/**
 *  before we ever access a property on this in a constructor body, 
 * we have to call super(). 
 * This is an important rule that TypeScript will enforce.
 * Here both Snake and Horse create a move method that overrides 
 * the move from Animal, giving it functionality specific to 
 * each class. 
 * Note that even though tom is declared as an Animal, since 
 * its value is a Horse, calling tom.move(34) will call the 
 * overriding method in Horse:
 */


// PUBLIC, PRIVATE AND PROTECTED MODIFIERS
// PUBLIC BY DEFAULT

class Animal2 {
    public name: string;
    public constructor(theName: string) {
        this.name = theName;
    }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
}

// ECMAScript Private Fields.

class Animal3 {
    #name: string;
    constructor(theName: string) {
        this.#name = theName;
    }
}

new Animal3("Cat")


// Understanding TypeScript's Private
class Animal4{
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

new Animal4("Cat");


// Private and Protected members
class Animal5 {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Rhino extends Animal5 {
    constructor(){
        super("Rhino")
    }
}

class Employee {
    private name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

let animal = new Animal5("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino; // this is compatible
//animal = employee; // This is not compatible
/**Type 'Employee' is not assignable to type 'Animal'.
  Types have separate declarations of a private property 'name'. */

/**ecause Animal and Rhino share the private side of their shape
 *  from the same declaration of private name: string in Animal, 
 * they are compatible 
 *  this is not the case for Employee. 
 * When we try to assign from an Employee to Animal we get an 
 * error that these types are not compatible. 
 * Even though Employee also has a private member called name, 
 * it’s not the one we declared in Animal.
 * */


// Understanding Protected.
// The protected modifier acts much like the private modifier 
//with the exception that members declared protected can also 
//be accessed within deriving classes.
class Person {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Employee1 extends Person {
    private department: string;
    constructor(name:string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch(){
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }
}

let howard = new Employee1("Howard", "Sales");
console.log(howard.getElevatorPitch());

// Notice that while we can’t use name from outside of Person, 
// we can still use it from within an instance method of Employee 
// because Employee derives from Person.

// A constructor may also be marked protected. 
// This means that the class cannot be instantiated outside of 
// its containing class, but can be extended

class Person1 {
    protected name: string;
    protected constructor(theName: string) {
        this.name = theName;
    }
}

// Employee can extend Person
class Employee2 extends Person1 {
    private department: string;
    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }
}

let prashik = new Employee2("Howards", "Sales");
//let john = new Person1("John");
/**Constructor of class 'Person' is protected and only 
 * accessible within the class declaration. */



// Readonly modifier
// We can make properties readonly by using readonly keyword.
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");


// Parameter properties
// Parameter properties let you create and initialize a 
//member in one place
class Octopus1 {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {};
}

let data = new Octopus1("Man with 8 strong legs");
data.name;
//consolidated the declarations and assignment into one location.


//Accessors
// getters and setters
class Employee3 {
    fullName: string;
}

let employee1 = new Employee3();
employee1.fullName = "Bob Smith"; 
// ?? where is getter and setter

// Adding getter
const fullNameMaxLength = 10;
class Employee4 {
    private _fullName: string = "";
    private _lastName: string = "";

    get lastName(): string{
        return this._lastName;
    }

    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string){
        if(newName && newName.length > fullNameMaxLength) {
            throw new Error("Balh blah");
        }
        this._fullName = newName;
    }
}

let employee2 = new Employee4();
employee2.fullName = "Bob Smith";

if (employee2.fullName) {
    console.log(employee2.fullName);
}


// Static Properties
// Static members of a class.
// No need to create their instances.

class Grid {
    static origin = {x: 0, y: 0};
    constructor(public scale: number) {}
    calculateDistanceFromOrigin(point: {x: number; y: number}) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist*xDist + yDist*yDist) / this.scale;
    }
}
let grid1 = new Grid(1.0);
let grid = new Grid(5.0);



// Abstract Classes
// These are base classes from which other classes may be derived.
/**They may not be instantiated directly. 
 * Unlike an interface, an abstract class may contain 
 * implementation details for its members. 
 * The abstract keyword is used to define abstract classes 
 * as well as abstract methods within an abstract class. 
 * */

abstract class Animal3 {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
/**Methods within an abstract class that are marked as abstract 
 * do not contain an implementation and must be implemented in 
 * derived classes.  
 * Abstract methods share a similar syntax to interface methods. 
 * Both define the signature of a method without including a method 
 * body. 
 * However, abstract methods must include the abstract keyword 
 * and may optionally include access modifiers.
 * */

abstract class Department {
    constructor(public name: string){};
    printName(): void{
        console.log("Department name: " + this.name);
    }
    abstract printMeeting(): void;
    // printMeeting must be implemented in the derived class
}

class AccountingDepartment extends Department {
    constructor(){
        super("Accounting and Auditing");
    }
    printMeeting(): void{
        console.log("The Accounting Department meets each Monday at 10PM")
    }

    generateRepoerts(): void{
        console.log("Generating accounting reports...");
    }
}

let department: Department;
//department = new Department(); 
// Cannot create an instance of an abstract class
department = new AccountingDepartment();
department.printName();
department.printMeeting();



// Advanced Techniques

// Constructor functions
class Greeter1 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    greet(){
        return "Hello, " + this.greeting;
    }
}

let greeter1: Greeter1;
greeter1= new Greeter1("world");
console.log(greeter1.greet());



// Using a class as an interface
class Point1 {
    x: number;
    y: number;
}


interface Point3d extends Point1 {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};