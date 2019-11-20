let switchNewShow = document.getElementById("switchNewShow");
switchNewShow.addEventListener("click", () => switchDiv());
function switchDiv() {
    var x = document.getElementById("newPlayer");
    var y = document.getElementById("all_Player");
    if (x.style.display === "none") {
        switchNewShow.innerText="Show All Players";
      x.style.display = "block";
      y.style.display = "none";
    } else {
        switchNewShow.innerText="Create New Player";
      x.style.display = "none";
      y.style.display = "block";
    }
  }

var t =$('#playerTable').DataTable();

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
    fetch('http://localhost:8080/player/'+id, {
        method: 'DELETE'//,
        //body: JSON.stringify({ 
            //match: {matchType: something.value}, players:[playerArray] }),
            //headers: { "Accept": "application/json;charset=UTF-8" }
        }).then(t.row('.selected').remove().draw( false ))
    //.then(result => result.json())
    //.then(res => printallMatches(res))
    .catch(err => console.log(err));


} );

function printallPlayers(json)
{
    console.log(json);
    for(let j of json){
        let id = j.playerID;
        let playerName = j.playerName;
        let photo;
        if(j.photo != null)
        {
        photo = j.photo;
        }
        else{
            photo = "none";
        }
        let isBanned = j.isBanned;
        t.row.add( [
            id,
            playerName,
            photo,
            isBanned
        ]).draw( false );
    }
}

let addRow = document.getElementById("addRow");
addRow.addEventListener("click", () => AddingPlayer());

function AddingPlayer() {
    console.log("creating player :" + document.getElementById("playerName").value);
           let playerName = document.getElementById("playerName").value;
           console.log(playerName);
           console.log(JSON.stringify({ 'playerName' : playerName}));
        fetch('http://localhost:8080/player/create', {
        method: 'POST',
        body: JSON.stringify(
            { 
            playerName : playerName
            //headers: { "Accept": "application/json;charset=UTF-8" }
            }
        )})
    .catch(err => console.log(err));
}

$(document).ready( function () {
    fetch('http://localhost:8080/player/all', {
    
    }).then(result => result.json())
    .then(res=> printallPlayers(res))
    .catch(err=> console.log(err));

});