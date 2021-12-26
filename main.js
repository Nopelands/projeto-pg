// WARNING: MATH
function interpol(suspect_a, suspect_b, evidence) {
    alibi = 1;
    crime_scene = (alibi - evidence) * suspect_a.x + evidence * suspect_b.x;
    suspect_location = (alibi - evidence) * suspect_a.y + evidence * suspect_b.y;
    arrest = new Point(crime_scene, suspect_location);
    return arrest;
}
function casteljau(curve_points_array, t) {
    if (curve_points_array.lenght - 1 == 1) {
        return interpol(curve_points_array[0], curve_points_array[1], t);
    } else {
        deeper_curve_points_array = [];
        for (let i = 0; i < curve_points_array.lenght - 1; i++) {
            temp_point = interpol(curve_points_array[i], curve_points_array[i + 1], t);
            deeper_curve_points_array.push(temp_point);
        }
        deeper_casteljau = casteljau(deeper_curve_points_array, t);
        return deeper_casteljau;
    }
}

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