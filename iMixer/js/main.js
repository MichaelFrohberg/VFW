/* Michael Frohberg id 0003262761
 MDVBS VFW 1212 
Project 3 - Forms
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
			 makeSelect.setAttribute("id", "sample");
		for(var i=0, j=sampleRates.length; i<j; i++) {
			var createOption = document.createElement("option");		
			var optText = sampleRates[i];	
			createOption.setAttribute("value", optText);
			createOption.innerHTML = optText;
			makeSelect.appendChild(createOption);		
		}
		selectDiv.appendChild(makeSelect);
	}
	function getRadioValue (){
		var radios = document.forms[0].frame
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked){
				frameRate = radios[i].value;
			}
		}
	}
	function getCheckbox() {
		if($("reftone").checked) {
				refTone = $("reftone").value;                                                                                                                 
		} else {
			refTone = "No";
		}
	}
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("soundReport").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				break;
			case "off":
				$("soundReport").style.display = "block";
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
		var key = localStorage.key()		
			if(!key) {
				var id 					= Math.floor(Math.random()*1000001);
			}else{
				id = key;
		}
		getRadioValue ();
		getCheckbox();
		var item					= {};
			 item.project			= ["Project Name:", $("project").value];
			 item.production		= ["Production Company:", $("production").value];
			 item.contact			= ["Production Contact:", $("contact").value];
			 item.cphone			= ["Contact Phone #:", $("cPhone").value];
			 item.mixer				= ["Sound Mixer:", $("mixer").value];
			 item.mphone			= ["Mixer Phone #:", $("mPhone").value];
			 item.email				= ["Mixer Email:", $("email").value];
			 item.date				= ["Shoot Date:", $("date").value];
			 item.media				= ["Project Media:",$("media").value];
			 item.select			= ["Sample Rate:", $("select").value];
			 item.radios			= ["Frame Rate:", frameRate];
			 item.box				= ["1khz Reference Tone:", refTone];
			 item.track1			= ["Track 1:", $("track1").value];
			 item.track2			= ["Track 2:", $("track2").value];
			 item.track3			= ["Track 3:", $("track3").value];
			 item.track4			= ["Track 4:", $("track4").value];
			 item.track5			= ["Track 5:", $("track5").value];
			 item.track6			= ["Track 6:", $("track6").value];
			 item.track7			= ["Track 7:", $("track7").value];
			 item.track8			= ["Track 8:", $("track8").value];
			 item.scene				= ["Scene Number/Name:", $("scene").value];
			 item.take				= ["Take Number/Name:", $("take").value];
			 item.notes				= ["Scene/Take Notes:", $("notes").value];
			 item.fader				= ["Fader Level:", $("fader").value];
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
		$("project").value = item.project[1];
		$("production").value = item.production[1];
		$("contact").value = item.contact[1];
		$("cphone").value = item.cphone[1];
		$("mixer").value = item.mixer[1];
		$("mphone").value = item.mphone[1];
		$("email").value = item.email[1];
		$("date").value = item.date[1];
		$("media").value = item.media[1];
		$("select").value = item.select[1];
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value === "23.97 FPS" && item.frame[1] == "23.97 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "24 FPS" && item.sex[1] == "24 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "25 FPS" && item.sex[1] == "25 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "29.97 FPS" && item.sex[1] == "29.97 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "30 FPS" && item.sex[1] == "30 FPS"){
				radios[i].setAttribute("checked", "checked");
			}
		}	
		if(item.box[1] == "Yes") {
			$("reftone").setAttribute("checked", "checked");
		}
		$("track1").value = item.track1[1];
		$("track2").value = item.track2[1];
		$("track3").value = item.track3[1];
		$("track4").value = item.track4[1];
		$("track5").value = item.track5[1];
		$("track6").value = item.track6[1];
		$("track7").value = item.track7[1];
		$("track8").value = item.track8[1];		
		$("scene").value = item.scene[1];		
		$("take").value = item.take[1];		
		$("notes").value = item.notes[1];
		$("fader").value = item.fader[1];				
	
		//remove save initial event listener
		save.removeEventListener("click", saveData);
		//change submit to edit
		$("submit").value = "Edit Contact";
		var editSubmit = $("submit");
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}	
	function deleteItem (){
		var ask = confirm("Are you sure you want to delete this entry?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Entry Deleted!");
			window.location.reload();
		}else{
			alert("Entry was NOT deleted!");
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
		var getProject = $("project");
		var getProduction = $("production");
		var getContact = $("contact");
		var getCPhone = $("cPhone");
		var getMixer = $("mixer");
		var getEmail = $("email");
		var getMedia = $("media");		
		// error reset
		errMsg.innerHTML = " ";
		getProject.style.border = "1px solid black";
		getProduction.style.border = "1px solid black";
		getContact.style.border = "1px solid black";
		getCphone.style.border = "1px solid black";
		getMixer.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getMedia.style.border = "1px solid black";
		
		// get error messages
		var messageAry = []
		// kid name
		if(getProject.value = " ") {
			var projectError = "Please enter a project name.";
			getProject.style.border = "1px solid red";
			messageAry.push(projectError);
		}
		// parent name
		if(getProduction.value = " ") {
			var productionError = "Please enter a production company."
			getProduction.style.border = "1px solid red";
			messageAry.push(productionError);
		}
		if(getContact.value = " ") {
			var contactError = "Please enter a production contact."
			getContact.style.border = "1px solid red";
			messageAry.push(contactError);
		}	
		if(getCphone.value = " ") {
			var cPhoneError = "Please enter a production phone number."
			getCPhone.style.border = "1px solid red";
			messageAry.push(cPhoneError);
		}	
		if(getMixer.value = " ") {
			var mixerError = "Please enter a mixer name."
			getMixer.style.border = "1px solid red";
			messageAry.push(mixerError);
		}		
		// email
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}	
		// time of day
		if(getMedia.value === "Choose Media") {
			var mediaError = "Please choose media format.";
			getMedia.style.border = "1px solid red";
			messageAry.push(mediaError);
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
	var sampleRates = ["--Choose Sample Rate--", 
								"44.1KHZ", 
								"48KHZ", 
								"96KHZ", 							  
								"192KHZ"],
		frameRate,
		refTone = "No",
		errMsg = $("errors"); 
	makeCats ();
	validate();
	//Links and Submit Button
	var displayData = $("display");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearLocal);
	var submitData = $("submit");
	submitData.addEventListener("click", saveData);
	

});

