/* Michael Frohberg id 0003262761
 MDVBS VFW 1212 
Project 4 - Forms
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
	function getCheckbox() {
		var check = document.forms[0].allergy
		if(check.checked) {
				hasAllergy = check.value                                                                                                                 
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
	function saveData(key) {
		if(!key){
			var id 						= Math.floor(Math.random()*1000001);
		}else{
			id = key;
		}
		getRadioValue ();
		getCheckbox();
		var item						= {};
			 item.kname				= ["Kid's Name:", $("kname").value];
			 item.pname				= ["Parent's Name:", $("pname").value];
			 item.phone				= ["Phone #:", $("phone").value];
			 item.email				= ["Email:", $("email").value];
			 item.date				= ["Play Date:", $("date").value];
			 item.sex				= ["Sex:", sexValue];
			 item.choice			= ["Best Time of Week:", $("choice").value];
			 item.select			= ["Best Time of Day:", $("dayTimes").value];
			 item.allergies		= ["Allergies?:", hasAllergy];
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
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
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
				makeSubList.appendChild(linksLi)
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
		
	}
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Contact";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Contact";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink)	
	}
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value)
		toggleControls("off");
		$("kname").value = item.kname[1];
		$("pname").value = item.pname[1];
		$("phone").value = item.phone[1];
		$("email").value = item.email[1];
		$("date").value = item.date[1];
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value === "Boy" && item.sex[1] == "Boy"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Girl" && item.sex[1] == "Girl"){
				radios[i].setAttribute("checked", "checked");
			}
		}	
		$("choice").value = item.choice[1];		
		$("dayTimes").value = item.select[1];		
		if(item.allergies[1] == "Yes") {
			$("allergies").setAttribute("checked", "checked");
		}
		$("comments").value[1] = item.comments[1];		
		$("outgoing").value[1] = item.outgoing[1];				
	
		//remove save initial event listener
		save.removeEventListener("click", storeData);
		//change submit to edit
		$("submit").value = "Edit Contact";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}	
	function deleteItem (){
		var ask = confirm("Are you sure you want to delete this PlayDate?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact Deleted!");
			window.location.reload();
		}else{
			alert("PlayDate was NOT deleted!");
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
	function validate(e){
		var getKname = $("kname");
		var getPname = $("pname");
		var getEmail = $("email");
		var getDayTimes = $("dayTimes");		
		// error reset
		errMsg.innerHTML = "";
		getKname.style.border = "1px solid black";
		getPname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getDayTimes.style.border = "1px solid black";
		
		// get error messages
		var messageAry = []
		// kid name
		if(getKname.value === 0) {
			var kNameError = "Please Enter a PlayDate.";
			getKname.style.border = "1px solid red";
			messageAry.push(kNameError);
		}
		// parent name
		if(getPname.value === 0) {
			var PNameError = "Please Enter Parent(s) Name."
			getPname.style.border = "1px solid red";
			messageAry.push(PNameError);
		}	
		// email
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}	
		// time of day
		if(getDayTimes.value === "--Time of Day--") {
			var dayTimesError = "Please choose a time of day.";
			getDayTimes.style.border = "1px solid red";
			messageAry.push(dayTimesError);
		}
		if (messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
		// save if all is well
			saveData(this.key);
		}
	}

	
//variables
	var bestTimes = ["--Time of Day--", 
								"Mornings", 
								"Early Afternoon", 
								"Late Afternoon", 							  
								"Evenings"],
		sexValue,
		hasAllergy = "No";
		errMsg = $("errors"); 
	makeCats ();
	//Links and Submit Button
	var displayData = $("display");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearLocal);
	var submitData = $("submit");
	submitData.addEventListener("click", validate);
	

});

