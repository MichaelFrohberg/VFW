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
	function getRadioValue (){
		var radios = document.forms[0].sex
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	function getCheckboxValues() {
		var check = document.getElementById("needs").checked
		for(var i=0; i<check.length; i++)
			if(check[i].checked) {
				needsValue = check.checked;
			} else {
					needsValue = "None";
			}
	}
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("iPlayDate").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				break;
			case "off":
				$("iPlayDate").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
// Local Storage Function - Stores name and and values from forms into an array
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
			 item.select			= ["Best Time of Day:", $("dayTimes").value];
			 item.needs				= ["Needs:", needsValue];
			 item.comments			= ["Notes:", $("comments").value];
			 item.outgoing			= ["How Outgoing? 1-10:", $("outgoing").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Saved!");
	}
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("No Data Stored!");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
//Converting local storage string into an object
			var object = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for(var n in object){
				var makeSubLi = document.createElement("li");
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[n][0]+" "+object[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("Nothing to Clear!");
		} else {
				localStorage.clear();
				alert("Everything is Deleted!");
				window.location.reload();
				return false;
		}
		
	}
//variables
	var bestTimes = ["--Time of Day--", 
								"Mornings", 
								"Early Afternoon", 
								"Late Afternoon", 							  
								"Evenings"],
		sexValue,
		needsValue
	;
	makeCats ();
	//Links and Submit Button
	var displayData = $("display");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearLocal);
	var submitData = $("submit");
	submitData.addEventListener("click", saveData);
	
});

