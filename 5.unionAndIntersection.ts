// UNION TYPES
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${typeof padding}'.`);
  }
  
  padLeft("Hello world", 4); // returns "    Hello world"
//  The problem with padLeft in the above example is that its 
//padding parameter is typed as any. 
//That means that we can call it with an argument that’s 
//neither a number nor a string, but TypeScript will 
//be okay with it.

// passes at compile time, fails at runtime.
let indentedString = padLeft("Hello world", true);

/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
    // ...
  }
  
  let indentedString = padLeft("Hello world", true);
 // Argument of type 'boolean' is not assignable to parameter of
 // type 'string | number'.

//A union type describes a value that can be one of several types. 
//We use the vertical bar (|) to separate each type, so number 
//| string | boolean is the type of a value that can be a number, 
//a string, or a boolean.


// Unions with Common Fields
//If we have a value that is a union type, 
//we can only access members that are common to all types in the union.
interface Bird {
    fly(): void;
    layEggs(): void;
  }
  
  interface Fish {
    swim(): void;
    layEggs(): void;
  }
  
  declare function getSmallPet(): Fish | Bird;
  
  let pet = getSmallPet();
  pet.layEggs();
  
  // Only available in one of the two possible types
  //pet.swim();
//  Property 'swim' does not exist on type 'Bird | Fish'.
 //   Property 'swim' does not exist on type 'Bird'.


 // DISCRIMINATING UNIONS
 //A common technique for working with unions is to have a 
 //single field which uses literal types which you can use 
 //to let TypeScript narrow down the possible current type.

 type NetworkLoadingState = {
    state: "loading";
  };
  
  type NetworkFailedState = {
    state: "failed";
    code: number;
  };
  
  type NetworkSuccessState = {
    state: "success";
    response: {
      title: string;
      duration: number;
      summary: string;
    };
  };
  
  type NetworkFromCachedState = {
    state: "from_cache";
    id: string;
    response: NetworkSuccessState["response"];
  };

  // Create a type which represents only one of the above types
  // but you aren't sure which it is yet.
  type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;

/**
 * All of the above types have a field named state, and 
 * then they also have their own fields:

NetworkLoadingState	NetworkFailedState	NetworkSuccessState
state	            state	            state
code	            response
Given the state field is common in every type inside 
NetworkState - it is safe for your code to access without 
an existence check.

With state as a literal type, you can compare the value of 
state to the equivalent string and TypeScript will know 
which type is currently being used.

NetworkLoadingState	NetworkFailedState	NetworkSuccessState
"loading"	        "failed"	        "success"
In this case, you can use a switch statement to narrow down 
which type is represented at runtime:
 */
function logger(state: NetworkState): string {
    // Right now TypeScript does not know which of the three
    // potential types state could be.
  
    // Trying to access a property which isn't shared
    // across all types will raise an error
    //state.code;
//   Property 'code' does not exist on type 'NetworkState'.
//     Property 'code' does not exist on type 'NetworkLoadingState'.
  
    // By switching on state, TypeScript can narrow the union
    // down in code flow analysis
    switch (state.state) {
      case "loading":
        return "Downloading...";
      case "failed":
        // The type must be NetworkFailedState here,
        // so accessing the `code` field is safe
        return `Error ${state.code} downloading`;
      case "success":
        return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
  }


// Intersection Types
/**
 * Intersection types are closely related to union types, 
 * but they are used very differently. 
 * An intersection type combines multiple types into one.
 *
 * For example, Person & Serializable & Loggable is a type 
 * which is all of Person and Serializable and Loggable. 
 * That means an object of this type will have all members 
 * of all three types
 */
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
  }
  
  interface ArtworksData {
    artworks: { title: string }[];
  }
  
  interface ArtistsData {
    artists: { name: string }[];
  }
  
  // These interfaces are composed to have
  // consistent error handling, and their own data.
  
  type ArtworksResponse = ArtworksData & ErrorHandling;
  type ArtistsResponse = ArtistsData & ErrorHandling;
  
  const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.error) {
      console.error(response.error.message);
      return;
    }
  
    console.log(response.artists);
  };