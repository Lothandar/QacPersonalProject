let switchNewShow = document.getElementById("switchNewShow");
let playercount = 4;
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
  let gametypeSelect = document.getElementById("gameType");

let morePlayer = document.getElementById("morePlayer");
morePlayer.addEventListener("click", () => addMorePlayer());

function addMorePlayer(){
    playercount++;
    let playerList = document.getElementById("playerAddList");
    let newPlayerDiv = document.createElement("div");
    let newPlayerLabel = document.createElement("label");
    let newPlayerSelect = document.createElement("select");
    newPlayerLabel.innerText= "Player "+ playercount+":";
    newPlayerSelect.innerHTML = document.getElementById("player1").innerHTML;
    playerList.appendChild(newPlayerDiv);
    newPlayerDiv.appendChild(newPlayerLabel);
    newPlayerDiv.appendChild(newPlayerSelect);
}

function OnChangeCheck(){
    console.log(gametypeSelect.value);
    if(gametypeSelect.value == "Killer"){
        document.getElementById("morePlayer").style.display = "block";
        document.getElementById("player3Div").style.display = "block";
        document.getElementById("player4Div").style.display = "block";
    }
    else if(gametypeSelect.value =="Doubles"){
        let array = document.getElementById("playerList");
        array.childElementCount;
        document.getElementById("player3Div").style.display = "block";
        document.getElementById("player4Div").style.display = "block";
        document.getElementById("morePlayer").style.display = "none";
    }
    else{
        document.getElementById("morePlayer").style.display = "none";
        document.getElementById("player3Div").style.display = "none";
        document.getElementById("player4Div").style.display = "none";
    }
}


var t =$('#gameTable').DataTable();

$('#gameTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        t.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
} );

$('#deleteButton').click( function () { 
    console.log(t.row('.selected').data()[0]);
    id=t.row('.selected').data()[0];
    //Delete function here
    fetch('http://localhost:8080/match/'+id, {
        method: 'DELETE'//,
        //body: JSON.stringify({ 
            //match: {matchType: something.value}, players:[playerArray] }),
            //headers: { "Accept": "application/json;charset=UTF-8" }
        }).then(t.row('.selected').remove().draw( false ))
    //.then(result => result.json())
    //.then(res => printallMatches(res))
    .catch(err => console.log(err));


} );

function printallMatches(json)
{
    console.log(json);
    for(let j of json){
        let id = j.matchID;
        let first_Player;
        let second_Player;
        if(j.poolplayers[0]){
        first_Player =j.poolplayers[0].playerName;
        second_Player = j.poolplayers[1].playerName;
        }
        else{
        first_Player ="No Player";
        second_Player ="No Player";
        }
        let matchType = j.matchType;
        let isPlayed = false;
        t.row.add( [
            id,
            first_Player,
            second_Player,
            matchType,
            'Played: + <input type="checkbox" onclick="Played('+id+')"></input>'
        ]).draw( false );
    }
}

function Played(id){
    console.log("should be played");
    fetch('http://localhost:8080/match/play/'+id, {
        method: 'POST'})
        .then(t.row('.selected').remove().draw( false ))
        .catch(err=> console.log(err));
}

let addRow = document.getElementById("addRow");
addRow.addEventListener("click", () => AddingMatch());
function AddingMatch() {
    playerArray= [document.getElementById("player1").value, document.getElementById("player2").value]
    fetch('http://localhost:8080/match/create', {
        method: 'POST',
        body: JSON.stringify({ 
            match: {
                matchType: document.getElementById("gametypeSelect").value},
                 players:[playerArray] }),
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
    console.log(json);
    if(json.length !=0)
    {
    let player1 = document.getElementById("player1");
    let option = document.createElement("option");
        option.value = null;
        option.innerText = "Select A player";
    player1.appendChild(option);
    for(let j of json){
        option = document.createElement("option");
        option.value = j.playerID;
        option.innerText = j.playerName;
        player1.appendChild(option);
    }
    }
    else{
        let option = document.createElement("option");
        option.value = null;
        option.innerText = "No Player To Display";
        player1.appendChild(option);
        document.getElementById("addRow").disabled = true;
    }
    document.getElementById("player2").innerHTML = player1.innerHTML;
    document.getElementById("player3").innerHTML = player1.innerHTML;
    document.getElementById("player4").innerHTML = player1.innerHTML;
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