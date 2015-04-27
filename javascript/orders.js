// function to retrieve elements from URL substring
// We will use this to pre-fill some of the order form boxes
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
	return(false);
}