let teamOfPlayers;

function createTeam() {
    let numPlayers = parseInt(document.getElementById('numPlayers').value);
    
    if (numPlayers < 0 || numPlayers > 40) {
        document.getElementById('showInfo').innerHTML = "Number of players must be between 0 and 40.";
        return;
    }
    
    teamOfPlayers = new Team(numPlayers);
    
    // Hide prompt menu and show main menu
    document.getElementById('promptMenu').classList.add('hidden');
    document.getElementById('mainMenu').classList.remove('hidden');
}

function mainMenuSelection() {
    // Hide all menus first
    document.getElementById('addPlayerMenu').classList.add('hidden');
    document.getElementById('addRatingsMenu').classList.add('hidden');
    document.getElementById('allPlayersRatings').classList.add('hidden');
    
    // Get selected option
    let choice = document.querySelector('input[name="mainChoices"]:checked').value;
    
    switch(choice) {
        case "addPlayer":
            document.getElementById('addPlayerMenu').classList.remove('hidden');
            break;
        case "addRatings":
            document.getElementById('addRatingsMenu').classList.remove('hidden');
            document.getElementById('allPlayersRatings').classList.remove('hidden');
            updatePlayerDropdown();
            updatePlayersList();
            break;
        case "addToSquad":
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listPlayers();
            let index = prompt("Enter player index to add to squad:");
            teamOfPlayers.players[index].currentSquadMember = true;
            document.getElementById('showInfo').innerHTML = "Player added to squad.";
            break;
        case "removeFromSquad":
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listPlayers();
            let removeIndex = prompt("Enter player index to remove from squad:");
            let player = teamOfPlayers.deRegisterPlayer(removeIndex);
            if (player) {
                document.getElementById('showInfo').innerHTML = "Player removed from squad.";
            } else {
                document.getElementById('showInfo').innerHTML = "Player not found or already not in squad.";
            }
            break;
        case "listPlayers":
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listPlayers();
            break;
        case "listCurrentSquad":
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listCurrentPlayers();
            break;
        case "listAboveAverage":
            let rating = prompt("Enter minimum average rating:");
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listPlayersAboveGivenAverageRating(parseFloat(rating));
            break;
        case "listWithAverages":
            document.getElementById('showInfo').innerHTML = teamOfPlayers.listOfPlayerWithAverageRating();
            break;
        case "displayAverage":
            document.getElementById('showInfo').innerHTML = "Average player rating: " + teamOfPlayers.averageOfPlayersAvgRating();
            break;
        case "displayLowest":
            let lowestPlayer = teamOfPlayers.playerWithLowestAverageRating();
            if (lowestPlayer) {
                document.getElementById('showInfo').innerHTML = "Player with lowest average rating:\n" + lowestPlayer.toString();
            } else {
                document.getElementById('showInfo').innerHTML = "No players in the team.";
            }
            break;
        case "displayHighest":
            let highestPlayer = teamOfPlayers.playerWithHighestAverageRating();
            if (highestPlayer) {
                document.getElementById('showInfo').innerHTML = "Player with highest average rating:\n" + highestPlayer.toString();
            } else {
                document.getElementById('showInfo').innerHTML = "No players in the team.";
            }
            break;
    }
}

function addPlayer() {
    let name = document.getElementById('name').value;
    let playerNumber = parseInt(document.getElementById('playerNumber').value);
    let currentSquadMember = document.getElementById('yes').checked;
    
    let player = new Player(name, currentSquadMember, playerNumber);
    teamOfPlayers.addPlayer(player);
    
    // Clear form and show success message
    document.getElementById('name').value = '';
    document.getElementById('playerNumber').value = '';
    document.getElementById('yes').checked = false;
    document.getElementById('no').checked = false;
    
    document.getElementById('addPlayerMenu').classList.add('hidden');
    document.getElementById('showInfo').innerHTML = "Player added successfully.";
}

function addPlayerRatings() {
    const playerIndex = document.getElementById('playerSelect').value;
    const ratings = [
        parseInt(document.getElementById('rating1').value),
        parseInt(document.getElementById('rating2').value),
        parseInt(document.getElementById('rating3').value),
        parseInt(document.getElementById('rating4').value),
        parseInt(document.getElementById('rating5').value)
    ];
    
    teamOfPlayers.players[playerIndex].ratings = ratings;
    
    // Clear form
    document.getElementById('rating1').value = '';
    document.getElementById('rating2').value = '';
    document.getElementById('rating3').value = '';
    document.getElementById('rating4').value = '';
    document.getElementById('rating5').value = '';
    
    // Update the display
    updatePlayersList();
    document.getElementById('showInfo').innerHTML = "Ratings added successfully.";
}

function updatePlayerDropdown() {
    const select = document.getElementById('playerSelect');
    select.innerHTML = ''; // Clear existing options
    
    //if no players available
    if (teamOfPlayers.players.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'No players available';
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
        return;
    }
    
    for (let i = 0; i < teamOfPlayers.players.length; i++) {
        const player = teamOfPlayers.players[i];
        const option = document.createElement('option');
        option.value = i;
        option.textContent = player.name + ' (' + player.playerNumber + ')';
        select.appendChild(option);
    }
}

function updatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    
    for (let i = 0; i < teamOfPlayers.players.length; i++) {
        const player = teamOfPlayers.players[i];
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-item';
        
        let ratingsText = 'No ratings yet';
        if (player.ratings && player.ratings.length > 0) {
            ratingsText = 'Ratings: ' + player.ratings.join(', ');
        }
        
        playerDiv.innerHTML = 
            '<strong>' + player.name + '</strong> (' + player.playerNumber + ')<br>' +
            ratingsText + '<br>' +
            'Average Rating: ' + player.averageRating() + '<br>' +
            'Current Squad: ' + (player.currentSquadMember ? 'Yes' : 'No') + '<br>' +
            '<hr>';
        
        playersList.appendChild(playerDiv);
    }
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
