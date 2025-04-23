let teamOfPlayers;

function setup() {
    createCanvas(400, 400);
    // Ask for number of players and create team
    let numPlayers = prompt("How many players are on the team?");
    teamOfPlayers = new Team(parseInt(numPlayers));
    
    // Display initial menu
    displayMenu();
}

function displayMenu() {
    let menu = "Main Menu:\n" +
               "1 - Add a Player\n" +
               "2 - Add player ratings\n" +
               "3 - Add a player to the squad\n" +
               "4 - Remove a player from the squad\n" +
               "5 - List all players\n" +
               "6 - List all players currently on the squad\n" +
               "7 - List players whose average rating is greater than a given average\n" +
               "8 - List the players names with their average ratings\n" +
               "9 - Display average player rating\n" +
               "10 - Display player with the lowest average rating\n" +
               "11 - Display player with the highest average rating\n" +
               "0 - Exit";
    
    console.log(menu);
}

function handleMenuSelection(choice) {
    switch(choice) {
        case "1":
            addPlayer();
            break;
        case "2":
            addPlayerRatings();
            break;
        case "3":
            addToSquad();
            break;
        case "4":
            removeFromSquad();
            break;
        case "5":
            listAllPlayers();
            break;
        case "6":
            listCurrentSquad();
            break;
        case "7":
            listAboveAverage();
            break;
        case "8":
            listWithAverages();
            break;
        case "9":
            displayAverageRating();
            break;
        case "10":
            displayLowestRating();
            break;
        case "11":
            displayHighestRating();
            break;
        case "0":
            exit();
            break;
        default:
            console.log("Invalid choice. Please try again.");
    }
}

function addPlayer() {
    let name = prompt("Enter player name:");
    let playerNumber = parseInt(prompt("Enter player number (1-23):"));
    let currentSquadMember = confirm("Is this player in the current squad?");
    
    let player = new Player(name, currentSquadMember, playerNumber);
    teamOfPlayers.addPlayer(player);
    console.log("Player added successfully.");
}

function addPlayerRatings() {
    console.log(teamOfPlayers.listPlayers());
    let index = parseInt(prompt("Enter player index to add ratings:"));
    let ratings = [];
    for (let i = 0; i < 5; i++) {
        let rating = parseInt(prompt(`Enter rating ${i+1} (0-5):`));
        ratings.push(rating);
    }
    teamOfPlayers.players[index].ratings = ratings;
    console.log("Ratings added successfully.");
}

function addToSquad() {
    console.log(teamOfPlayers.listPlayers());
    let index = parseInt(prompt("Enter player index to add to squad:"));
    teamOfPlayers.players[index].currentSquadMember = true;
    console.log("Player added to squad.");
}

function removeFromSquad() {
    console.log(teamOfPlayers.listPlayers());
    let index = parseInt(prompt("Enter player index to remove from squad:"));
    let player = teamOfPlayers.deRegisterPlayer(index);
    if (player) {
        console.log("Player removed from squad.");
    } else {
        console.log("Player not found or already not in squad.");
    }
}

function listAllPlayers() {
    console.log(teamOfPlayers.listPlayers());
}

function listCurrentSquad() {
    console.log(teamOfPlayers.listCurrentPlayers());
}

function listAboveAverage() {
    let rating = parseFloat(prompt("Enter minimum average rating:"));
    console.log(teamOfPlayers.listPlayersAboveGivenAverageRating(rating));
}

function listWithAverages() {
    console.log(teamOfPlayers.listOfPlayerWithAverageRating());
}

function displayAverageRating() {
    console.log("Average player rating: " + teamOfPlayers.averageOfPlayersAvgRating());
}

function displayLowestRating() {
    let player = teamOfPlayers.playerWithLowestAverageRating();
    if (player) {
        console.log("Player with lowest average rating:\n" + player.toString());
    } else {
        console.log("No players in the team.");
    }
}

function displayHighestRating() {
    let player = teamOfPlayers.playerWithHighestAverageRating();
    if (player) {
        console.log("Player with highest average rating:\n" + player.toString());
    } else {
        console.log("No players in the team.");
    }
}

function exit() {
    console.log("Exiting application...");
    noLoop();
}

function draw() {
    background(220);
    // Display current menu and handle input
    if (frameCount % 60 === 0) { // Update every second
        displayMenu();
        let choice = prompt("Enter your choice (0-11):");
        handleMenuSelection(choice);
    }
}
