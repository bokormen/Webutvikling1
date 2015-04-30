/**
 * Created by Frode on 30.04.2015.
 */
/*
 Field validation functions, used to be sure we post all the neccessary
 data from the form. If all data is valid you are redirected to the
 order confirmation page.
 */

function checkStuff() {
	var inputDest = document.getElementById("finalDest").value;
	var inputDay = document.getElementById("fromDay").value;
	var inputMonth = document.getElementById("fromMonth").value;
	var inputYear = document.getElementById("fromYear").value;
	var inputRooms = document.getElementById("rooms").value;
	var inputHotel = document.getElementById("roomSize").value;
	var validation = [];
	validation["finalDest"]=false;
	validation["fromDay"]=false;
	validation["fromMonth"]=false;
	validation["fromYear"]=false;
	validation["rooms"]=false;
	validation["roomSize"]=false;
	if (document.getElementById("optApt").checked) {
		document.getElementById("food").checked = false;
		document.getElementById("hotAC").checked = false;
	}
	else if(document.getElementById("optHotel").checked) {
		document.getElementById("aptSwim").checked = false;
		document.getElementById("housekeeping").checked = false;
	}
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
	if (inputDest !== "velg") {
		validation["finalDest"]=true;
	}
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
	if (inputHotel !== "velg" || document.getElementById("optApt").checked) {
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

function validateLogin() {
	var user = document.getElementById("userName").value;
	var pass = document.getElementById("password").value;
	if (!user.match(/\S/)) {
		alert("Du maa skrive inn brukernavnet ditt!");
		return false;
	}
	if (!pass.match(/\S/)) {
		alert("Du maa skrive inn passordet ditt!");
		return false;
	}
	return true;
}


function validateForm() {
	var user = document.getElementById("email").value;
	var comment = document.getElementById("comment").value;
	if (!user.match(/\S/)) {
		alert("Du maa skrive inn din e-post adresse!");
		return false;
	}
	if (!comment.match(/\S/)) {
		alert("Du kan ikke sende inn en tom kommentar!!");
		return false;
	}
	return true;
}

function checkSearch() {
	var search = document.getElementById("searchString").value;
	if (!search.match(/\S/)) {
		// alert("Du må søke etter noe.");
		return false;
	}
	return true;
}