let teamOfPlayers;

// Initialize team with test data
function initializeTestData() {
    const names = [
        "John Smith", "Emma Johnson", "Michael Brown", "Sarah Davis", "David Wilson",
        "Lisa Anderson", "James Taylor", "Jennifer Martinez", "Robert Thomas", "Patricia Garcia"
    ];
    
    const ratings = [
        [1, 2, 3, 4, 5],
        [0, 0, 0, 0, 0],
        [3, 4, 4, 3, 5],
        [0, 1, 2, 1, 0],
        [3, 4, 5, 3, 4],
        [3, 3, 3, 3, 3],
        [4, 4, 3, 4, 5],
        [3, 5, 4, 3, 4],
        [4, 4, 4, 4, 4],
        [5, 5, 5, 5, 5]
    ];
    
    for (let i = 0; i < names.length; i++) {
        //Math.random() randomly picks if the player is a current squad member
        const player = new Player(names[i], Math.random() > 0.5, i + 1);
        player.ratings = ratings[i];
        teamOfPlayers.addPlayer(player);
    }
    
    updateShowInfo("Test data initialized with 10 players.");
}

// Initialize team when page loads
window.onload = function() {
    teamOfPlayers = new Team(0); // Create an empty team
    initializeTestData(); // Add test data
};

// function to update the showInfo div, if isError is true, add the error-message class
function updateShowInfo(content, isError = false) {
    const showInfo = document.getElementById('showInfo');
    showInfo.innerHTML = content;
    //if content isn't empty, display showInfo
    showInfo.style.display = content ? 'block' : 'none';
    // Add or remove error class based on isError parameter
    if (isError) {
        showInfo.classList.add('error-message');
    } else {
        showInfo.classList.remove('error-message');
    }
}

function createTeam() {
    let numPlayers = parseInt(document.getElementById('numPlayers').value);
    
    if (numPlayers < 0 || numPlayers > 40) {
        updateShowInfo("Number of players must be between 0 and 40.");
        return;
    }
    
    teamOfPlayers = new Team(numPlayers);
    
    // Hide prompt menu and show main menu
    document.getElementById('promptMenu').classList.add('hidden');
    document.getElementById('mainMenu').classList.remove('hidden');
    updateShowInfo(''); // Clear any previous messages
}


function addPlayer() {
    let name = document.getElementById('name').value;
    let playerNumber = parseInt(document.getElementById('playerNumber').value);
    let currentSquadMember = document.getElementById('yes').checked;
    
    let player = new Player(name, currentSquadMember, playerNumber);
    if (teamOfPlayers.addPlayer(player)) {
        // Clear form and show success message
        document.getElementById('name').value = '';
        document.getElementById('playerNumber').value = '';
        document.getElementById('yes').checked = false;
        document.getElementById('no').checked = false;
        
        document.getElementById('addPlayerMenu').classList.add('hidden');
        updateShowInfo("Player added successfully.");
    } else {
        updateShowInfo("Error: Player number already exists or invalid player data.", true);
    }
}

function addPlayerRatings() {
    const playerIndex = document.getElementById('playerSelect').value;
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    // Validate all inputs before proceeding
    let isValid = true;
    const ratings = [];
    
    ratingInputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
            return;
        }
        ratings.push(parseInt(input.value));
    });
    
    if (!isValid) {
        updateShowInfo("Please ensure all ratings are between 0 and 5.", true);
        return;
    }
    
    teamOfPlayers.players[playerIndex].ratings = ratings;
    
    // Clear form
    ratingInputs.forEach(input => input.value = '');
    
    // Update the display
    updatePlayersList();
    updateShowInfo("Ratings added successfully.");
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

