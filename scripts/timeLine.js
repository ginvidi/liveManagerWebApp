function markActiveLink(el,matches, players) {   

// left div
	$('#content').append(' <div><h2> '+$('#'+$(el).attr("id")).text()+'\'s game play </h2>  </div><h4>First Half</h4><div id ="timeline1"></div><h4>Second Half</h4><div id="timeline2"></div>');





/*  ++++++++++++++++++++++++++++++++++++++timeLine +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


setTimeout(function() {



data1 = [
			{label: "Kick-off", times: [
			    {"starting_time": 0*60*1000, "ending_time": 0*60*1000} 
			]},
			{label: "goal", times: []}
	]
data2 = [
			{label: "Kick-off", times: [
			    {"starting_time": 0*60*1000, "ending_time": 0*60*1000}, 
			]},
			{label: "goal", times: []}
			]
		for (action in Players[matches][players]){
			if (action == "goal"){
				for (var i=0; i< Players[matches][players][action].length; i++){

					 if (parseInt(Players[matches][players][action][i])>45){
					data2[1]['times'].push({"starting_time": (parseInt(Players[matches][players][action][i])-45)*60*1000, "ending_time": parseInt(Players[matches][players][action][i])*60*1000});

					}
					else {
					data1[1]['times'].push({"starting_time": parseInt(Players[matches][players][action][i])*60*1000, "ending_time": parseInt(Players[matches][players][action][i])*60*1000});



					}
				}


			}
			

			



		}


			

		var formatTime = d3.time.format("%M"),
		    formatMinutes = function(d) { return formatTime(new Date(2012, 0, 0, 0, 0, 0, d)); };   //The intervals are in millis

		var chart = d3.timeline()
		  .relativeTime()
		  .beginning(0)
		  .ending(45*60*1000)

		  .tickFormat({
		    format: formatMinutes,
		    tickTime: d3.time.minutes,
		    tickInterval: 1,
		    tickSize: 1,
		  })
		  .display("circle")
		  .stack() // toggles graph stacking
		  .margin({left:70, right:30, top:0, bottom:0})
		  ;

		  
		var svg = d3.select("#timeline1").append("svg").attr("width",845)
		  .datum(data1).call(chart);
		var svg = d3.select("#timeline2").append("svg").attr("width",845)
		  .datum(data2).call(chart);
	}, 500);
}

