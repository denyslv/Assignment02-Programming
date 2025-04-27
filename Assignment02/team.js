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
            // Check if player number already exists
            for (let i = 0; i < this.#players.length; i++) {
                if (this.#players[i].playerNumber === player.playerNumber) {
                    return false; // Return false if player number exists
                }
            }
            this.#players.push(player);
            this.#total++;
            return true; // Return true if player was added successfully
        }
        return false; // Return false if player is invalid
    }

    listPlayers() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //add details of each player to the result string
            result += this.#players[i].toString() + "\n";
        }
        return { message: result, isError: false };
    }

    listCurrentPlayers() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //if player is current squad member, add to result
            if (this.#players[i].currentSquadMember) {
                result += this.#players[i].toString() + "\n";
            }
        }
        if (result === "") {
            return { message: "No players in the current squad", isError: true };
        }
        return { message: result, isError: false };
    }

    listOfPlayerWithAverageRating() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
        }
        let result = "";
        for (let i = 0; i < this.#players.length; i++) {
            //calculate average rating for current player
            const avg = this.calculateAverageRating(this.#players[i].ratings);
            //add player name and rounded average to result
            result += this.#players[i].name + ": " + Math.round(avg) + "\n";
        }
        return { message: result, isError: false };
    }

    listPlayersAboveGivenAverageRating(rating) {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
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
        if (result === "") {
            return { message: "No players found with average rating above " + rating, isError: true };
        }
        return { message: result, isError: false };
    }

    playerWithLowestAverageRating() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
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
        return { message: lowest.toString(), isError: false };
    }

    playerWithHighestAverageRating() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
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
        return { message: highest.toString(), isError: false };
    }

    averageOfPlayersAvgRating() {
        if (this.isEmpty()) {
            return { message: "No players in the team", isError: true };
        }
        let sum = 0;
        //add up all players' average ratings
        for (let i = 0; i < this.#players.length; i++) {
            sum += this.calculateAverageRating(this.#players[i].ratings);
        }
        return { message: (sum / this.#total).toString(), isError: false };
    }

    deRegisterPlayer(playerNumber) {
        const player = this.findPlayerByNumber(playerNumber);
        if (!player || !player.currentSquadMember) {
            return null;
        }
        player.currentSquadMember = false;
        return player;
    }

    findPlayerByNumber(playerNumber) {
        for (let i = 0; i < this.#players.length; i++) {
            if (this.#players[i].playerNumber === playerNumber) {
                return this.#players[i];
            }
        }
        return null;
    }

    removePlayer(playerNumber) {
        const player = this.findPlayerByNumber(playerNumber);
        if (!player) {
            return { message: "Player not found.", isError: true };
        }
        
        // Remove player from array
        for (let i = 0; i < this.#players.length; i++) {
            if (this.#players[i].playerNumber === playerNumber) {
                this.#players.splice(i, 1);
                this.#total--;
                return { message: "Player removed successfully.", isError: false };
            }
        }
        return { message: "Error removing player.", isError: true };
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