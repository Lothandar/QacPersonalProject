var t =$('#gameTable').DataTable();
        function printallMatches(json)
        {
            console.log(json);
            for(let j of json){
            let id = j.matchID;
            let first_Player =j.poolplayers[0].playerName;
            let second_Player = j.poolplayers[1].playerName;
            let matchType = j.matchType;
            t.row.add( [
            id,
            first_Player,
            second_Player,
            matchType
        ] ).draw( false );
        }
        }
        let addRow = document.getElementById("addRow");
        addRow.addEventListener("click", () => AddingRow());
        function AddingMatch() {
        
        }


            $(document).ready( function () {
            fetch('http://localhost:8080/match/all', {
                //method: 'GET',
                //body: JSON.stringify({ name: petName.value, lastName: peopleName.value }),
                 headers: { "Accept": "application/json;charset=UTF-8" }
            })
            .then(result => result.json())
            .then(res => printallMatches(res))
            .catch(err => console.log(err));
            
            } );