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
    this.#name = name;
  }

  get playerNumber() {
    return this.#playerNumber;
  }

  set playerNumber(number) {
    this.#playerNumber = number;
  }

  get ratings() {
    return this.#ratings;
  }

  set ratings(ratings) {
    this.#ratings = ratings;
  }


  get currentSquadMember() {
    return this.#currentSquadMember;
  }

  set currentSquadMember(csm) {
    this.#currentSquadMember = csm;
  }

  toString() {
     var txt = this.name + " " +
         this.playerNumber + " " +
         this.ratings + " " +
         this.currentSquadMember;
    return txt;
  }
}
