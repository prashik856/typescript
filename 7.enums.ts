// ENUMS
// Numeric enums
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

//Direction.Up has the value 1, Down has 2, 
//Left has 3, and Right has 4.

enum Direction1 {
    Up,
    Down,
    Left,
    Right,
  }
// Here, Up would have the value 0, Down would have 1, etc.

// Enums need to to initialized always: Cannot just use a function
// there to initialize them.


// String enums
// Each member has to be initialized.
enum Direction2 {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }


// HETEROGENEOUS ENUMS
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
  }
// Just don't do this?


// Computed and constant members
//Each enum member has a value associated with it which can be 
//either constant or computed
/**
 * It is the first member in the enum and it has no initializer, 
 * in which case it’s assigned the value 0:

// E.X is constant:
enum E {
X,
}Try
It does not have an initializer and the preceding enum member 
was a numeric constant. 
In this case the value of the current enum member will be 
the value of the preceding enum member plus one.

// All enum members in 'E1' and 'E2' are constant.

enum E1 {
X,
Y,
Z,
}

enum E2 {
A = 1,
B,
C,
}
 */


// one of the +, -, ~ unary operators applied to constant 
// enum expression
// +, -, *, /, %, <<, >>, >>>, &, |, ^ binary operators with 
// constant enum expressions as operands

enum FileAccess {
    // constant members
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    // computed member
    G = "123".length,
  }

