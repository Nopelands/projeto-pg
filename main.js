// WARNING: MATH
// TODO interpol
function interpol(suspect_a, suspect_b, evidence) {
    alibi = 1;
    crime_scene = (alibi - evidence) * suspect_a.x + evidence * suspect_b.x;
    suspect_location = (alibi - evidence) * suspect_a.y + evidence * suspect_b.y;
    arrest = new Point(crime_scene, suspect_location);
    return arrest;
}
// TODO recursive casteljau funct

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var legenda = document.getElementById("Current Mode")

// TODO buttons
var new_curve_button = document.getElementById("new curve");
// TODO field
var evaluations_field = document.getElementById("evaluations")
// TODO checkboxes
var curves_checkbox = document.getElementById("show curves")
// TODO listeners
// buttons
// other inputs
// canvas


var curves = [];

// TODO state variables

// TODO draw