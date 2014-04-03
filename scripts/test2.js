
/*   +++++++++++++++++++++++++++++++++++++++ Json data +++++++++++++++++++++++++++++++++++++++++++++++++++++   */
// It needs a dictionary because the json is not coherent 
squad_ids = {

"833" : "FC Bayern München",
"840" : "VfB Stuttgart",
"806" : "1899 Hoffenheim",
"841" : "VfL Wolfsburg",
"839" : "SV Werder Bremen",
"808" : "Borussia Dortmund",
"807" : "Bayer 04 Leverkusen"


}

var Players={};

// Players-squad dictionary
function UploadplayersCard(data){

		$.each(data, function (index, value){

				

			//couse incoherence I need to use the diction tha match squad-name with their id, that appare with some players
				if ("squad" in value) 
					squad = value["squad"];
				else if ("squad_id" in value)
					squad = squad_ids[value["squad_id"]];
				else
					console.log("Unexpected JSON");


			//variable taking data from json
				action = value["action_name"];
				matches =  value["match"].home_squad + ' ' + value["match"].home_score + " - "+ value["match"].away_score + ' ' + value["match"].away_squad;
				player = squad + "-" + value["player_name"];

			//Creation of palyers performance dictionary

			// disctionary structure {match: {squad-player: action [min,..,min]}}			
				if(!( matches  in Players)){
					Players[ matches ] = { };
				}

				if (! ( player in Players[matches])){
					Players[matches][player] = {  };
				}

				if (! (action in Players[matches][player])) {
				 	Players[matches][player][action] = [ ];				
				}

				Players[matches][player ] [ action ].push( value["minutes"]);
				

		});


	}
/*Dictionary structure:
Players{
	matches1:{

		squad-player1{
				action1 [min1, .., minn]
				.....
				actionn [min1, .., minn]
				}
		......
		squad-playern{
				action1 [min1, .., minn]
				.....
				actionn [min1, .., minn]
				}

		}	
	.....

	matchesn:{

		squad-player1{
				action1 [min1, .., minn]
				.....
				actionn [min1, .., minn]
				}
		......
		squad-playern{
				action1 [min1, .., minn]
				.....
				actionn [min1, .., minn]
				}

		}	


}




*/
function getPlayesData(data){




		 $.each(data, function (index, value){
			console.log(index );
			var arr = index.split('-');
				console.log( arr[0] );
				//return squad =  arr[0];
			console.log( arr[1] );			
	
		});
}

//get Json
$.getJSON( "data/actions.json", function( data ) {


		UploadplayersCard(data);
		console.log(Players);

	globaldata = data;	
});// getJson closed


/*   +++++++++++++++++++++++++++++++++++++++END Json data +++++++++++++++++++++++++++++++++++++++++++++++++++++   */


/* +++++++++++++++++++++++++++++++++++++++++++ Drawning in hmtl ++++++++++++++++++++++++++++++++++++++++++++++   */
setTimeout(function() {
	enter = false;

	for (var matches in Players) {
  		console.log(matches);
		matches = matches.replace('1.','');
		matchesId = matches.replace(/ /gi, '');

	


		$('#content').append( ' <div id="' + matchesId + '" class= "matches" ><h1>' + matches + ' </h1></div>');
		for (var player in Players[matches]) {
			//console.log('aaaaaaaaaa');
			var playerDivId = player.replace(/ /gi, '')
			sqadplayer = player.split('-');
			var squadclass= sqadplayer[0].replace(/ /gi, '');
			var playerId = sqadplayer[1].replace(/ /gi, '');
			// enter variable need to check if ther is goal action

			$('#'+matchesId).append(' <div><div id = "' +playerDivId + '" class = "SquadBody ' + squadclass +'"><h2 id = "' + playerId + '" class = "player">' + sqadplayer[1] + ' </h2></div> ' );
			for (action in Players[matches][player]){
				if (action === 'goal' ||action === 'goal_scored_team' ){
					$('#'+playerDivId).append('<a> <h1 class="goalsNumber">' + Players[matches][player][action].length + '</h1></a> ')
					/*for (i=0; i< Players[matches][player][action].length; i++ ){

						$('#'+playerDivId ).append(' <div class= "goal"><img src="img/goal.png" alt = "goal"/></div> ')
						}*/
					$('#'+matchesId).css('display', 'block');
					}
				
				
			}


			}
		

		}
$('.matches').append('<div class = "clear"></div>')
	}, 500);
	


