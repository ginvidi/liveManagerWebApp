
// to check i f a element is inside array of array
function arrayInArray(needle, haystack) {
    var i=0, len=haystack.length, target=JSON.stringify(needle);
    for(; i<len; i++) {
        if (JSON.stringify(haystack[i]) == target) {
            return i;
        }
    }
    return -1;//return-1 if there is any compination in array
}

var Match = [];
// set match in a array 
function getSquad(data){

	$.each(data, function( index, value ) {

		if (arrayInArray([value["match"].home_squad,value["match"].away_squad], Match)==-1){

		
			Match.push([value["match"].home_squad,value["match"].away_squad]);
		
		}
		

	});
	  console.log(  Match );
}



$.getJSON( "data/actions.json", function( data ) {

		getSquad(data);// call function list Squad 


	globaldata = data;	
});// getJson closed




//tab nav js
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})




