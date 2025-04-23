class Player {
  #name;
  #playerNumber;
  #ratings[];
  #currentSquadMember;


  constructor(name, currentSquadMember, playerNumber) {
    this.name = name;
    this.currentSquadMember = currentSquadMember;
    this.playerNumber = playerNumber;
    this.#ratings = [];
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    if (name.length > 20) {
      this.#name = name.substring(0, 20);
    } else {
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
