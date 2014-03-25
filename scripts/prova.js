//tab menu write match
//get the json

globaldata = {};

	 var Squads = [];
	var Match = [];
function isAlreadyIn(array) {



	 var add= true;
  	for each (j=0; j<array.length; j++ ){

		if (element == array[j]){
			var add = false;
			}
		}

	if (add){
	array.push(element);

		}
}
//var filtered = [12, 5, 8, 130, 44].filter(isAlreadyIn);


function getSquad(data){
		console.log('entro');
	for (var i = 0 ; i < data.length; i++ ){
		var add= true;
  		for (j=0; j<Squads.length; j++ ){
			if (data[i].squad == Squads[j]){
				var add = false;
			}
		}

		if (add){
		Squads[i]=data[i].squad;
		

		}
		}
	}//getSquad closed

function getMatch(data){

	for (var i = 0 ; i < data.length; i++ ){

		Match[i]=data[i]["match"].away_squad + ' v/s'+ data[i]["match"].home_squad;

		}
	}//getMatch closed



$.getJSON( "data/actions.json", function( data ) {
		console.log('entro');
		getSquad(data);// call function list Squad 
		getMatch(data);// call function list Match 
		console.log(Squads);
		console.log(Match);
	globaldata = data;	
});// getJson closed