function handleMenuButton(choice) {
    // Hide all menus first
    document.getElementById('addPlayerMenu').classList.add('hidden');
    document.getElementById('addRatingsMenu').classList.add('hidden');
    document.getElementById('allPlayersRatings').classList.add('hidden');
    
    switch(choice) {
        case "addPlayer":
            document.getElementById('addPlayerMenu').classList.remove('hidden');
            document.getElementById('name').focus();
            updateShowInfo('');
            break;
        case "removePlayer":
            const listResult = teamOfPlayers.listPlayers();
            updateShowInfo(listResult.message, listResult.isError);
            let playerNumber = parseInt(prompt("Enter player number to remove:"));
            const result = teamOfPlayers.removePlayer(playerNumber);
            updateShowInfo(result.message, result.isError);
            break;
        case "addRatings":
            document.getElementById('addRatingsMenu').classList.remove('hidden');
            document.getElementById('allPlayersRatings').classList.remove('hidden');
            updatePlayerDropdown();
            updatePlayersList();
            setupRatingInputs();
            document.getElementById('playerSelect').focus();
            updateShowInfo('');
            break;
        case "addToSquad":
            const listResult2 = teamOfPlayers.listPlayers();
            updateShowInfo(listResult2.message, listResult2.isError);
            let playerNumber2 = parseInt(prompt("Enter player number to add to squad:"));
            const player2 = teamOfPlayers.findPlayerByNumber(playerNumber2);
            if (player2) {
                player2.currentSquadMember = true;
                updateShowInfo("Player added to squad.");
            } else {
                updateShowInfo("Player not found.", true);
            }
            break;
        case "removeFromSquad":
            const listResult3 = teamOfPlayers.listPlayers();
            updateShowInfo(listResult3.message, listResult3.isError);
            let removeNumber = parseInt(prompt("Enter player number to remove from squad:"));
            let removedPlayer = teamOfPlayers.deRegisterPlayer(removeNumber);
            if (removedPlayer) {
                updateShowInfo("Player removed from squad.");
            } else {
                updateShowInfo("Player not found or already not in squad.", true);
            }
            break;
        case "listPlayers":
            const listResult4 = teamOfPlayers.listPlayers();
            updateShowInfo(listResult4.message, listResult4.isError);
            break;
        case "listCurrentSquad":
            const listResult5 = teamOfPlayers.listCurrentPlayers();
            updateShowInfo(listResult5.message, listResult5.isError);
            break;
        case "listAboveAverage":
            let rating = prompt("Enter minimum average rating:");
            const listResult6 = teamOfPlayers.listPlayersAboveGivenAverageRating(parseFloat(rating));
            updateShowInfo(listResult6.message, listResult6.isError);
            break;
        case "listWithAverages":
            const listResult7 = teamOfPlayers.listOfPlayerWithAverageRating();
            updateShowInfo(listResult7.message, listResult7.isError);
            break;
        case "displayAverage":
            const avgResult = teamOfPlayers.averageOfPlayersAvgRating();
            updateShowInfo("Average player rating: " + avgResult.message, avgResult.isError);
            break;
        case "displayLowest":
            const lowestResult = teamOfPlayers.playerWithLowestAverageRating();
            updateShowInfo("Player with lowest average rating:\n" + lowestResult.message, lowestResult.isError);
            break;
        case "displayHighest":
            const highestResult = teamOfPlayers.playerWithHighestAverageRating();
            updateShowInfo("Player with highest average rating:\n" + highestResult.message, highestResult.isError);
            break;
    }
}

function setupRatingInputs() {
    // Get all rating inputs
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    ratingInputs.forEach(input => {
        // Handle keyboard input
        input.addEventListener('keypress', function(e) {
            // Allow only numbers 0-5
            if (e.key < '0' || e.key > '5') {
                e.preventDefault();
            }
        });
        
        // Handle paste events
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (/^[0-5]$/.test(pastedText)) {
                this.value = pastedText;
            }
        });
        
        // Validate input when value changes
        input.addEventListener('input', function() {
            // Remove any non-numeric characters
            this.value = this.value.replace(/[^0-5]/g, '');
            
            // Ensure only one digit
            if (this.value.length > 1) {
                this.value = this.value.slice(0, 1);
            }
            
            // Validate range
            const num = parseInt(this.value);
            if (num < 0 || num > 5 || isNaN(num)) {
                this.setCustomValidity('Rating must be between 0 and 5');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}
