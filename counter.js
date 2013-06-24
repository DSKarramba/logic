/* 3 bit counter based on JK flip-flops */
var canvas = document.getElementById('counter').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
canvas.font = '11pt PT Sans';
canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};


var counterIN = [true, false, false, false, false];
function counter3bit(/* arrays */ node, el, wire, inputs) {
    node = node.concat(new X(canvas, 50, 40), new X(canvas, 85, 40, 1), new X(canvas, 100, 40), new X(canvas, 85, 100, 1));
    node = node.concat(new X(canvas, 100, 100), new X(canvas, 50, 70), new X(canvas, 70, 70, 1), new X(canvas, 160, 70));
    node = node.concat(new X(canvas, 175, 70, 1), new X(canvas, 175, 40, 1), new X(canvas, 210, 40), new X(canvas, 175, 100, 1));
    node = node.concat(new X(canvas, 210, 100), new X(canvas, 100, 70), new X(canvas, 70, 135, 1), new X(canvas, 190, 135, 1));
    node = node.concat(new X(canvas, 190, 70, 1), new X(canvas, 210, 70), new X(canvas, 270, 70), new X(canvas, 285, 70, 1));
    node = node.concat(new X(canvas, 175, 150, 1), new X(canvas, 175, 200), new X(canvas, 285, 165, 1), new X(canvas, 150, 165, 1));
    node = node.concat(new X(canvas, 150, 200), new X(canvas, 310, 70), new X(canvas, 295, 150, 1), new X(canvas, 295, 100, 1));
    node = node.concat(new X(canvas, 310, 100), new X(canvas, 370, 85), new X(canvas, 380, 85, 1), new X(canvas, 395, 135, 1));
    node = node.concat(new X(canvas, 395, 70, 1), new X(canvas, 410, 70), new X(canvas, 380, 100, 1), new X(canvas, 410, 100));
    node = node.concat(new X(canvas, 380, 40, 1), new X(canvas, 410, 40), new X(canvas, 470, 70), new X(canvas, 485, 70, 1));
    node = node.concat(new X(canvas, 485, 180, 1), new X(canvas, 125, 180, 1), new X(canvas, 125, 200));

    el.push(new TEXT(canvas, 275, 10, 'Трехбитный счетчик'));
    // J, K #1
    el.push(new INPUT(canvas, node[0], inputs[0]));
    el.push(new TEXT(canvas, 20, 40, '"1"'));
    wire.push(new WIRE(canvas, node[0], node[1]));
    wire.push(new WIRE(canvas, node[1], node[2]));
    wire.push(new WIRE(canvas, node[1], node[3]));
    wire.push(new WIRE(canvas, node[3], node[4]));
    // C
    el.push(new INPUT(canvas, node[5], inputs[1]));
    el.push(new TEXT(canvas, 25, 70, 'C'));
    wire.push(new WIRE(canvas, node[5], node[6]));
    wire.push(new WIRE(canvas, node[6], node[13]));
    wire.push(new WIRE(canvas, node[6], node[14]));
    wire.push(new WIRE(canvas, node[14], node[15]));
    wire.push(new WIRE(canvas, node[15], node[16]));
    wire.push(new WIRE(canvas, node[16], node[17]));
    wire.push(new WIRE(canvas, node[15], node[31]));
    wire.push(new WIRE(canvas, node[31], node[32]));
    wire.push(new WIRE(canvas, node[32], node[33]));
    // flip-flops
    el.push(new JK(canvas, node[2], node[4], node[13], node[7], inputs[2]));
    el.push(new JK(canvas, node[10], node[12], node[17], node[18], inputs[3]));
    el.push(new JK(canvas, node[37], node[35], node[33], node[38], inputs[4]));
    // J, K #2
    wire.push(new WIRE(canvas, node[7], node[8]));
    wire.push(new WIRE(canvas, node[8], node[9]));
    wire.push(new WIRE(canvas, node[9], node[10]));
    wire.push(new WIRE(canvas, node[8], node[11]));
    wire.push(new WIRE(canvas, node[11], node[12]));
    // OUT #1
    wire.push(new WIRE(canvas, node[11], node[20]));
    wire.push(new WIRE(canvas, node[20], node[21]));
    el.push(new OUTPUT(canvas, node[21]));
    // OUT #2
    wire.push(new WIRE(canvas, node[18], node[19]));
    wire.push(new WIRE(canvas, node[19], node[22]));
    wire.push(new WIRE(canvas, node[22], node[23]));
    wire.push(new WIRE(canvas, node[23], node[24]));
    el.push(new OUTPUT(canvas, node[24]));
    // J, K #3
    wire.push(new WIRE(canvas, node[19], node[25]));
    wire.push(new WIRE(canvas, node[20], node[26]));
    wire.push(new WIRE(canvas, node[26], node[27]));
    wire.push(new WIRE(canvas, node[27], node[28]));
    el.push(new AND(canvas, node[25], node[28], node[29]));
    wire.push(new WIRE(canvas, node[29], node[30]));
    wire.push(new WIRE(canvas, node[30], node[34]));
    wire.push(new WIRE(canvas, node[34], node[35]));
    wire.push(new WIRE(canvas, node[30], node[36]));
    wire.push(new WIRE(canvas, node[36], node[37]));
    // OUT #3
    wire.push(new WIRE(canvas, node[38], node[39]));
    wire.push(new WIRE(canvas, node[39], node[40]));
    wire.push(new WIRE(canvas, node[40], node[41]));
    wire.push(new WIRE(canvas, node[41], node[42]));
    el.push(new OUTPUT(canvas, node[42]));
    el.push(new TEXT(canvas, 80, 200, 'OUT'));
    
    dataout = [node[7].state, node[18].state, node[38].state];
    return dataout;
}

function reload() {
    var wire = []; var el = [];
    var node = [];

    var datagot = [];
    datagot = counter3bit(node, el, wire, counterIN);
    counterIN[1] = !counterIN[1];
    counterIN[2] = datagot[0];    
    counterIN[3] = datagot[1];    
    counterIN[4] = datagot[2];
    
    clear(canvas);
    for (i in wire) { wire[i].draw() }
    for (i in node) { node[i].draw() }
    for (i in el) { el[i].draw() }

    setTimeout("reload()", 500);
}

reload();
