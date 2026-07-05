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
        removeBtn.classList.add("btn-close")
        removeBtn.type = "button"
        removeBtn.ariaLabel = "Close"
        removeBtn.addEventListener("click", function () {
            players.splice(i, 1);
            showPlayerList();
        });
    }
}

let players = [];

function addPlayer (){
    let playerName = document.getElementById("player-name").value;
    if (!playerName || playerName.length > 256) {
        alert("Please enter a valid name within 256 characters!")
        return;
    }
    let player = {
    name: playerName 
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