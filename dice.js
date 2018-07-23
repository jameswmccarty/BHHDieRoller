
// create an SVG image for each side of the dice 
// indexed by side value
var poss_results = [
	"<img src=\"./img/zero.svg\"  alt=\"0\" width=\"25\"/>", //0
	"<img src=\"./img/one.svg\"   alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/two.svg\"   alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/three.svg\" alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/four.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/five.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/six.svg\"   alt=\"6\" width=\"25\"/>"];//6

function rollDice(num_die) {
	var total, i, result;
	var tmp = "" // minimize updates in browser
	total = 0;   // cumulative dice values
	if(num_die <= 0) {
		document.getElementById("results").innerHTML = "<p>Must roll at least one die.</p>";
		return;
	}
	if(num_die > 1000) {
		document.getElementById("results").innerHTML = "<p>That is too many dice!</p>";
		return;
	}
	for (i = 0; i < num_die; i++) {
		if(document.getElementById("sixside").checked) {
			result = roll(1,7);
		} else if(document.getElementById("threeside").checked) {
			result = roll(0,3);
		} else {
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		total += result;
		if(0 == i%8) { // wrap every 8 dice
			tmp += "<br/>";
		}
		tmp += poss_results[result];
		if(i != num_die - 1) { // comma separate
			tmp  += ", ";	
		}
	}
	tmp += "<br/><h3>Total: " + total + "</h3>";
	document.getElementById("results").innerHTML = tmp;
}

function roll(lo, hi) { // hi bound not inclusive
	return Math.floor(Math.random() * (hi-lo) + lo);
}
