/*
Functions that is run on page load to check if destination is set.
If so the calcTotal() script will start calculating the price
*/
function start() {
	preselectItem(getElement("destination"));
	preselectRadio(getElement("accommodation"));
	doChange(getElement("accommodation"));
	calcTotal();
}

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





// Checks if destination is sent in url and presets the drop down
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

// Checks if accommodation is set in the url and checks the correct radiobutton
function preselectRadio(accommodation) {
	var hotel = document.getElementById("optHotel");
	var apartment = document.getElementById("optApt");
	//  sets the hotel button if accommodation=hotell in url
	if (accommodation == "Hotell") {
		hotel.checked = true;
	}
	// sets the apartment radiobutton if accommodation=leilighet is sent in the url
	else if (accommodation == "Leilighet") {
		apartment.checked = true;
	}
	// if checks fail set hotel as default
	else document.getElementById("optHotel").checked = true;
}


// function that receives input from the radiobuttons, shows and hides elements
// these are the extras checkboxes in the bottom left corner and the hotel room type in the bottom right
function doChange(accommodation) {
	if (accommodation == "Hotell") {
		showOption('chooseRoom');
		showOption('hotelFood');
		showOption('hotelAC');
		hideOption('aptHouseKeeping');
		hideOption('aptSwimming');
	}
	else if (accommodation == "Leilighet") {
		hideOption('chooseRoom');
		hideOption('hotelFood');
		hideOption('hotelAC');
		showOption('aptSwimming');
		showOption('aptHouseKeeping');
	}
	calcTotal();
}

/*
Price calculating functions for the ordering form.
*/

// variables to set the price for different options
var destinationPrices = [];
destinationPrices["Kypros"]=3000; // air-fare to Kypros
destinationPrices["Malorca"]=4000; // air-fare to Malorca
destinationPrices["Ibiza"]=5000; // air-fare to Ibiza

var accomodationPrices = [];
accomodationPrices["Suite"]=3000; // The costs of a hotel suite for 1 week
accomodationPrices["Dobbeltrom"]=2500; // The costs of a hotel double room for 1 week
accomodationPrices["Enkeltrom"]=2000; // The costs of a hotel single room for 1 week
var accomoAptPrice = 3500;

var wifiPrice = 250; // extra for wifi/ internet for 1 week
var foodPrice = 400; // extra for food on hotel, 1 week
var ACPrice = 250; // 1 week worth of AC in hotel
var swimPrice = 200; // 1 week access to swimmingpool
var washPrice = 500; // 1 week costs of housekeeping

// checks if membership box is checked and recalculates price with a 20% rebate
function membershipRebate() {
	var rebate = 1; // no rebate if not checked
	var calcForm = document.forms["newOrder"]; // tells function which form
	var isMember = calcForm.elements["isMember"]; // gets status of checkbox
	if (isMember.checked==true) { rebate = 0.8; } // if checked 20% rebate
	return rebate;
}

// gets destination air-fare price
function getDestinationPrice () {
	var destPrice = 0; // no destination = no cost
	var dest = document.getElementById('finalDest').value; // gets the value currently selected in the pull down
	// loops through price array set at the top of the price functions
	for (var i in destinationPrices) {
		if (i == dest) { // if match with pull down set new destination price from array
			destPrice = destinationPrices[i];
			break;
		}
	}
	return destPrice;
}

// function to get price for chosen accommodations
function getAccPrice() {
	var accPrice=0; // no accommodation = no price
	var accRadio = document.getElementById("optApt").checked; // gets status of apartment radiobutton
	if(accRadio) {
		accPrice = accomoAptPrice; // if button is set price for apartment is set

	}
	// if hotel is chosen check what kind of hotel room custumer want and set the correct price
	var accChoice = document.getElementById("roomSize").value;
	if(!accRadio) {
		// loops through array and checks if current choice matches a value in the array
		for (i in accomodationPrices) {
			if (i == accChoice) {
				accPrice = accomodationPrices[i]; // if it does set new price
				break;
			}
		}
	}
	return accPrice;
}

// checks if its in or out of season
function getSeason() {
	season = 1; // in season normal divider is 1
	var inputMonth = document.getElementById("fromMonth").value; // gets value from the month textbox
	// control to see if its a valid value
	if (parseFloat(inputMonth) == parseInt(inputMonth) && !isNaN(inputMonth)) {
		var month = inputMonth;
	}
	// winter months 30% rebate
	if (month <= 2 || month >= 11) {
		season *= 0.7;
	}
	// spring and fall 15% rebate
	else if (month <= 4 || month >= 9) {
		season *= 0.85;
	}
	return season;
}

// this function returns length of the vacation
function getVacLength() {
	return document.getElementById("howManyWeeks").value;
}

// this function returns the number of rooms chosen
function getRooms() {
	var people = 1; // one room by default
	var input = document.getElementById("rooms").value; // gets value from room textbox
	// checks if valid value
	if (parseFloat(input) == parseInt(input) && !isNaN(input)) {
		people = input; // if valid, sets new value
	}
	return people;
}

// checks for extra options are ticked off in the checkboxes
// this function adds the price for all the chosen extras and returns it as a whole
function getOptions() {
	var options = 0; // nothing chosen by default
	var wifi = document.getElementById("wifi").checked; // checks for wifi
	var food = document.getElementById("food").checked; // checks for hotel food
	var AC = document.getElementById("hotAC").checked; // checks for hotel AC
	var swim = document.getElementById("aptSwim").checked; // checks for swimmingpool
	var wash = document.getElementById("housekeeping").checked; // checks for housekeeping
	// if hotel room is chosen as accomodation only wifi, food and AC is valid
	if (document.getElementById("optHotel").checked) {
		if(wifi) {options += wifiPrice;}
		if(food) {options += foodPrice;}
		if(AC) {options += ACPrice;}
	}
	// else if apartment is chosen only wifi, swimmingpool and housekeeping is valid
	else if (document.getElementById("optApt").checked) {
		if (wifi) {options += wifiPrice;}
		if (swim) {options += swimPrice;}
		if (wash) {options += washPrice;}
	}
	return options;
}

// The function to calculate the total price
// getAccPrice and getOptions are both weekly costs, therefore they are added up, the multiplied with the rest.
// getVacLength, length in weeks is a multiplier
// getRooms, number of rooms or apartments is a multiplier
// getSeason - season rebate is multiplied in
// getDestination - air-fare is a one time cost and added at the end
// membershipRebate - in the end the total result is multiplied with the membership rebate if there is one.
function calcTotal() {
	var totalPrice = (((((getAccPrice() + getOptions()) * getVacLength()) * getRooms()) *getSeason()) + getDestinationPrice()) * membershipRebate();
	var divTotPrice = document.getElementById('totalPrice');
	divTotPrice.style.display='block';
	// function then outputs the total price for the choices made
	document.getElementById('totalPrice').innerHTML = "Reisen din vil koste kr <input type='text' id='travelCost' style='width:50px; text-align: center;' name='Turen_vil_koste' readonly value='" + totalPrice + ",-'></input>";
}

/*

All math/ price calculations functions done.

 */
