
// create an SVG image for each side of the dice 
var zero_pic = "<img src=\"./img/zero.svg\" alt=\"0\" width=\"25\"/>";
var one_pic  = "<img src=\"./img/one.svg\"  alt=\"1\" width=\"25\"/>";
var two_pic  = "<img src=\"./img/two.svg\"  alt=\"2\" width=\"25\"/>";

// indexed by side value
var poss_results = [zero_pic, one_pic, two_pic];

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
		result = roll();
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

function roll() {
	// dice are 3 sided.  0, 1, 2
	return Math.floor(Math.random() * 3);
}
