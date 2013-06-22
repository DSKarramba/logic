/* comparator */

var node = [];
node = node.concat(new X(50, 40), new X(85, 40, 1), new X(100, 40), new X(160, 40));
node = node.concat(new X(50, 130), new X(75, 130, 1), new X(100, 130), new X(160, 130));
node = node.concat(new X(85, 100, 1), new X(75, 70, 1), new X(190, 100), new X(190, 70));
node = node.concat(new X(190, 40), new X(190, 130), new X(250, 55), new X(250, 115));
node = node.concat(new X(270, 55, 1), new X(270, 115, 1), new X(270, 70, 1), new X(270, 100, 1));
node = node.concat(new X(300, 70), new X(300, 100), new X(360, 85), new X(380, 85));
node = node.concat(new X(270, 40, 1), new X(270, 130, 1), new X(470, 40), new X(470, 130));
node = node.concat(new X(440, 85), new X(470, 85));

var cmprIN = [false, false];
function comparator(/* arrays */ el, wire, inputs) {
    el.push(new INPUT(node[0], inputs[0]));
    el.push(new TEXT(25, 40, 'A'));
    wire.push(new WIRE(node[0], node[1]));
    wire.push(new WIRE(node[1], node[2]));
    el.push(new NOT(node[2], node[3]));
    el.push(new INPUT(node[4], inputs[1]));
    el.push(new TEXT(25, 130, 'B'));
    wire.push(new WIRE(node[4], node[5]));
    wire.push(new WIRE(node[5], node[6]));
    el.push(new NOT(node[6], node[7]));
    
    wire.push(new WIRE(node[1], node[8]));
    wire.push(new WIRE(node[8], node[10]));
    wire.push(new WIRE(node[5], node[9]));
    wire.push(new WIRE(node[9], node[11]));
    wire.push(new WIRE(node[3], node[12]));
    wire.push(new WIRE(node[7], node[13]));
    el.push(new AND(node[12], node[11], node[14]));
    el.push(new AND(node[10], node[13], node[15]));
    
    wire.push(new WIRE(node[14], node[16]));
    wire.push(new WIRE(node[16], node[18]));
    wire.push(new WIRE(node[18], node[20]));
    wire.push(new WIRE(node[15], node[17]));
    wire.push(new WIRE(node[17], node[19]));
    wire.push(new WIRE(node[19], node[21]));
    el.push(new OR(node[20], node[21], node[22]));
    wire.push(new WIRE(node[22], node[23]));
    el.push(new NOT(node[23], node[28]));
    wire.push(new WIRE(node[28], node[29]));
    
    wire.push(new WIRE(node[16], node[24]));
    wire.push(new WIRE(node[24], node[26]));
    wire.push(new WIRE(node[17], node[25]));
    wire.push(new WIRE(node[25], node[27]));
    el.push(new OUTPUT(node[26]));
    el.push(new TEXT(490, 40, 'B > A'));
    el.push(new OUTPUT(node[27]));
    el.push(new TEXT(490, 130, 'A > B'));
    el.push(new OUTPUT(node[29]));
    el.push(new TEXT(490, 85, 'A = B'));
    
}

function reload() {
    var wire = []; var el = [];

    comparator(el, wire, cmprIN);
    cmprIN[0] = !cmprIN[0];
    if (!cmprIN[0]) cmprIN[1] = !cmprIN[1];
    
    clear();
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    setTimeout("reload()", 1500);
}

reload();
