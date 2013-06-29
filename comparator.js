/* comparator */
var node = [];
node = node.concat(new X(150, 40), new X(185, 40, 1), new X(200, 40), new X(260, 40));
node = node.concat(new X(150, 130), new X(175, 130, 1), new X(200, 130), new X(260, 130));
node = node.concat(new X(185, 100, 1), new X(175, 70, 1), new X(290, 100), new X(290, 70));
node = node.concat(new X(290, 40), new X(290, 130), new X(350, 55), new X(350, 115));
node = node.concat(new X(370, 55, 1), new X(370, 115, 1), new X(370, 70, 1), new X(370, 100, 1));
node = node.concat(new X(400, 70), new X(400, 100), new X(460, 85), new X(480, 85));
node = node.concat(new X(370, 40, 1), new X(370, 130, 1), new X(570, 40), new X(570, 130));
node = node.concat(new X(540, 85), new X(570, 85));

var dataIN = [false, false];
function cmpr(/* arrays */ el, wire, inputs) {
    el.push(new INPUT(node[0], inputs[0]));
    el.push(new TEXT(120, 30, 'A'));
    wire.push(new WIRE(node[0], node[1]));
    wire.push(new WIRE(node[1], node[2]));
    el.push(new NOT(node[2], node[3]));
    el.push(new INPUT(node[4], inputs[1]));
    el.push(new TEXT(120, 120, 'B'));
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
    el.push(new TEXT(590, 30, 'B > A'));
    el.push(new OUTPUT(node[27]));
    el.push(new TEXT(590, 120, 'A > B'));
    el.push(new OUTPUT(node[29]));
    el.push(new TEXT(590, 75, 'A = B'));
}

function reload() {
    var wire = []; var el = [];
    cmpr(el, wire, dataIN);
    dataIN[0] = !dataIN[0];
    if (!dataIN[0]) dataIN[1] = !dataIN[1];
    
    clear(dynamic);
    for (i in wire) { wire[i].draw(dynamic) }
    for (i in node) { node[i].draw(dynamic) }
    for (i in el) {
        if (el[i].type == 'dynamic')
            el[i].draw(dynamic);
        else if (arguments[0])
            el[i].draw(static);
    }

    setTimeout("reload(false)", 1000);
}

reload(true);

