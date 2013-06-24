/* 4 bit register based on JK flip-flops */
var register_canvas = document.getElementById('register').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
register_canvas.font = '11pt PT Sans';
register_canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};


var regIN = [true, false, false, false, false, false];
function register4bit(/* arrays */node, el, wire, inputs) {
    node = [];
    node = node.concat(new X(register_canvas, 280, 215), new X(register_canvas, 280, 195, 1), new X(register_canvas, 170, 40), new X(register_canvas, 75, 100, 1));
    node = node.concat(new X(register_canvas, 85, 100), new X(register_canvas, 145, 100), new X(register_canvas, 170, 100), new X(register_canvas, 145, 175));
    node = node.concat(new X(register_canvas, 160, 135, 1), new X(register_canvas, 160, 70, 1), new X(register_canvas, 170, 70), new X(register_canvas, 230, 70));
    node = node.concat(new X(register_canvas, 245, 70, 1), new X(register_canvas, 245, 100, 1), new X(register_canvas, 245, 40, 1), new X(register_canvas, 340, 40));
    node = node.concat(new X(register_canvas, 255, 100), new X(register_canvas, 315, 100), new X(register_canvas, 340, 100), new X(register_canvas, 330, 135, 1));
    node = node.concat(new X(register_canvas, 330, 70, 1), new X(register_canvas, 340, 70), new X(register_canvas, 400, 70), new X(register_canvas, 415, 70, 1));
    node = node.concat(new X(register_canvas, 415, 100, 1), new X(register_canvas, 415, 40, 1), new X(register_canvas, 510, 40), new X(register_canvas, 425, 100));
    node = node.concat(new X(register_canvas, 485, 100), new X(register_canvas, 510, 100), new X(register_canvas, 500, 135, 1), new X(register_canvas, 500, 70, 1));
    node = node.concat(new X(register_canvas, 510, 70), new X(register_canvas, 570, 70), new X(register_canvas, 585, 70, 1), new X(register_canvas, 585, 100, 1));
    node = node.concat(new X(register_canvas, 585, 40, 1), new X(register_canvas, 680, 40), new X(register_canvas, 595, 100), new X(register_canvas, 655, 100));
    node = node.concat(new X(register_canvas, 680, 100), new X(register_canvas, 670, 135, 1), new X(register_canvas, 670, 70, 1), new X(register_canvas, 680, 70));
    node = node.concat(new X(register_canvas, 740, 70), new X(register_canvas, 245, 215), new X(register_canvas, 415, 150, 1), new X(register_canvas, 220, 150, 1));
    node = node.concat(new X(register_canvas, 220, 215), new X(register_canvas, 585, 165, 1), new X(register_canvas, 195, 165, 1), new X(register_canvas, 195, 215));
    node = node.concat(new X(register_canvas, 755, 70, 1), new X(register_canvas, 755, 180, 1), new X(register_canvas, 170, 180, 1), new X(register_canvas, 170, 215));
    node = node.concat(new X(register_canvas, 75, 195, 1), new X(register_canvas, 75, 40, 1), new X(register_canvas, 145, 135, 1));

    el.push(new TEXT(register_canvas, 210, 10, 'Четырехбитный регистр'));
    // C
    el.push(new INPUT(register_canvas, node[7], inputs[1]));
    el.push(new TEXT(register_canvas, 120, 175, 'C'));
    wire.push(new WIRE(register_canvas, node[7], node[58]));
    wire.push(new WIRE(register_canvas, node[58], node[8]));
    wire.push(new WIRE(register_canvas, node[8], node[9]));
    wire.push(new WIRE(register_canvas, node[9], node[10]));
    wire.push(new WIRE(register_canvas, node[8], node[19]));
    wire.push(new WIRE(register_canvas, node[19], node[20]));
    wire.push(new WIRE(register_canvas, node[20], node[21]));
    wire.push(new WIRE(register_canvas, node[19], node[30]));
    wire.push(new WIRE(register_canvas, node[30], node[31]));
    wire.push(new WIRE(register_canvas, node[31], node[32]));
    wire.push(new WIRE(register_canvas, node[30], node[41]));
    wire.push(new WIRE(register_canvas, node[41], node[42]));
    wire.push(new WIRE(register_canvas, node[42], node[43]));
    // J, K #1
    el.push(new INPUT(register_canvas, node[0], inputs[0]));
    el.push(new TEXT(register_canvas, 300, 215, 'IN'));
    wire.push(new WIRE(register_canvas, node[0], node[1]));
    wire.push(new WIRE(register_canvas, node[1], node[56]));
    wire.push(new WIRE(register_canvas, node[56], node[3]));
    wire.push(new WIRE(register_canvas, node[3], node[4]));
    wire.push(new WIRE(register_canvas, node[3], node[57]));
    wire.push(new WIRE(register_canvas, node[57], node[2]));
    el.push(new NOT(register_canvas, node[4], node[5]));
    wire.push(new WIRE(register_canvas, node[5], node[6]));
    // JK flip-flops
    el.push(new JK(register_canvas, node[2], node[6], node[10], node[11], inputs[2]));
    el.push(new JK(register_canvas, node[15], node[18], node[21], node[22], inputs[3]));
    el.push(new JK(register_canvas, node[26], node[29], node[32], node[33], inputs[4]));
    el.push(new JK(register_canvas, node[37], node[40], node[43], node[44], inputs[5]));
    // J, K #2
    wire.push(new WIRE(register_canvas, node[11], node[12]));
    wire.push(new WIRE(register_canvas, node[12], node[14]));
    wire.push(new WIRE(register_canvas, node[14], node[15]));
    wire.push(new WIRE(register_canvas, node[12], node[13]));
    wire.push(new WIRE(register_canvas, node[13], node[16]));
    el.push(new NOT(register_canvas, node[16], node[17]));
    wire.push(new WIRE(register_canvas, node[17], node[18]));
    // J, K #3
    wire.push(new WIRE(register_canvas, node[22], node[23]));
    wire.push(new WIRE(register_canvas, node[23], node[25]));
    wire.push(new WIRE(register_canvas, node[25], node[26]));
    wire.push(new WIRE(register_canvas, node[23], node[24]));
    wire.push(new WIRE(register_canvas, node[24], node[27]));
    el.push(new NOT(register_canvas, node[27], node[28]));
    wire.push(new WIRE(register_canvas, node[28], node[29]));
    // J, K #4
    wire.push(new WIRE(register_canvas, node[33], node[34]));
    wire.push(new WIRE(register_canvas, node[34], node[36]));
    wire.push(new WIRE(register_canvas, node[36], node[37]));
    wire.push(new WIRE(register_canvas, node[34], node[35]));
    wire.push(new WIRE(register_canvas, node[35], node[38]));
    el.push(new NOT(register_canvas, node[38], node[39]));
    wire.push(new WIRE(register_canvas, node[39], node[40]));
    // OUT #1
    wire.push(new WIRE(register_canvas, node[13], node[45]));
    el.push(new OUTPUT(register_canvas, node[45]));
    // OUT #2
    wire.push(new WIRE(register_canvas, node[24], node[46]));
    wire.push(new WIRE(register_canvas, node[46], node[47]));
    wire.push(new WIRE(register_canvas, node[47], node[48]));
    el.push(new OUTPUT(register_canvas, node[48]));
    // OUT #3
    wire.push(new WIRE(register_canvas, node[35], node[49]));
    wire.push(new WIRE(register_canvas, node[49], node[50]));
    wire.push(new WIRE(register_canvas, node[50], node[51]));
    el.push(new OUTPUT(register_canvas, node[51]));
    // OUT #4
    wire.push(new WIRE(register_canvas, node[44], node[52]));
    wire.push(new WIRE(register_canvas, node[52], node[53]));
    wire.push(new WIRE(register_canvas, node[53], node[54]));
    wire.push(new WIRE(register_canvas, node[54], node[55]));
    el.push(new OUTPUT(register_canvas, node[55]));
    el.push(new TEXT(register_canvas, 120, 215, 'OUT'));
    out = [node[11].state, node[22].state, node[33].state, node[44].state];
    return out;
}

function reload_register() {
    var wire = []; var el = []; node = [];

    var datagot = [];
    datagot = register4bit(node, el, wire, regIN);
    regIN[1] = !regIN[1];
    if (!regIN[1]) regIN[0] = Math.random() * 10 < 5;
    for (i = 0; i < 4; i++) regIN[i + 2] = datagot[i];
    
    clear(register_canvas);
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    setTimeout("reload_register()", 1000);
}

reload_register();
