window.addEventListener("DOMContentLoaded", function() {
	function $(x) {
		var theValue = document.getElementById(x);
			return theValue;
	}
	function makeAChoice() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "choice");
		for(var i=0, j=choices.length; i<j; i++) {
			var createOption = document.createElement("option");
			var optText = choices[i];
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			makeSelect.appendChild(createOption);
        }
        selectLi.appendChild(makeSelect);	
	}
	function getPartyId() {
		var radios = document.getElementById("party")
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				partyChoice = radios[i].value; 
			}
		}
	}
	function getIssues() {
		var check = document.getElementById("issue");
		for(var i=0; i<check.length; i++)
			if(check[i].checked) {
				issueChoices = check.value;
			} else {
					issueChoices = "None";
			}
	}
	function storeData() {
		var id = Math.floor(Math.random()*1000001);
		getIssues();	
		getPartyId();		
		var item = {};
			item.candidates = ["Candidate:" $("choice").value];
			item.fname = ["First Name:", $("fname").value];
			item.lname = ["Last Name:", $("lname").value];
			item.phone = ["Telephone:", $("phone").value];
			item.email = ["Email:", $("email").value];
			item.date = ["Birthday:", $("date").value];
			item.parties = ["Party:", partyChoice];
			item.issues = ["Factors:", issueChoices];
			item.comments = ["Comments:", $("comments").value];
			item.slider = ["Confidence", $("slider").value];
			
			localStorage.setItem(id, JSON.stringify(item));
			alert("I Voted!");
	}	
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("iVote").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				$("item").style.display ="block";
				break;
			case "off":
				$("iVote").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addnew").style.display = "none";
				$("item").style.display ="none";				
				break;
			default:
				return false;
		}
	}	
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("No data to clear."); 
			} else {
				localStorage.clear()
				alert("Your data is deleted.");
				window.location.reload();
				return false;
	}
}
	function getData() {
		toggleControls("on")
		if(localStorage.length === 0) {
			alert("No data to clear."); 		
			var newDiv = document.createElement("div");
			newDiv.setAttribute("id", "info");
			var listDisplay = document.createElement("ul");
			newDiv.appendChild(listDisplay);	
			document.body.appendChild(newDiv);
			$("item").style.display ="block";			
			for(var i=0, j=localStorage.length; i<j; i++) {
				var newLi = document.createElement("li");
				listDisplay.appendChild(newLi);
				var key = localStorage.key(i);
				var val = localStorage.getItem(key);
				var obj = JSON.parse(val);
				var makSubList = document.createElement("ul");
				newLi.appendChild(makSubList);
				for(var a in obj) {
					var subLi = document.createElement("li");
					makSubList.appendChild(subLi);
					var subText = obj(a)[0]+" "+ obj(a)[1];
					subLi.innerHTML = subText; 
					}
			}
		}
	}
var choices = ["--Choose A Candidate--", "Barack Obama", "Bill Clinton", "Mitt Romney", "Sarah Palin"],
							partyChoice,
							issueChoices = "None";
	
var clearInfo = $("clear");
	clearInfo.addEventListener("click", clearLocal);
var displayInfo = $("display");
	displayInfo.addEventListener("click", getData);
var save = $("submit");
	save.addEventListener("click", storeData);		
makeAChoice();
