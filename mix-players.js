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
            showPlayerList();
        });
    }
}

function generateMatches() {
    let totalRounds = Number(document.getElementById("match-count").value);
    let matchesTableBody = document.getElementById("matches-table-body")
    matchesTableBody.innerHTML = "";

    for (let i = 0; i < totalRounds; i++){
        let roundBodyRow = document.createElement("tr")
        matchesTableBody.appendChild(roundBodyRow)

        let roundData = document.createElement("th")
        roundData.scope = "row";
        roundData.textContent = i + 1
        roundBodyRow.appendChild(roundData)

        let teamAData = document.createElement("td")
        teamAData.textContent = "";
        roundBodyRow.appendChild(teamAData)
    
        let teamBData = document.createElement("td")
        teamBData.textContent = "";
        roundBodyRow.appendChild(teamBData)

        let teamRestingData = document.createElement("td")
        teamRestingData.textContent = "";
        roundBodyRow.appendChild(teamRestingData)
    }

}

function generateMatchesBTN (){
    let numberOfMatches = Number(document.getElementById("match-count").value);
    if (players.length < 4){
        alert("Please add at least 4 players to generate match rounds!")
        return;
    }

    if (numberOfMatches <= 0) {
        alert("Please enter a valid number of matches.");
        return;
    }
    generateMatches();
}
document.getElementById("generate-matches-btn").addEventListener("click", generateMatchesBTN);

let players = [];
let matchCount = []

function addPlayer (){
    let playerName = document.getElementById("player-name").value;
    if (!playerName || playerName.length > 256) {
        alert("Please enter a valid name within 256 characters!")
        return;
    }
    let player = {
    name: playerName,
    matchesPlayed : 0,
    teammates: [],
    opponents: []
}
    players.push(player)
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
        showPlayerList();
    });