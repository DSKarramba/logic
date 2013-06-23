/* simple examples */
var examples_canvas = document.getElementById('examples').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
examples_canvas.font = '11pt PT Sans';
examples_canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};

/* example 1: "1" and not "1" */

function example1(/* arrays */ node, el, wire, inputs) {
    node = node.concat(/* 0 */ new X(examples_canvas, 50, 40), new X(examples_canvas, 100, 40), new X(examples_canvas, 153, 40), new X(examples_canvas, 210, 40));
    node = node.concat(/* 4 */ new X(examples_canvas, 50, 85), new X(examples_canvas, 170, 85, 1), new X(examples_canvas, 170, 70, 1), new X(examples_canvas, 210, 70));
    node = node.concat(/* 8 */ new X(examples_canvas, 270, 55), new X(examples_canvas, 320, 55));
    el.push(new TEXT(examples_canvas, 155, 15, '"1" и не "1"'));
    el.push(new INPUT(examples_canvas, node[0], inputs[0]));
    wire.push(new WIRE(examples_canvas, node[0], node[1]));
    el.push(new NOT(examples_canvas, node[1], node[2]));
    wire.push(new WIRE(examples_canvas, node[2], node[3]));
    el.push(new INPUT(examples_canvas, node[4], inputs[1]));
    wire.push(new WIRE(examples_canvas, node[4], node[5]));
    wire.push(new WIRE(examples_canvas, node[5], node[6]));
    wire.push(new WIRE(examples_canvas, node[6], node[7]));
    el.push(new AND(examples_canvas, node[3], node[7], node[8]));
    wire.push(new WIRE(examples_canvas, node[8], node[9]));
    el.push(new OUTPUT(examples_canvas, node[9]));
    return node;
}

/* example 2: a + not a */

function example2(first, /* arrays */ node, el, wire, inputs) {
    node = node.concat(/* 10 */ new X(examples_canvas, 50, 200), new X(examples_canvas, 100, 200, 1), new X(examples_canvas, 150, 200), new X(examples_canvas, 203, 200));
    node = node.concat(/* 14 */ new X(examples_canvas, 260, 200), new X(examples_canvas, 100, 245, 1), new X(examples_canvas, 170, 245, 1));
    node = node.concat(/* 17 */ new X(examples_canvas, 170, 230, 1), new X(examples_canvas, 260, 230), new X(examples_canvas, 320, 215), new X(examples_canvas, 370, 215));
    el.push(new TEXT(examples_canvas, 85, 165, 'Сложение сигнала со своим отрицанием'));
    el.push(new INPUT(examples_canvas, node[first], inputs[0]));
    wire.push(new WIRE(examples_canvas, node[first], node[first + 1]));
    wire.push(new WIRE(examples_canvas, node[first + 1], node[first + 2]));
    el.push(new NOT(examples_canvas, node[first + 2], node[first + 3]));
    wire.push(new WIRE(examples_canvas, node[first + 3], node[first + 4]));
    wire.push(new WIRE(examples_canvas, node[first + 1], node[first + 5]));
    wire.push(new WIRE(examples_canvas, node[first + 5], node[first + 6]));
    wire.push(new WIRE(examples_canvas, node[first + 6], node[first + 7]));
    wire.push(new WIRE(examples_canvas, node[first + 7], node[first + 8]));
    el.push(new OR(examples_canvas, node[first + 4], node[first + 8], node[first + 9]));
    wire.push(new WIRE(examples_canvas, node[first + 9], node[first + 10]));
    el.push(new OUTPUT(examples_canvas, node[first + 10]));
    last = first + 10;
    return node;
}

/* example 3: JK flip-flop */

var JKin = [true, false, false, false]; // start levels of input signals

