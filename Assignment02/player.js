class Player {
  #name;
  #playerNumber;
  #ratings = [];
  #currentSquadMember;

  constructor(name = "", currentSquadMember = false, playerNumber = 23) {
    if (name.length > 20) {
      //using substring to limit the name to 20 characters
      this.#name = name.substring(0, 20);
    } else {
      this.#name = name;
    }

    // Set player number (1-23)
    if (Number.isInteger(playerNumber) && playerNumber >= 1 && playerNumber <= 23) {
      this.#playerNumber = playerNumber;
    } else {
      this.#playerNumber = 23; // Default value
    }

    // Initialize ratings array with 5 zeros
    this.#ratings = new Array(5).fill(0);

    // Set squad membership status
    this.#currentSquadMember = Boolean(currentSquadMember);
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if (name.length <= 20) {
      this.#name = name;
    }
  }

  get playerNumber() {
    return this.#playerNumber;
  }

  // set player number in the range 1-23
  set playerNumber(number) {
    if (!Number.isInteger(number) || number < 1 || number > 23) {
      console.log('Player number must be an integer between 1 and 23');
    } else {
      this.#playerNumber = number;
    }
  }

  get ratings() {
    return this.#ratings;
  }

  set ratings(ratings) {
    // Validate ratings array is of size 5
    if (!Array.isArray(ratings) || ratings.length !== 5) {
      this.#ratings = new Array(5).fill(0);
      return;
    }
    
    // Check if ratings are in the range 0-5 and set to 0 if not
    //used https://www.w3schools.com/jsref/jsref_map.asp Map method
    //The Array.map() method creates a new array from the results of calling a function for every element.
    this.#ratings = ratings.map(function(rating) {
      const num = Number(rating);
      //if true return num, if false return 0
      return (Number.isInteger(num) && num >= 0 && num <= 5) ? num : 0;
    });
    }


  get currentSquadMember() {
    return this.#currentSquadMember;
  }

  set currentSquadMember(csm) {
    //comvert csm to boolean
    this.#currentSquadMember = Boolean(csm);
  }

  toString() {
    return "[" + this.playerNumber + "] " + this.name + " | Ratings: " + this.ratings.join(" : ") + " | " + (this.currentSquadMember ? "Is" : "Isn't") + " a current squad member" + "\n";
  }
}
