/* comparator */
var canvas = document.getElementById('comparator').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
canvas.font = '11pt PT Sans';
canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};


var cmprIN = [false, false];
function comparator(/* arrays */ node, el, wire, inputs) {
    node = node.concat(new X(canvas, 50, 40), new X(canvas, 85, 40, 1), new X(canvas, 100, 40), new X(canvas, 160, 40));
    node = node.concat(new X(canvas, 50, 130), new X(canvas, 75, 130, 1), new X(canvas, 100, 130), new X(canvas, 160, 130));
    node = node.concat(new X(canvas, 85, 100, 1), new X(canvas, 75, 70, 1), new X(canvas, 190, 100), new X(canvas, 190, 70));
    node = node.concat(new X(canvas, 190, 40), new X(canvas, 190, 130), new X(canvas, 250, 55), new X(canvas, 250, 115));
    node = node.concat(new X(canvas, 270, 55, 1), new X(canvas, 270, 115, 1), new X(canvas, 270, 70, 1), new X(canvas, 270, 100, 1));
    node = node.concat(new X(canvas, 300, 70), new X(canvas, 300, 100), new X(canvas, 360, 85), new X(canvas, 380, 85));
    node = node.concat(new X(canvas, 270, 40, 1), new X(canvas, 270, 130, 1), new X(canvas, 470, 40), new X(canvas, 470, 130));
    node = node.concat(new X(canvas, 440, 85), new X(canvas, 470, 85));

    el.push(new INPUT(canvas, node[0], inputs[0]));
    el.push(new TEXT(canvas, 25, 40, 'A'));
    wire.push(new WIRE(canvas, node[0], node[1]));
    wire.push(new WIRE(canvas, node[1], node[2]));
    el.push(new NOT(canvas, node[2], node[3]));
    el.push(new INPUT(canvas, node[4], inputs[1]));
    el.push(new TEXT(canvas, 25, 130, 'B'));
    wire.push(new WIRE(canvas, node[4], node[5]));
    wire.push(new WIRE(canvas, node[5], node[6]));
    el.push(new NOT(canvas, node[6], node[7]));
    
    wire.push(new WIRE(canvas, node[1], node[8]));
    wire.push(new WIRE(canvas, node[8], node[10]));
    wire.push(new WIRE(canvas, node[5], node[9]));
    wire.push(new WIRE(canvas, node[9], node[11]));
    wire.push(new WIRE(canvas, node[3], node[12]));
    wire.push(new WIRE(canvas, node[7], node[13]));
    el.push(new AND(canvas, node[12], node[11], node[14]));
    el.push(new AND(canvas, node[10], node[13], node[15]));
    
    wire.push(new WIRE(canvas, node[14], node[16]));
    wire.push(new WIRE(canvas, node[16], node[18]));
    wire.push(new WIRE(canvas, node[18], node[20]));
    wire.push(new WIRE(canvas, node[15], node[17]));
    wire.push(new WIRE(canvas, node[17], node[19]));
    wire.push(new WIRE(canvas, node[19], node[21]));
    el.push(new OR(canvas, node[20], node[21], node[22]));
    wire.push(new WIRE(canvas, node[22], node[23]));
    el.push(new NOT(canvas, node[23], node[28]));
    wire.push(new WIRE(canvas, node[28], node[29]));
    
    wire.push(new WIRE(canvas, node[16], node[24]));
    wire.push(new WIRE(canvas, node[24], node[26]));
    wire.push(new WIRE(canvas, node[17], node[25]));
    wire.push(new WIRE(canvas, node[25], node[27]));
    el.push(new OUTPUT(canvas, node[26]));
    el.push(new TEXT(canvas, 490, 40, 'B > A'));
    el.push(new OUTPUT(canvas, node[27]));
    el.push(new TEXT(canvas, 490, 130, 'A > B'));
    el.push(new OUTPUT(canvas, node[29]));
    el.push(new TEXT(canvas, 490, 85, 'A = B'));
    
}

function reload() {
    var wire = []; var el = [];
    var node = [];
    comparator(node, el, wire, cmprIN);
    cmprIN[0] = !cmprIN[0];
    if (!cmprIN[0]) cmprIN[1] = !cmprIN[1];
    
    clear(canvas);
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    setTimeout("reload()", 1500);
}

reload();
