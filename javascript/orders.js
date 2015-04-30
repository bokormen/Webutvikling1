/*
Run two functions on page load to check if destination is set.
If so the calcTotal() script will start calculating the price
*/
window.onload = function() { preselectItem(getElement("destination")) || preselectRadio(getElement("accommodation")) || calcTotal() };

/*
Function to retrieve elements from URL substring
We will use this to pre-fill some of the order form boxesS
*/
function getElement(element) {
	// Get everything after the ? in the current URL
	var substring = window.location.search.substring(1);
	// Split string if there are more elements in the substring using & as divider
	var elements = substring.split("&");
	// Fill an array with all the elements from the substring using this loop
	for (var i=0; i < elements.length; i++) {
		// For every element, split in two parts using the = as divider
		var pair = elements[i].split("=");
		// Checks if the current element matches the query and returns it
		if (pair[0] == element) {
			return pair[1];
		}
	}
	// If nothing matches the query return boolean false
	return false;
}

/*
Functions to hide and show div elements based on input from user.
The functions recieves an argument that corresponds to the ID of the
element that should be hidden or shown. We use it to show and hide DIVs.
 */

// The function to show (reveal) an element.
function showOption(show){
	document.getElementById(show).style.display='block';
}

// The function to hide an element.
function hideOption(hide){
	document.getElementById(hide).style.display='none';
}




//
function preselectItem(destination) {
	var dropDown = document.getElementById("finalDest");
	// Loop through all the items
	for (i = 0; i < dropDown.options.length; i++) {
		if (dropDown.options[i].value == destination) {
			// Item is found. Set its selected property, and exit the loop
			dropDown.options[i].selected = true;
			break;
		}
	}
}


function preselectRadio(accommodation) {
	var buttons = document.getElementsByName("optionAccommodation");
	alert(accommodation);
}



/*

Price calculating functions for the ordering form.

*/

var destinationPrices = [];
destinationPrices["Kypros"]=3000;
destinationPrices["Malorca"]=4000;
destinationPrices["Ibiza"]=5000;

var accomodationPrices = [];
accomodationPrices["Suite"]=3000;
accomodationPrices["Dobbeltrom"]=2500;
accomodationPrices["Enkeltrom"]=2000;
var accomoAptPrice = 3500;

var wifiPrice = 250;
var foodPrice = 400;
var ACPrice = 250;
var swimPrice = 200;
var washPrice = 500;

function getSeason() {
	season = 1;
	// var inputDay = document.getElementById("fromDay").value;
	var inputMonth = document.getElementById("fromMonth").value;
	// var inputYear = document.getElementById("fromYear").value;
	/*if (parseFloat(inputDay) == parseInt(inputDay) && !isNaN(inputDay)) {
		var day = inputDay;
	}*/
	if (parseFloat(inputMonth) == parseInt(inputMonth) && !isNaN(inputMonth)) {
		var month = inputMonth;
	}
	/*if (parseFloat(inputYear) == parseInt(inputYear) && !isNaN(inputYear)) {
		var year = inputYear;
	}*/
	if (month <= 2 || month >= 11) {
		season *= 0.7;
	}
	else if (month <= 4 || month >= 9) {
		season *= 0.85;
	}
	return season;
}

function getDestinationPrice () {
	var destPrice = 0;
	var dest = document.getElementById('finalDest').value;
	for (var i in destinationPrices) {
		if (i == dest) {
			destPrice = destinationPrices[i];
			break;
		}
	}
	return destPrice;
}

function membershipRebate() {
	var rebate = 1;
	var calcForm = document.forms["newOrder"];
	var isMember = calcForm.elements["isMember"];
	if (isMember.checked==true) { rebate = 0.8; }
	return rebate;
}

function getVacLength() {
	return document.getElementById("howManyWeeks").value;
}

function getRooms() {
	var people = 1;
	var input = document.getElementById("rooms").value;
	if (parseFloat(input) == parseInt(input) && !isNaN(input)) {
		people = input;
	}
	return people;
}

function getAccPrice() {
	var accPrice=0;
	var accRadio = document.getElementById("optApt").checked;
	if(accRadio) {
		accPrice = accomoAptPrice;
	}
	var accChoice = document.getElementById("roomSize").value;
	if(!accRadio) {
		for (i in accomodationPrices) {
			if (i == accChoice) {
				accPrice = accomodationPrices[i];
				break;
			}
		}
	}
	return accPrice;
}

function getOptions() {
	var options = 0;
	var wifi = document.getElementById("wifi").checked;
	var food = document.getElementById("food").checked;
	var AC = document.getElementById("hotAC").checked;
	var swim = document.getElementById("aptSwim").checked;
	var wash = document.getElementById("housekeeping").checked;
	if (document.getElementById("optHotel").checked) {
		if(wifi) {options += wifiPrice;}
		if(food) {options += foodPrice;}
		if(AC) {options += ACPrice;}
	} else if (document.getElementById("optApt").checked) {
		if (wifi) {options += wifiPrice;}
		if (swim) {options += swimPrice;}
		if (wash) {options += washPrice;}
	}
	return options;
}

function calcTotal() {
	var totalPrice = ((((getDestinationPrice() + getAccPrice() + getOptions()) * getVacLength()) * getRooms()) *getSeason()) * membershipRebate();
	var divTotPrice = document.getElementById('totalPrice');
	divTotPrice.style.display='block';
	document.getElementById('totalPrice').innerHTML = "Reisen din vil koste kr " + totalPrice + ",-";
}

/*

All math/ price calculations functions done.

 */




/*
Field validation functions, used to be sure we post all the neccessary
data from the form. If all data is valid you are redirected to the
order confirmation page.
 */


// hotellrom

function checkStuff() {
	var inputDay = document.getElementById("fromDay").value;
	var inputMonth = document.getElementById("fromMonth").value;
	var inputYear = document.getElementById("fromYear").value;
	var inputRooms = document.getElementById("rooms").value;
	var inputHotel = document.getElementById("roomSize").value;
	var validation = [];
	validation["fromDay"]=false;
	validation["fromMonth"]=false;
	validation["fromYear"]=false;
	validation["rooms"]=false;
	validation["roomSize"]=false;
	if (parseFloat(inputDay) == parseInt(inputDay) && !isNaN(inputDay)) {
		var day = inputDay;
	}
	if (parseFloat(inputMonth) == parseInt(inputMonth) && !isNaN(inputMonth)) {
		var month = inputMonth;
	}
	if (parseFloat(inputYear) == parseInt(inputYear) && !isNaN(inputYear)) {
		var year = inputYear;
	}
	if (parseFloat(inputRooms) == parseInt(inputRooms) && !isNaN(inputRooms)) {
		var rooms = inputRooms;
	}
	/*if (parseFloat(rooms) == parseInt(inputRooms) && !isNaN(inputRooms)) {
		var rooms = inputYear;
	}*/
	if (day >= 1 && day <= 32) {
		validation["fromDay"]=true;
	}
	if (month >= 1 && month <= 12) {
		validation["fromMonth"]=true;
	}
	if (year >= 15 && year  <= 17) {
		validation["fromYear"]=true;
	}
	if (rooms >= 1 && rooms  <= 10) {
		validation["rooms"]=true;
	}
	if (inputHotel !== "velg") {
		validation["roomSize"]=true;
	}
	for (i in validation) {
		if (validation[i] == false) {
			window.document.forms["newOrder"][i].focus();
			return false;
		}
	}
	return true;
}