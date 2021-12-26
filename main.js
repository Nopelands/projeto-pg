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
var legend = document.getElementById("Current Mode")

// TODO buttons
var new_curve_button = document.getElementById("new curve");
var delete_curve_button = document.getElementById("delete curve");
var next_curve_button = document.getElementById("next curve");
var previous_curve_button = document.getElementById("previous curve");
var next_point_button = document.getElementById("next point");
var previous_point_button = document.getElementById("previous point");
var delete_point_button = document.getElementById("delete point");
var add_points_button = document.getElementById("add points");
var move_points_button = document.getElementById("move points");
var default_eva_button = document.getElementById("default eva");
// TODO field
var evaluations_field = document.getElementById("evaluations");
// TODO checkboxes
var curves_checkbox = document.getElementById("show curves");
var polygon_checkbox = document.getElementById("show polygon");
var points_checkbox = document.getElementById("show points");
// TODO listeners
// buttons
new_curve_button.addEventListener("click", function(event)) {
    // do things
}
delete_curve_button.addEventListener("click", function(event)) {
    // do things
}
next_curve_button.addEventListener("click", function(event)) {
    // do things
}
previous_curve_button.addEventListener("click", function(event)) {
    // do things
}
next_point_button.addEventListener("click", function(event)) {
    // do things
}
previous_point_button.addEventListener("click", function(event)) {
    // do things
}
delete_point_button.addEventListener("click", function(event)) {
    // do things
}
add_points_button.addEventListener("click", function(event)) {
    current_mode = 0;
    legend = "Point add tool seleted";
}
move_points_button.addEventListener("click", function(event)) {
    current_mode = 1;
    legend = "Point move tool selected";
}
default_eva_button.addEventListener("click", function(event)) {
    evaluation_granularity = 50;
    // fix field?
}
// other inputs
// canvas


var curves = [];

// TODO state variables
var current_mode = 0; // 0 == adding points, 1 == moving points
var current_selected_curve = 0;
var current_selcted_point = 0;
var show_curves = true;
var show_polygon = true;
var show_points = true;
var evaluation_granularity = 50;

// TODO draw