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
new_curve_button.addEventListener("click", function(event) {
    // do things
});
delete_curve_button.addEventListener("click", function(event) {
    // do things
});
next_curve_button.addEventListener("click", function(event) {
    // do things
});
previous_curve_button.addEventListener("click", function(event) {
    // do things
});
next_point_button.addEventListener("click", function(event) {
    // do things
});
previous_point_button.addEventListener("click", function(event) {
    // do things
});
delete_point_button.addEventListener("click", function(event) {
    // do things
});
add_points_button.addEventListener("click", function(event) {
    current_mode = 0;
    legend = "Point add tool seleted";
});
move_points_button.addEventListener("click", function(event) {
    current_mode = 1;
    legend = "Point move tool selected";
});
default_eva_button.addEventListener("click", function(event) {
    evaluation_granularity = 100;
    // fix field?
});
// other inputs
curves_checkbox.addEventListener("click", function(event) {
    show_curves = !show_curves;
});
polygon_checkbox.addEventListener("click", function(event) {
    show_polygon = !show_polygon;
});
points_checkbox.addEventListener("click", function(event) {
    show_points = !show_points;
});
evaluations_field.addEventListener("keyup", function(event) {
    var user_input = event.target.value;
    evaluation_granularity = parseInt(user_input);
    // aaaa
});
// canvas
canvas.addEventListener("mousedown", function(event) {
    mouse_held_down = true;
    var temp_point_canvas = new Point(event.offsetX, event.offsetY);
    if(current_mode == 0) {
        // add point
    } else if(current_mode == 1) {
        // move point
    }
});
canvas.addEventListener("mousemove", function(event) {
    if(mouse_held_down) {
        var temp_point_canvas = new Point(event.offsetX, event.offsetY);
        if (current_mode == 1) {
            // move point
        }
    }
});
canvas.addEventListener("mouseup", function(event) {
    mouse_held_down = false;
});


var curves = [];

// TODO state variables
var current_mode = 0; // 0 == adding points, 1 == moving points
var current_selected_curve = 0;
var current_selected_point = 0;
var show_curves = true;
var show_polygon = true;
var show_points = true;
var evaluation_granularity = 100;
var mouse_held_down = false;

// TODO draw
function draw_point(point) {
    context.beginPath();
    context.arc(point.x, point.y, 4.0, 0, 2 * Math.PI)
    context.stroke();
}

function draw_line(point_a, point_b) {
    context.beginPath();
    context.lineTo(point_a.x, point_a.y);
    context.lineTo(point_b.x, point_b.y);
    context.strokeStyle = "5px";
    context.stroke();
}

function draw_polygon(points_array) {
    for(let i = 0; i < points_array.lenght - 1; i++) {
        draw_line(points_array[i], points_array[i + 1]);
    }
}

function draw_curve(curve) {
    if(curve.lenght > 2) {
        var evaluation_points = [];
        evaluation_points.push(curve[0]);
        for(let i = 1; i < evaluation_granularity - 2; i++) {
            evaluation_points.push(casteljau(curva, i / evaluation_granularity));
        }
        evaluation_points.push(curve[curve.lenght - 1]);
        draw_polygon(evaluation_points);
    }
}

function draw_screen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(show_curves && evaluation_granularity > 1) {
        for (let i = 0; i < curves.length; i++) {
            if (current_selected_curve == i) {
                context.strokeStyle = "";
            } else {
                context.strokeStyle = "";
            }
            draw_curve(curves[i]);
        }
    }
    if(show_polygon) {
        for (let i = 0; i < curves.length; i++) {
            if (current_selected_curve == i) {
                context.strokeStyle = "";
            } else {
                context.strokeStyle = "";
            }
            draw_polygon(curves[i]);
        }
    }
    if(show_points) {
        for(let i = 0; i < curves.lenght; i++) {
            for(let j = 0; j < curvas[i].lenght; j++) {
                if((i = current_selected_curve) && (j = current_selected_point)) {
                    context.strokeStyle = "";
                } else {
                    context.strokeStyle = "";
                }
                draw_point(curves[i][j]);
            }
        }
    }
}