function example3(first, /* arrays */ node, el, wire, inputs) {
    node = node.concat(/* 21 */ new X(examples_canvas, 50, 360), new X(examples_canvas, 150, 360), new X(examples_canvas, 50, 420), new X(examples_canvas, 150, 420));
    node = node.concat(/* 25 */ new X(examples_canvas, 50, 390), new X(examples_canvas, 150, 390), new X(examples_canvas, 210, 390), new X(examples_canvas, 260, 390));

    el.push(new TEXT(examples_canvas, 80, 325, 'JK-триггер'));
    el.push(new INPUT(examples_canvas, node[first], inputs[0])); // J
    wire.push(new WIRE(examples_canvas, node[first], node[first + 1]));
    el.push(new INPUT(examples_canvas, node[first + 2], inputs[1])); // K
    wire.push(new WIRE(examples_canvas, node[first + 2], node[first + 3]));
    el.push(new INPUT(examples_canvas, node[first + 4], inputs[2])); // C
    wire.push(new WIRE(examples_canvas, node[first + 4], node[first + 5]));
    el.push(new JK(examples_canvas, node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new WIRE(examples_canvas, node[first + 6], node[first + 7]));
    el.push(new OUTPUT(examples_canvas, node[first + 7])); // Q
    last = first + 7;
    return node;
}

/* example 4: RS flip-flop */

var RSin = [true, false, false, false]; // start levels of input signals

function example4(first, /* arrays */ node, el, wire, inputs) {
    node = node.concat(/* 29 */ new X(examples_canvas, 350, 360), new X(examples_canvas, 450, 360), new X(examples_canvas, 350, 420), new X(examples_canvas, 450, 420));
    node = node.concat(/* 33 */ new X(examples_canvas, 350, 390), new X(examples_canvas, 450, 390), new X(examples_canvas, 510, 390), new X(examples_canvas, 560, 390));
    el.push(new TEXT(examples_canvas, 380, 325, 'RS-триггер'));
    // alert(first);
    // alert(node.length);
    el.push(new INPUT(examples_canvas, node[first], inputs[0])); // S
    wire.push(new WIRE(examples_canvas, node[first], node[first + 1]));
    el.push(new INPUT(examples_canvas, node[first + 2], inputs[1])); // R
    wire.push(new WIRE(examples_canvas, node[first + 2], node[first + 3]));
    el.push(new INPUT(examples_canvas, node[first + 4], inputs[2])); // C
    wire.push(new WIRE(examples_canvas, node[first + 4], node[first + 5]));
    el.push(new RS(examples_canvas, node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new WIRE(examples_canvas, node[first + 6], node[first + 7]));
    el.push(new OUTPUT(examples_canvas, node[first + 7])); // Q
    last = first + 7;
    return node;
}

/* example 5: Z-state */

var BTRIin = [true, true];
function example5(first, /* arrays */ node, el, wire, inputs) {
    node = node.concat(/* 37 */ new X(examples_canvas, 50, 500), new X(examples_canvas, 50, 530), new X(examples_canvas, 100, 500), new X(examples_canvas, 115, 530));
    node = node.concat(/* 41 */ new X(examples_canvas, 130, 500), new X(examples_canvas, 180, 500));

    el.push(new TEXT(examples_canvas, 20, 470, 'Пример использования Z-состояния'));
    el.push(new INPUT(examples_canvas, node[first], inputs[0]));
    el.push(new INPUT(examples_canvas, node[first + 1], inputs[1]));
    wire.push(new WIRE(examples_canvas, node[first], node[first + 2]));
    wire.push(new WIRE(examples_canvas, node[first + 1], node[first + 3]));
    el.push(new BTRI(examples_canvas, node[first + 2], node[first + 3], node[first + 4]));
    wire.push(new WIRE(examples_canvas, node[first + 4], node[first + 5]));
    el.push(new OUTPUT(examples_canvas, node[first + 5]));
    last = first + 5;
    return node;
}

function reload_examples() {
    var wire = []; var el = []; var node = [];

    node = example1(node, el, wire, [1, 1]); // calling first example, after this we know which
                                        // node was last in example 1.
                                        // Next example should use 'last1 + 1' node as first
    node = example2(node.length, node, el, wire, [1]); // calling second example
    var last = node.length - 1;
    node = example3(node.length, node, el, wire, JKin);// calling third example
    JKin[3] = node[last].state;                //  changing
    JKin[2] = !JKin[2];                         //   levels
    if (JKin[2]) JKin[1] = !JKin[1];            //  of input
    if (JKin[2] && JKin[1]) JKin[0] = !JKin[0]; //   signals
    last = node.length - 1;
    node = example4(node.length, node, el, wire, RSin);
    RSin[3] = node[last].state;
    RSin[2] = !RSin[2];
    if (RSin[2]) RSin[1] = !RSin[1];
    if (RSin[2] && RSin[1]) RSin[0] = !RSin[0];
    if (RSin[0] && RSin[1]) RSin[1] = !RSin[1];
    
    node = example5(node.length, node, el, wire, BTRIin);
    BTRIin[0] = Math.random() * 10 < 5;
    BTRIin[1] = Math.random() * 10 < 5;
    
    /* draw */
    clear(examples_canvas); // clearing examples_canvas
    for (i in wire) { wire[i].draw() }  // drawing all wires below everything else
    for (i in node) { node[i].draw() }  // drawing visible nodes
    for (i in el) { el[i].draw() }      // drawing other elements of scheme

    setTimeout("reload_examples()", 1000); // time to call 'reload();'
}

reload_examples();
