
// create an SVG image for each side of the dice 
// indexed by side value
var reg_poss_results = [
	"<img src=\"./img/zero.svg\"  alt=\"0\" width=\"25\"/>", //0
	"<img src=\"./img/one.svg\"   alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/two.svg\"   alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/three.svg\" alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/four.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/five.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/six.svg\"   alt=\"6\" width=\"25\"/>"];//6

var d8_poss_results = [
	"<img src=\"./img/d8_1.svg\"  alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/d8_2.svg\"  alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/d8_3.svg\"  alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/d8_4.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/d8_5.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/d8_6.svg\"  alt=\"6\" width=\"25\"/>", //6
	"<img src=\"./img/d8_7.svg\"  alt=\"7\" width=\"25\"/>", //7
	"<img src=\"./img/d8_8.svg\"  alt=\"8\" width=\"25\"/>"];//8

function rollDice(num_die1, num_die2) {
	var subtotal, total, i, result;
	var is_d8;
	var tmp = "" // minimize updates in browser
	total = 0;   // cumulative dice values
	subtotal = 0; // each set's value
	if(num_die1 <= 0 || num_die2 < 0) { // second set may be zero
		document.getElementById("results").innerHTML = "<p>You must roll at least one die.</p>";
		return;
	}
	if(num_die1 > 1000 || num_die2 > 1000) {
		document.getElementById("results").innerHTML = "<p>That is too many dice!</p>";
		return;
	}
	// roll the first set
	for (i = 0; i < num_die1; i++) {
		if(document.getElementById("sixside1").checked) {
			result = roll(1,7);
			is_d8 = false;
		} else if(document.getElementById("threeside1").checked) {
			result = roll(0,3);
			is_d8 = false;
		} else if(document.getElementById("eightside1").checked) {
			result = roll(1,9);
			is_d8 = true;
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		subtotal += result;
		if(0 == i%8) { // wrap every 8 dice
			tmp += "<br/>";
		}
		if(is_d8 == true) {
			tmp += d8_poss_results[result-1];
		} else {
			tmp += reg_poss_results[result];
		}
		if(i != num_die1 - 1) { // comma separate
			tmp  += ", ";	
		}
	}
	if(num_die2 > 0) { //only print if 2 sets rolled
		tmp += "<br/><b>Set 1 Total: " + subtotal + "</b>";
	}
	// accumulate
	total = subtotal;
	// roll the second set
	subtotal = 0; // reset
	for (i = 0; i < num_die2; i++) {
		if(document.getElementById("sixside2").checked) {
			result = roll(1,7);
			is_d8 = false;
		} else if(document.getElementById("threeside2").checked) {
			result = roll(0,3);
			is_d8 = false;
		} else if(document.getElementById("eightside2").checked) {
			result = roll(1,9);
			is_d8 = true;
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		subtotal += result;
		if(0 == i%8) { // wrap every 8 dice
			tmp += "<br/>";
		}
		if(is_d8 == true) {
			tmp += d8_poss_results[result-1];
		} else {
			tmp += reg_poss_results[result];
		}
		if(i != num_die2 - 1) { // comma separate
			tmp  += ", ";	
		}
	}
	if(num_die2 > 0) { //only print if 2 sets rolled
		tmp += "<br/><b>Set 2 Total: " + subtotal + "</b>";
		total += subtotal;
	}
	tmp += "<br/><h3>Grand Total: " + total + "</h3><br/>";
	// write out to web page
	document.getElementById("results").innerHTML = tmp;
}

function roll(lo, hi) { // hi bound not inclusive
	return Math.floor(Math.random() * (hi-lo) + lo);
}
