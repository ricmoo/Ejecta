/*

	INSTRUCTIONS:
	This file must be copied into ./App in order to work

*/
var w = window.innerWidth;
var h = window.innerHeight;
var w2 = w/2;
var h2 = h/2;

var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;

var ctx = canvas.getContext('2d');


var gradient = ctx.createLinearGradient(0, 0, w, 0);
gradient.addColorStop(0.0, "magenta");
gradient.addColorStop(0.166, "blue");
gradient.addColorStop(0.333, "red");
gradient.addColorStop(0.334, "magenta");
gradient.addColorStop(0.5, "blue");
gradient.addColorStop(0.666, "red");
gradient.addColorStop(0.667, "magenta");
gradient.addColorStop(0.833, "blue");
gradient.addColorStop(1.0, "red");

var image = new Image();
image.src = 'flare.png';
var pattern = ctx.createPattern(image, 'repeat');

var lineWidth = 5.0;

function animate() {

    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    /////////////////////////////////////////////////
    // Control: Built-in implementation
    
    var y = 20;
    
    // Make 3 red filled squares
    ctx.fillStyle = "#f00";
    ctx.fillRect(20, y, 90, 90);
    ctx.fillRect((w - 90) / 2, y, 90, 90);
    ctx.fillRect(w - 20 - 90, y, 90, 90);
    
    // Stroke each square with white
    ctx.strokeStyle = "white";
    ctx.lineWidth = lineWidth;
    
    // Square 1
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 5.0;
    ctx.strokeRect(20, y, 90, 90);

    // Square 2
    ctx.lineJoin = 'round';
    ctx.strokeRect((w - 90) / 2, y, 90, 90);
    
    // Square 3
    ctx.lineJoin = 'bevel';
    ctx.strokeRect(w - 20 - 90, y, 90, 90);

    
    /////////////////////////////////////////////////
    // Test: Rectangle with gradient stroke

    y = 150;
    
    ctx.fillStyle = "#0f0";
    ctx.fillRect(20, y, 90, 90);
    ctx.fillRect((w - 90) / 2, y, 90, 90);
    ctx.fillRect(w - 20 - 90, y, 90, 90);
    
    // Stroke each with a gradient
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    
    // Square 1
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 5.0;
    ctx.strokeRect(20, y, 90, 90);
    
    // Square 2
    ctx.lineJoin = 'round';
    ctx.strokeRect((w - 90) / 2, y, 90, 90);
    
    // Square 3
    ctx.lineJoin = 'bevel';
    ctx.strokeRect(w - 20 - 90, y, 90, 90);

    
    /////////////////////////////////////////////////
    // Test: Polyline with gradient stroke

    y = 280;

    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;

    // Polyline 1
    ctx.beginPath();
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'round';
    ctx.miterLimit = 5;

    ctx.moveTo(20, y);
    ctx.lineTo(20 + 90, y + 45);
    ctx.lineTo(20, y + 90);
    ctx.lineTo(20 + 90, y + 90);
    ctx.stroke();

    // Polyline 2
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'square';

    ctx.moveTo(w / 2 - 45, y);
    ctx.lineTo(w / 2 - 45 + 90, y + 45);
    ctx.lineTo(w / 2 - 45, y + 90);
    ctx.lineTo(w / 2 - 45 + 90, y + 90);
    ctx.stroke();

    // Polyline 3
    ctx.beginPath();
    ctx.lineJoin = 'bevel';
    ctx.lineCap = 'butt';
    
    ctx.moveTo(w - 90 - 20, y);
    ctx.lineTo(w - 90 - 20 + 90, y + 45);
    ctx.lineTo(w - 90 - 20, y + 90);
    ctx.lineTo(w - 90 - 20 + 90, y + 90);
    ctx.stroke();

    
    /////////////////////////////////////////////////
    // Test: Tight angle affecting miter limit

    ctx.lineWidth = 5;
    ctx.lineJoin = 'miter';

    var dw = 180 * lineWidth / 30;

    // Built-in color implementation
    y = 400;
    
    ctx.strokeStyle = "white";
    ctx.lineCap = 'round';
    
    ctx.miterLimit = 100;
    ctx.beginPath();
    ctx.moveTo(20 , y);
    ctx.lineTo(20 + dw, y);
    ctx.lineTo(20, y + 20);
    ctx.stroke();

    ctx.miterLimit = 11;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 45, y + 30);
    ctx.lineTo(w / 2 - 45 + dw, y + 30);
    ctx.lineTo(w / 2 - 45, y + 30 + 20);
    ctx.stroke();

    ctx.miterLimit = 2;
    ctx.beginPath();
    ctx.moveTo(w - 110, y + 60);
    ctx.lineTo(w - 110 + dw, y + 60);
    ctx.lineTo(w - 110, y + 60 + 20);
    ctx.stroke();

    // Gradient fill implementation
    y = 450;
    
    ctx.strokeStyle = gradient;
    ctx.lineCap = 'round';
    
    ctx.miterLimit = 100;
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(20 + dw, y);
    ctx.lineTo(20, y + 20);
    ctx.stroke();
    
    ctx.miterLimit = 5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 45, y + 30);
    ctx.lineTo(w / 2 - 45 + dw, y + 30);
    ctx.lineTo(w / 2 - 45, y + 30 + 20);
    ctx.stroke();
    
    ctx.miterLimit = 2;
    ctx.beginPath();
    ctx.moveTo(w - 110, y + 60);
    ctx.lineTo(w - 110 + dw, y + 60);
    ctx.lineTo(w - 110, y + 60 + 20);
    ctx.stroke();

    /////////////////////////////////////////////////
    // Test: Image (and a convex polygon)
    
    y = 550;
    
    ctx.strokeStyle = pattern;
    ctx.lineWidth = lineWidth;
    
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(20 + 90, y);
    ctx.lineTo(20 + 50, y + 45);
    ctx.lineTo(20 + 90, y + 90);
    ctx.lineTo(20, y + 90);
    ctx.closePath();
    ctx.stroke();
    
}

document.addEventListener('touchmove', function( ev ) {
	lineWidth = (ev.touches[0].pageX / w) * 30;
}, false );

animate();

setInterval( animate, 16 );
