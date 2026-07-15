function showPlayerList() {
    let tableBody = document.getElementById("table-body")
    tableBody.innerHTML = "";

    for (let i = 0; i < players.length; i++){
        let tableBodyRow = document.createElement("tr")
        tableBody.appendChild(tableBodyRow)
    
        let addedTableHeadNumber = document.createElement("th")
        addedTableHeadNumber.scope = "row"
        addedTableHeadNumber.textContent = i + 1
        tableBodyRow.appendChild(addedTableHeadNumber)
    
        let addedTableNameData = document.createElement("td")
        addedTableNameData.textContent = players[i].name
        tableBodyRow.appendChild(addedTableNameData)
    
        let addedTableDataRemoveBtn = document.createElement("td")
        tableBodyRow.appendChild(addedTableDataRemoveBtn)
    
        let removeBtn = document.createElement("button")
        addedTableDataRemoveBtn.appendChild(removeBtn)
        removeBtn.textContent = "×";
        removeBtn.type = "button"
        removeBtn.classList.add( "btn", "btn-outline-danger","btn-sm")
        removeBtn.addEventListener("click", function () {
            players.splice(i, 1);
            localStorage.setItem("storingPlayers", JSON.stringify(players))
            showPlayerList();
        });
    }
}

function showModal(title, message, buttonText) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-message").textContent = message;
    document.getElementById("modal-button").textContent = buttonText;

    let modalElement = document.getElementById("appModal");
    let modal = new bootstrap.Modal(modalElement);

    modal.show();
}

function generateMatches() {
    let totalRounds = Number(document.getElementById("match-count").value);
    let matchesTableBody = document.getElementById("matches-table-body")
    matchesTableBody.innerHTML = "";

    for (let i = 0; i < totalRounds; i++){
        let shuffledPlayers = [...players];
        for (let j = shuffledPlayers.length - 1; j > 0; j--) {
            let randomIndex = Math.floor(Math.random() * (j + 1))
            let temp = shuffledPlayers[j];
            shuffledPlayers[j] = shuffledPlayers[randomIndex];
            shuffledPlayers[randomIndex] = temp;
        }

        let playingPlayers = shuffledPlayers.slice(0, 4);
        let teamA = playingPlayers.slice(0, 2);
        let teamB = playingPlayers.slice(2, 4);
        let restingPlayers = shuffledPlayers.slice(4)

        let restingNames = restingPlayers
        .map(function(player) {
            return player.name;
        })
        .join(", ");

        let roundBodyRow = document.createElement("tr")
        matchesTableBody.appendChild(roundBodyRow)

        let roundData = document.createElement("th")
        roundData.scope = "row";
        roundData.textContent = i + 1
        roundBodyRow.appendChild(roundData)

        let teamAData = document.createElement("td")
        teamAData.textContent = teamA[0].name + " & " + teamA[1].name;
        roundBodyRow.appendChild(teamAData)
    
        let teamBData = document.createElement("td")
        teamBData.textContent = teamB[0].name + " & " + teamB[1].name;
        roundBodyRow.appendChild(teamBData)

        let teamRestingData = document.createElement("td")
        teamRestingData.textContent = restingNames;
        roundBodyRow.appendChild(teamRestingData)
    }
}

function generateMatchesBTN (){
    let numberOfMatches = Number(document.getElementById("match-count").value);
        if (players.length < 4){
            showModal("Coach's Advice",
                "You can't play 2v2 with imaginary friends. Add at least 4 players.",
                "Got it")
                return;
        }

        if (numberOfMatches <= 0) {
            showModal("Coach's Advice",
                "Generating... absolutely nothing. Enter the number of rounds.",
            "Got it");;
            return;
        }
    generateMatches();
        document.getElementById("match-count").value = "";
        document.getElementById("generated-matches").scrollIntoView({
            behavior: "smooth"
    });
}

document.getElementById("generate-matches-btn").addEventListener("click", generateMatchesBTN);
document.getElementById("match-count").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateMatchesBTN();
    }
});

let players = JSON.parse(localStorage.getItem("storingPlayers")) || [];
showPlayerList()

function addPlayer (){
    let playerName = document.getElementById("player-name").value;
    if (!playerName || playerName.length > 256) {
        showModal( "Coach's Advice",
            "That name didn't pass the vibe check.",
            "Got it");
        return;
    }
    let player = {
    name: playerName,
    matchesPlayed : 0,
    teammates: [],
    opponents: []
}
    players.push(player)
    localStorage.setItem("storingPlayers", JSON.stringify(players))
    document.getElementById("player-name").value = "";
    showPlayerList()
};

document.getElementById("add-player-btn").addEventListener("click", addPlayer)

document.getElementById("player-name").addEventListener("keydown", function (event){
    if (event.key === "Enter"){
        addPlayer();
    }
})
    
document.getElementById("clear-all-players").addEventListener("click", function () {
        players = [];
        localStorage.setItem("storingPlayers", JSON.stringify(players))
        showPlayerList();
        let generatedRounds = document.getElementById("matches-table-body")
        generatedRounds.textContent = "";
    });