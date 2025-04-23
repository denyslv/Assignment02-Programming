//Team class
class Team {
    #players = [];
    #total = 0;

    constructor(total = 0, players = []) {
        this.total = total;
        this.players = players;
    }

    get players() {
        return this.#players;
    }

    set players(players) {
        if (Array.isArray(players)) {
            this.#players = players;
            this.total = players.length;
        }
    }

    get total() {
        return this.#total;
    }

    set total(total) {
        if (Number.isInteger(total) && total >= 0) {
            this.#total = total;
        }
    }

    addPlayer(player) {
        //if player is valid object
        if (player) {
            this.#players.push(player);
            this.#total++;
        }
    }

    listPlayers() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //add details of each player to the result string
            result += this.#players[i].toString() + "\n";
        }
        return result;
    }

    listCurrentPlayers() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //if player is current squad member, add to result
            if (this.#players[i].currentSquadMember) {
                result += this.#players[i].toString() + "\n";
            }
        }
        return result;
    }

    listOfPlayerWithAverageRating() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //calculate average rating for current player
            const avg = this.calculateAverageRating(this.#players[i].ratings);
            //add player name and rounded average to result
            result += this.#players[i].name + ": " + Math.round(avg) + "\n";
        }
        return result;
    }

    listPlayersAboveGivenAverageRating(rating) {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let result = "";
        //check each player
        for (let i = 0; i < this.#players.length; i++) {
            //calculate average for current player
            const avg = this.calculateAverageRating(this.#players[i].ratings);
            //if average is above given rating, add player to result
            if (avg > rating) {
                result += this.#players[i].toString() + "\n";
            }
        }
        return result;
    }

    playerWithLowestAverageRating() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let lowest = this.#players[0];
        for (let i = 1; i < this.#players.length; i++) {
            //calculate average
            const currentAvg = this.calculateAverageRating(this.#players[i].ratings);
            const lowestAvg = this.calculateAverageRating(lowest.ratings);
            //if current player has lower average rating, update lowest
            if (currentAvg < lowestAvg) {
                lowest = this.#players[i];
            }
        }
        return lowest;
    }

    playerWithHighestAverageRating() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let highest = this.#players[0];
        for (let i = 1; i < this.#players.length; i++) {
            //calculate average
            const currentAvg = this.calculateAverageRating(this.#players[i].ratings);
            const highestAvg = this.calculateAverageRating(highest.ratings);
            //if current player has higher average rating, update highest
            if (currentAvg > highestAvg) {
                highest = this.#players[i];
            }
        }
        return highest;
    }

    averageOfPlayersAvgRating() {
        if (this.isEmpty()) {
            return "No players in the team";
        }
        let sum = 0;
        //add up all players' average ratings
        for (let i = 0; i < this.#players.length; i++) {
            sum += this.calculateAverageRating(this.#players[i].ratings);
        }
        return sum / this.#total;
    }

    deRegisterPlayer(indexToDeRegister) {
        if (indexToDeRegister < 0 || indexToDeRegister >= this.#total) {
            return null;
        }
        const player = this.#players[indexToDeRegister];
        if (!player.currentSquadMember) {
            return null;
        }
        player.currentSquadMember = false;
        return player;
    }

    //check if team is empty
    isEmpty() {
        return this.#total === 0;
    }

    // method to calculate average rating
    calculateAverageRating(ratings) {
        //if array is empty return 0
        if (!ratings || ratings.length === 0) {
            return 0;
        }
        let sum = 0;
        //add up all ratings
        for (let i = 0; i < ratings.length; i++) {
            sum += ratings[i];
        }
        //return average
        return sum / ratings.length;
    }
}