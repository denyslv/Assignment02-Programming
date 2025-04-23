class Player {
  #name;
  #playerNumber;
  #ratings = [];
  #currentSquadMember;

  constructor(name = "", currentSquadMember = false, playerNumber = 23) {
    // Set name with 20 character limit
    if (name.length > 20) {
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
    
    // Validate and set ratings
    //used https://www.w3schools.com/jsref/jsref_map.asp Ma method
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
     var txt = this.name + " " +
         this.playerNumber + " " +
         this.ratings + " " +
         this.currentSquadMember;
    return txt;
  }
}
