// Method to populate an array with numbers
Array.prototype.populate = function(n) {
	return Object.keys(Object(0+Array(n+1)));
};

// Creates an array filled with numbers from 1-4
var weeks = [].populate(4);

// Creates an element for each number in the array
var newElement = document.getElementById("howManyWeeks");
var i = 1; // The lowest number possible to choose from the pull down menu

// This for-loop starts with the number chosen above and populates the html select tag
// with the number of option fields ending with the last number in the created array (days[]).
for (i; i < weeks.length; i++) {
	var opt = weeks[i]; // the value stored in the current "slot" of this array
	var el = document.createElement("option");
	el.textContent = opt;
	el.value = opt;
	newElement.appendChild(el);
}