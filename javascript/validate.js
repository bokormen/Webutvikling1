/**
 * Created by Frode on 30.04.2015.
 */
/*
 Field validation functions, used to be sure we post all the neccessary
 data from the form. If all data is valid you are redirected to the
 order confirmation page.
 */

function checkStuff() {
	// get information for different textboxes and pulldowns
	var inputDest = document.getElementById("finalDest").value; // gets destination from pull down
	var inputDay = document.getElementById("fromDay").value; // gets departure day
	var inputMonth = document.getElementById("fromMonth").value; // gets departure month
	var inputYear = document.getElementById("fromYear").value; // gets departure year
	var inputRooms = document.getElementById("rooms").value; // gets number of rooms ordered
	var inputHotel = document.getElementById("roomSize").value; // gets type of room from pull down
	var validation = []; // array containing checkpoints
	validation["finalDest"]=false;
	validation["fromDay"]=false;
	validation["fromMonth"]=false;
	validation["fromYear"]=false;
	validation["rooms"]=false;
	validation["roomSize"]=false;
	// makes sure boxes that should not be ticked if APARTMENT is chosen gets unticked
	if (document.getElementById("optApt").checked) {
		document.getElementById("food").checked = false;
		document.getElementById("hotAC").checked = false;
	}
	// makes sure boxes that should not be ticked if HOTEL is chosen gets unticked
	else if(document.getElementById("optHotel").checked) {
		document.getElementById("aptSwim").checked = false;
		document.getElementById("housekeeping").checked = false;
	}
	// checks if input in day textbox is an integer
	if (parseFloat(inputDay) == parseInt(inputDay) && !isNaN(inputDay)) {
		var day = inputDay;
	}
	// checks if input in month textbox is an integer
	if (parseFloat(inputMonth) == parseInt(inputMonth) && !isNaN(inputMonth)) {
		var month = inputMonth;
	}
	// checks if input in year textbox is an integer
	if (parseFloat(inputYear) == parseInt(inputYear) && !isNaN(inputYear)) {
		var year = inputYear;
	}
	// checks if input in rooms textbox is an integer
	if (parseFloat(inputRooms) == parseInt(inputRooms) && !isNaN(inputRooms)) {
		var rooms = inputRooms;
	}
	// if destination is chosen this check is valid
	if (inputDest !== "velg") {
		validation["finalDest"]=true;
	}
	// simple check to make sure day in month is between 1 and 31
	if (day >= 1 && day <= 31) {
		validation["fromDay"]=true;
	}
	// checks if month is valid
	if (month >= 1 && month <= 12) {
		validation["fromMonth"]=true;
	}
	// can only order current year and 2 years into the future
	if (year >= 15 && year  <= 17) {
		validation["fromYear"]=true;
	}
	// blocks orders below 1 room and above 10 rooms.
	if (rooms >= 1 && rooms  <= 10) {
		validation["rooms"]=true;
	}
	// checks if a hotel room size/ type is set
	if (inputHotel !== "velg" || document.getElementById("optApt").checked) {
		validation["roomSize"]=true;
	}
	// traverses the array, if every option is ok exits the the array
	// if one option is wrong it stops the loop and shows a popup box
	// also sets focus on the field that needs correcting
	for (i in validation) {
		if (validation[i] == false) {
			window.document.forms["newOrder"][i].focus();
			alert("Det markerte feltet må fylles inn");
			return false;
		}
	}
	// if all ok return true
	return true;
}



/*
This function is used on the login page to check if login information is correct
 */
function validateLogin() {
	var user = document.getElementById("userName").value; // gets username
	var pass = document.getElementById("password").value; // gets password
	// checks if username contains text (regeX)
	if (!user.match(/\S/)) {
		alert("Du maa skrive inn brukernavnet ditt!");
		return false;
	}
	// checks if password contains text (regeX)
	if (!pass.match(/\S/)) {
		alert("Du maa skrive inn passordet ditt!");
		return false;
	}
	return true;
}

/*
This function is used to validate the contact form on the contact us page
 */
function validateForm() {
	var user = document.getElementById("email").value; // get email address
	var comment = document.getElementById("comment").value; // gets content of the textarea
	// checks for content using regex
	if (!user.match(/\S/)) {
		alert("Du maa skrive inn din e-post adresse!");
		return false;
	}
	// checks for content useing regex
	if (!comment.match(/\S/)) {
		alert("Du kan ikke sende inn en tom kommentar!!");
		return false;
	}
	return true;
}


/*
This function checks if the search box on the menu bar contains valid text using regex
 */
function checkSearch() {
	var search = document.getElementById("searchString").value;
	if (!search.match(/\S/)) {
		return false;
	}
	return true;
}