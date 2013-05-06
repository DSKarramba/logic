node = [];
node = node.concat(new X(280, 215), new X(280, 195, 1), new X(170, 40), new X(75, 100, 1));
node = node.concat(new X(85, 100), new X(145, 100), new X(170, 100), new X(145, 175));
node = node.concat(new X(160, 135, 1), new X(160, 70, 1), new X(170, 70), new X(230, 70));
node = node.concat(new X(245, 70, 1), new X(245, 100, 1), new X(245, 40, 1), new X(340, 40));
node = node.concat(new X(255, 100), new X(315, 100), new X(340, 100), new X(330, 135, 1));
node = node.concat(new X(330, 70, 1), new X(340, 70), new X(400, 70), new X(415, 70, 1));
node = node.concat(new X(415, 100, 1), new X(415, 40, 1), new X(510, 40), new X(425, 100));
node = node.concat(new X(485, 100), new X(510, 100), new X(500, 135, 1), new X(500, 70, 1));
node = node.concat(new X(510, 70), new X(570, 70), new X(585, 70, 1), new X(585, 100, 1));
node = node.concat(new X(585, 40, 1), new X(680, 40), new X(595, 100), new X(655, 100));
node = node.concat(new X(680, 100), new X(670, 135, 1), new X(670, 70, 1), new X(680, 70));
node = node.concat(new X(740, 70), new X(245, 215), new X(415, 150, 1), new X(220, 150, 1));
node = node.concat(new X(220, 215), new X(585, 165, 1), new X(195, 165, 1), new X(195, 215));
node = node.concat(new X(755, 70, 1), new X(755, 180, 1), new X(170, 180, 1), new X(170, 215));
node = node.concat(new X(75, 195, 1), new X(75, 40, 1), new X(145, 135, 1));

var regIN = [true, false, false, false, false, false];
function register4bit(/* arrays */ el, wire, inputs) {
    // C
    el.push(new INPUT(node[7], inputs[1]));
    wire.push(new WIRE(node[7], node[58]));
    wire.push(new WIRE(node[58], node[8]));
    wire.push(new WIRE(node[8], node[9]));
    wire.push(new WIRE(node[9], node[10]));
    wire.push(new WIRE(node[8], node[19]));
    wire.push(new WIRE(node[19], node[20]));
    wire.push(new WIRE(node[20], node[21]));
    wire.push(new WIRE(node[19], node[30]));
    wire.push(new WIRE(node[30], node[31]));
    wire.push(new WIRE(node[31], node[32]));
    wire.push(new WIRE(node[30], node[41]));
    wire.push(new WIRE(node[41], node[42]));
    wire.push(new WIRE(node[42], node[43]));
    // J, K #1
    el.push(new INPUT(node[0], inputs[0]));
    wire.push(new WIRE(node[0], node[1]));
    wire.push(new WIRE(node[1], node[56]));
    wire.push(new WIRE(node[56], node[3]));
    wire.push(new WIRE(node[3], node[4]));
    wire.push(new WIRE(node[3], node[57]));
    wire.push(new WIRE(node[57], node[2]));
    el.push(new NOT(node[4], node[5]));
    wire.push(new WIRE(node[5], node[6]));
    // JK flip-flops
    el.push(new JK(node[2], node[6], node[10], node[11], inputs[2]));
    el.push(new JK(node[15], node[18], node[21], node[22], inputs[3]));
    el.push(new JK(node[26], node[29], node[32], node[33], inputs[4]));
    el.push(new JK(node[37], node[40], node[43], node[44], inputs[5]));
    // J, K #2
    wire.push(new WIRE(node[11], node[12]));
    wire.push(new WIRE(node[12], node[14]));
    wire.push(new WIRE(node[14], node[15]));
    wire.push(new WIRE(node[12], node[13]));
    wire.push(new WIRE(node[13], node[16]));
    el.push(new NOT(node[16], node[17]));
    wire.push(new WIRE(node[17], node[18]));
    // J, K #3
    wire.push(new WIRE(node[22], node[23]));
    wire.push(new WIRE(node[23], node[25]));
    wire.push(new WIRE(node[25], node[26]));
    wire.push(new WIRE(node[23], node[24]));
    wire.push(new WIRE(node[24], node[27]));
    el.push(new NOT(node[27], node[28]));
    wire.push(new WIRE(node[28], node[29]));
    // J, K #4
    wire.push(new WIRE(node[33], node[34]));
    wire.push(new WIRE(node[34], node[36]));
    wire.push(new WIRE(node[36], node[37]));
    wire.push(new WIRE(node[34], node[35]));
    wire.push(new WIRE(node[35], node[38]));
    el.push(new NOT(node[38], node[39]));
    wire.push(new WIRE(node[39], node[40]));
    // OUT #1
    wire.push(new WIRE(node[13], node[45]));
    el.push(new OUTPUT(node[45]));
    // OUT #2
    wire.push(new WIRE(node[24], node[46]));
    wire.push(new WIRE(node[46], node[47]));
    wire.push(new WIRE(node[47], node[48]));
    el.push(new OUTPUT(node[48]));
    // OUT #3
    wire.push(new WIRE(node[35], node[49]));
    wire.push(new WIRE(node[49], node[50]));
    wire.push(new WIRE(node[50], node[51]));
    el.push(new OUTPUT(node[51]));
    // OUT #4
    wire.push(new WIRE(node[44], node[52]));
    wire.push(new WIRE(node[52], node[53]));
    wire.push(new WIRE(node[53], node[54]));
    wire.push(new WIRE(node[54], node[55]));
    el.push(new OUTPUT(node[55]));
    out = [node[11].state, node[22].state, node[33].state, node[44].state];
    return out;
}

function reload() {
    var wire = []; var el = [];

    var datagot = [];
    datagot = register4bit(el, wire, regIN);
    regIN[1] = !regIN[1];
    if (!regIN[1]) regIN[0] = Math.random() * 10 < 5;
    for (i = 0; i < 4; i++) regIN[i + 2] = datagot[i];
    
    clear();
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    outoftime = setTimeout("reload()", 1000);
}

reload();