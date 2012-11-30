/* Michael Frohberg id 0003262761
 MDVBS VFW 1212 
Project 2 - Forms
iPlayDate - main.js
*/

window.addEventListener("DOMContentLoaded", function() {
	function $(x) {
		var theValue = document.getElementById(x);
		return theValue;
	}
//Build select element with options
	function makeCats () {
		var formTag = document.getElementsByTagName("form"),
			 selectDiv = $("select"),
			 makeSelect = document.createElement("select");
			 makeSelect.setAttribute("id", "dayTimes");
		for(var i=0, j=bestTimes.length; i<j; i++) {
			var createOption = document.createElement("option");		
			var optText = bestTimes[i];	
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			makeSelect.appendChild(createOption)		
		}
		selectDiv.appendChild(makeSelect);
	}
	function makeCats () {
		var formTag = document.getElementsByTagName("form"),
			 selectDiv = $("select"),
			 makeSelect = document.createElement("select");
			 makeSelect.setAttribute("id", "dayTimes");
		for(var i=0, j=bestTimes.length; i<j; i++) {
			var createOption = document.createElement("option");		
			var optText = bestTimes[i];	
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			makeSelect.appendChild(createOption)		
		}
		selectDiv.appendChild(makeSelect);
	}
	function getRadioValue (){
		var radios = document.forms[0].sex
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	function getCheckboxValues() {
		var check = document.getElementById("needs");
		for(var i=0; i<check.length; i++)
			if(check[i].checked) {
				needsValue = check.value;
			} else {
					needsValue = "None";
			}
	}	// Local Storage Function - Stores name and and values from forms into an array
	function saveData() {
		var id 						= Math.floor(Math.random()*1000001);	
		getRadioValue ();
		getCheckboxValues();
		var item						= {};
			 item.kname				= ["Kid's Name:", $("kname").value];
			 item.pname				= ["Parent's Name:", $("pname").value];
			 item.phone				= ["Phone #:", $("phone").value];
			 item.email				= ["Email:", $("email").value];
			 item.date				= ["Play Date:", $("date").value];
			 item.sex				= ["Sex:", sexValue];
			 item.choice			= ["Best Time of Week:", $("choice").value];
			 item.select			= ["Best Time of Day:", $("select").value];
			 item.needs				= ["Special Needs:", needsValue];
			 item.comments			= ["Notes", $("comments").value];
			 item.outgoing			= ["How Outgoing? 1-10:", $("outgoing").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Saved!");
	}

//variables
	var bestTimes = ["--Time of Day--", 
								"Mornings", 
								"Early Afternoon", 
								"Late Afternoon", 							  
								"Evenings"],
		sexValue,
		needsValue = "None"
	;
								
		
	makeCats ();
	
	//Links and Submit Button
	/*var displayData = $("display");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearLocal);
	*/
	var submitData = $("submit");
	submitData.addEventListener("click", saveData);


});