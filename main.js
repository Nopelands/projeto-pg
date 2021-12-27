// WARNING: MATH
function interpol(suspect_a, suspect_b, evidence) {
    alibi = 1;
    crime_scene = (alibi - evidence) * suspect_a.x + evidence * suspect_b.x; // interpolation for x
    suspect_location = (alibi - evidence) * suspect_a.y + evidence * suspect_b.y; // inteprolation for y
    arrest = new Point(crime_scene, suspect_location);
    return arrest;
}
function casteljau(curve_points_array, t) {
    if (curve_points_array.length - 1 == 1) {
        return interpol(curve_points_array[0], curve_points_array[1], t);
    } else {
        deeper_curve_points_array = [];
        for (let i = 0; i < curve_points_array.length - 1; i++) {
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

// buttons
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
// field
var evaluations_field = document.getElementById("evaluations");
// checkboxes
var curves_checkbox = document.getElementById("show curves");
var polygon_checkbox = document.getElementById("show polygon");
var points_checkbox = document.getElementById("show points");

// listeners
// buttons
new_curve_button.addEventListener("click", function(event) {
    if (curves.length == 0) {
        curves.push([]);
    }
    if(current_selected_curve == -1 || (curves[current_selected_curve].length > 1)) {
        current_mode = 0;
        legend.innerText = "Point add tool selected"
        var new_curve = [];
        curves.push(new_curve);
        current_selected_point = 0;
        current_selected_curve = curves.length - 1; // 0????
    } else {
        legend.innerText = "Current curve must have at least 2 points";
    }
});
delete_curve_button.addEventListener("click", function(event) {
    if (curves.length > 0) {
        curves.splice(current_selected_curve, 1);
        current_selected_point = 0;
        if (current_selected_curve > 0) {
            current_selected_curve--;
        } else {
            curves = [];
        }
        draw_screen();
    } else {
        return;
    }
});
previous_curve_button.addEventListener("click", function(event) {
    if (current_selected_curve > 0) {
        current_selected_curve--;
        current_selected_point = 0;
        draw_screen();
    } else {
        return;
    }
});
next_curve_button.addEventListener("click", function(event) {
    if (current_selected_curve < curves.length - 1  ) {
        current_selected_curve++;
        current_selected_point = 0;
        draw_screen();
    }
});
next_point_button.addEventListener("click", function(event) {
    if (current_selected_point < curves[current_selected_curve].length - 1) {
        current_selected_point++;
        draw_screen();
    } else {
        return;
    }
});
previous_point_button.addEventListener("click", function(event) {
    if (current_selected_point > 0) {
        current_selected_point--;
        draw_screen();
    } else {
        return;
    }
});
delete_point_button.addEventListener("click", function(event) {
    console.log("aqui");
    if (curves[current_selected_curve].length > 0) {
        curves[current_selected_curve].splice(current_selected_point, 1);
        current_selected_point = 0;
        if (curves[current_selected_curve].length == 0) {
            curves.splice(current_selected_curve, 1);
            current_selected_point = 0;
            if (current_selected_curve > 0) {
                current_selected_curve --;
            }
        }
        draw_screen();
    } else {
        return;
    }
});
add_points_button.addEventListener("click", function(event) {
    current_mode = 0;
    legend.innerText = "Point add tool selected";
});
move_points_button.addEventListener("click", function(event) {
    current_mode = 1;
    legend.innerText = "Point move tool selected";
});
default_eva_button.addEventListener("click", function(event) {
    evaluation_granularity = 100;
    draw_screen();
    // fix field?
});
// other inputs
curves_checkbox.addEventListener("click", function(event) {
    show_curves = !show_curves;
    draw_screen();
});
polygon_checkbox.addEventListener("click", function(event) {
    show_polygon = !show_polygon;
    draw_screen();
});
points_checkbox.addEventListener("click", function(event) {
    show_points = !show_points;
    draw_screen();
});
evaluations_field.addEventListener("keyup", function(event) {
    var user_input = event.target.value;
    evaluation_granularity = parseInt(user_input);
    draw_screen();
});
// canvas
canvas.addEventListener("mousedown", function(event) {
    mouse_held_down = true;
    var temp_point_canvas = new Point(event.offsetX, event.offsetY);
    if(current_mode == 0) {
        curves[current_selected_curve].push(temp_point_canvas);
    } else if(current_mode == 1) {
        curves[current_selected_curve].splice(current_selected_point,1,temp_point_canvas);
    }
    draw_screen();
});
canvas.addEventListener("mousemove", function(event) {
    if(mouse_held_down) {
        var temp_point_canvas = new Point(event.offsetX, event.offsetY);
        if (current_mode == 0) {
            curves[current_selected_curve].splice(curves[current_selected_curve].length-1,1,temp_point_canvas);
        }
        else if (current_mode == 1){
            curves[current_selected_curve].splice(current_selected_point,1,temp_point_canvas);
        }
        draw_screen();
    }
});
canvas.addEventListener("mouseup", function(event) {
    mouse_held_down = false;
    draw_screen();
});


var curves = [];

// TODO state variables
var current_mode = -1; // 0 == adding points, 1 == moving points
var current_selected_curve = -1;
var current_selected_point = 0;
var show_curves = true;
var show_polygon = true;
var show_points = true;
var evaluation_granularity = 100;
var mouse_held_down = false;

function draw_point(point) {
    context.beginPath();
    context.arc(point.x, point.y, 4, 0, 2 * Math.PI)
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
    for(let i = 0; i < points_array.length - 1; i++) {
        draw_line(points_array[i], points_array[i + 1]);
    }
}

function draw_curve(curve) {
    if(curve.length > 2) {
        var evaluation_points = [];
        evaluation_points.push(curve[0]);
        for(let i = 1; i < evaluation_granularity - 2; i++) {
            evaluation_points.push(casteljau(curve, i / evaluation_granularity));
        }
        evaluation_points.push(curve[curve.length - 1]);
        draw_polygon(evaluation_points);
    }
}

function draw_screen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(show_curves && evaluation_granularity > 1) {
        for (let i = 0; i < curves.length; i++) {
            if (current_selected_curve == i) {
                context.strokeStyle = "red";
            } else {
                context.strokeStyle = "blue";
            }
            draw_curve(curves[i]);
        }
    }
    if(show_polygon) {
        for (let i = 0; i < curves.length; i++) {
            if (current_selected_curve == i) {
                context.strokeStyle = "green";
            } else {
                context.strokeStyle = "orange";
            }
            draw_polygon(curves[i]);
        }
    }
    if(show_points) {
        for(i = 0; i < curves.length; i++) {
            for(let j = 0; j < curves[i].length; j++) {
                if((i == current_selected_curve) && (j == current_selected_point)) {
                    context.strokeStyle = "purple";
                } else {
                    context.strokeStyle = "black";
                }
                draw_point(curves[i][j]);
            }
        }
    }
}