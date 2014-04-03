
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
				if (action == "goal_scored_team"){
					action = "goal";
				}

				matchesResult =  value["match"].home_squad + ' ' + value["match"].home_score + " - "+ value["match"].away_score + ' ' + value["match"].away_squad;
				matches =  value["match"].home_squad +  " - " + value["match"].away_squad;
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

				Players[matches][player ][ action ].push( value["minutes"]);
				Players[matches][player ][ action ] = Players[matches][player ][ action ].filter( onlyUnique ); 

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

/*   ++++++++++++++++++++++++++++++++++++++++replace string +++++++++++++++++++++++++++++++++++++++++++++++++++   */


/* +++++++++++++++++++++++++++++++++++++++++++ Drawning in hmtl ++++++++++++++++++++++++++++++++++++++++++++++   */
setTimeout(function() {
// enter variable needs to check if ther is goal action
	enter = false;

// check all matches in my associative array
	for (var matches in Players) {

		matches = matches.replace('1.','');
		matchesId = matches.replace(/ /gi, '');	
	
// For every match it is appended a div
		$('#accordion').append( ' <div id="' + matchesId + '" class="panel panel-default"  onclick="markActiveLink1(this,\''+matchesResult+'\');"> <div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#"><span > ' + matches + '</spa></a></h4></div><div  class="panel-collapse collapse"><ul   class="list-group"></ul></div>');

//Check all squad-player in every match
		for (var player in Players[matches]) {

  		//console.log(player);
			var playerDivId = player.replace(/ /gi, '');
			sqadplayer = player.split('-');
			var squadclass= sqadplayer[0].replace(/ /gi, '');
			var playerId = sqadplayer[1].replace(/ /gi, '');
			

// Append squad for each match 
			if ($('li').hasClass( squadclass)){
				$('.'+ squadclass).append('<div ><h3 ><a href="#content" id="' + playerId + '" onclick="markActiveLink(this); " >'+sqadplayer[1]+'</a></h3></div>');

				}
			else{
			$('#'+ matchesId +' div ul').append('<li  class = "SquadBody ' + squadclass +'"><h2>'+sqadplayer[0]+'</h2></li>');
			//$('.'+ squadclass).append('<ul class = "list-group"></ul>')
			
			$('.'+ squadclass).append('<div ><h3 ><a href="#content" id="' + playerId + '" onclick="markActiveLink(this);graph(\'' + matches +'\',\'' + player + '\');" >'+sqadplayer[1]+'</a></h3></div>');
			}

//console.log(Players[matches][player]);
			for (action in Players[matches][player]){
				if (action === 'goal'){
					$('.'+ squadclass ).append('<h6  class="goalsNumber" id = "'+ playerDivId +'goals" ">  Goal in match: ' + Players[matches][player][action].length + '</h6 ');
				
					$('#'+matchesId).css('display', 'block');

				for (element in Players[matches][player][action]){ 

						//alert ( Players[matches][player][action][element]);
						$('.'+ squadclass + ' h3 #'+playerId).append('<div  class = "goalsMinuts" id = "'+Players[matches][player][action][element]+'" > </div>');

						}
					}

				
				
			}//close for (action in Players)


		}//close for (var player in Players[matches])
		


}// close setTimeout()


$('.matches').append('<div class = "clear"></div>')
	}, 500);
	







function markActiveLink1(el, data) {
var txt = data;
	var numb = txt.match(/\d/g);

	if($('#'+$(el).attr("id")+' .panel-collapse.collapse').is( ".in" )){	
	
			  $('#'+$(el).attr("id")+' .panel-collapse.collapse').removeClass("in");
			  //$('#content').html('<h1>Check matchs result and Players game skill</h1>')
		}

	else{
  		$('#'+$(el).attr("id")+' .panel-collapse.collapse').addClass("in");

		squads = $('#'+$(el).attr("id")+ ' div h4 a').text().replace('-',' v/s ');
		$('#content').html(' <div><h1 id= "squads"> '+ squads +' </h1><h1 id = "matchResult"> <span> '+ numb[0] + '</span> - <span>' + numb[1] + '</span> </h1></div>')
		

		
		
	}

}   



//function unique array
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
