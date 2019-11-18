let switchNewShow = document.getElementById("switchNewShow");
let playercount = 2;
switchNewShow.addEventListener("click", () => switchDiv());
function switchDiv() {
    var x = document.getElementById("newGame");
    var y = document.getElementById("nextGames");
    if (x.style.display === "none") {
        switchNewShow.innerText="Show Next Games";
      x.style.display = "block";
      y.style.display = "none";
    } else {
        switchNewShow.innerText="Create New Game";
      x.style.display = "none";
      y.style.display = "block";
    }
  }
document.getElementById("gameType").addEventListener("change", OnChangeCheck());

function OnChangeCheck(){
    console.log(document.getElementById("gameType").value);
    if(document.getElementById("gameType").value == "Killer"){
        document.getElementById("morePlayer").style.display = "block";
    }
    else{
        document.getElementById("morePlayer").style.display = "none";
    }
}


var t =$('#gameTable').DataTable();
function printallMatches(json)
{
    console.log(json);
    for(let j of json){
        let id = j.matchID;
        let first_Player =j.poolplayers[0].playerName;
        let second_Player = j.poolplayers[1].playerName;
        let matchType = j.matchType;
        let isPlayed = false;
        t.row.add( [
            id,
            first_Player,
            second_Player,
            matchType,
            'Played: + <input type="checkbox" onclick="Played()"></input>'
        ]).draw( false );
    }
}
let addRow = document.getElementById("addRow");
addRow.addEventListener("click", () => AddingMatch());
function AddingMatch() {
    playerArray= []
    fetch('http://localhost:8080/match/create', {
        method: 'POST',
        body: JSON.stringify({ 
            match: {matchType: something.value}, players:[playerArray] }),
            //headers: { "Accept": "application/json;charset=UTF-8" }
        })
    .then(result => result.json())
    .then(res => printallMatches(res))
    .catch(err => console.log(err));
}
function addAnotherPlayer(){
    let form = document.getElementById("addMatchForm");
    let select = document.getElementById("select");
    select.innerHTML = firstSelect.innerHTML//get first Select HTML.
    form.appendChild(select);
}

function createPlayerSelect(json){
    let player1 = document.getElementById("player1");
    let option = document.createElement("option");
        option.value = null;
        option.innerText = "Select A player";
    for(let j of json){
        option = document.createElement("option");
        option.value = j.playerID;
        option.innerText = j.playerName;
        player1.appendChild(option);
    }
    document.getElementById("player2").innerHTML = player1.innerHTML;
}

$(document).ready( function () {
    fetch('http://localhost:8080/player/', {
    
    }).then(result => result.json())
    .then(res=> createPlayerSelect(res))
    .catch(err=> console.log(err));


    fetch('http://localhost:8080/match/not-played', {
        //method: 'GET',
        //body: JSON.stringify({ name: petName.value, lastName: peopleName.value }),
        // headers: { "Accept": "application/json;charset=UTF-8" }
    })
    .then(result => result.json())
    .then(res => printallMatches(res))
    .catch(err => console.log(err));
});