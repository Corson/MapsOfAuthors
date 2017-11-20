$(document).ready(function(){
	
	var BASE_URL = "http://dblp.uni-trier.de/";
	var PERSON_URL = "pers/xx/";
	var COOP_URL = "pers/xc/";
	var KD = "http://dblp.uni-trier.de/pers/xx/d/Draszawka:Karol.xml";
	var KDCoop = "http://dblp.uni-trier.de/pers/xc/d/Draszawka:Karol.xml";

	var maxRecLevel = 1; // maximum reccurence level	

	function delay() {
		setTimeout(function(){

		}, 5000);
	}

	function xmlParser(xml) {

		$(xml).find("co").each(function () {
			var personWork = $(this).find("na").text();
			console.log(personWork);
			
			//$('#circles').append($('<div>').addClass('circle').append('<p>' + personWork + '</p>')).hide().fadeIn(500);
		});
		
		delay();

		$.ajax({
			type: "GET",
			url: KDCoop,
			dataType: "xml",
			success: function(result) {
				parseWorkCooperate(result,0, 'circle');
			   }
	   });
	   
	   //console.log(arrayKD);  

	}
	
	function parseWorkCooperate(xml, recLevel, circleType) {

		$(xml).find("author").each(function () {
			arrayCoop = new Array();

			var person = $(this).text();
			var amountCommonDocuments = $(this).attr("count");
			var urlpt = $(this).attr("urlpt");

			arrayCoop[0] = amountCommonDocuments;
			arrayCoop[1] = urlpt;

			//Add cooperate people with KD
			arrayKD.push({
				key: person,
				value: arrayCoop
			});		
		});
		
			for (var value in arrayKD) {
				let val = arrayKD[value];
				console.log(val.key + "=" +	val.value[0]);
				var addPerson = val.key + "=" +	val.value[0];
				
				$('#circles').append($('<div>').addClass('circle').append('<p>' + addPerson + '</p>')).hide().fadeIn(500);

				if (recLevel < maxRecLevel) {
				delay();
				$.ajax({
					async: false,
					type: "GET",
					url: BASE_URL + COOP_URL + val.value[1],
					dataType: "xml",
					success: function(result) {
						parseWorkCooperate(result, recLevel+1, 'circle2');
					}
				});
				
			}
			}
	}
	
	 $("#button1").click(function() {
		 
		$.ajax({
			type: "GET",
			url: KD,
			dataType: "xml",
			success: xmlParser
	   });
	 
	      
	});

});