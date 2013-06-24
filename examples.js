/* simple examples */

/* example 1: "1" and not "1" */
node = [];
node = node.concat(/* 0 */ new X(45, 135), new X(90, 135), new X(150, 135), new X(210, 135));
node = node.concat(/* 4 */ new X(45, 195), new X(165, 195, 1), new X(165, 165, 1), new X(210, 165));
node = node.concat(/* 8 */ new X(270, 150), new X(315, 150));

function example1(/* arrays */ el, wire, inputs) {
    el.push(new TEXT(160, 90, '"1" и не "1"'));
    el.push(new INPUT(node[0], inputs[0]));
    wire.push(new WIRE(node[0], node[1]));
    el.push(new NOT(node[1], node[2]));
    wire.push(new WIRE(node[2], node[3]));
    el.push(new INPUT(node[4], inputs[1]));
    wire.push(new WIRE(node[4], node[5]));
    wire.push(new WIRE(node[5], node[6]));
    wire.push(new WIRE(node[6], node[7]));
    el.push(new AND(node[3], node[7], node[8]));
    wire.push(new WIRE(node[8], node[9]));
    el.push(new OUTPUT(node[9]));
    last = 9;
    return last;
}

/* example 2: a + not a */
node = node.concat(/* 10 */ new X(450, 135), new X(480, 135, 1), new X(510, 135), new X(570, 135));
node = node.concat(/* 14 */ new X(630, 135), new X(480, 180, 1), new X(570, 180, 1));
node = node.concat(/* 17 */ new X(570, 165, 1), new X(630, 165), new X(690, 150), new X(735, 150));

function example2(first, /* arrays */ el, wire, inputs) {
    el.push(new TEXT(480, 90, 'Сложение сигнала со своим отрицанием'));
    el.push(new INPUT(node[first], inputs[0]));
    wire.push(new WIRE(node[first], node[first + 1]));
    wire.push(new WIRE(node[first + 1], node[first + 2]));
    el.push(new NOT(node[first + 2], node[first + 3]));
    wire.push(new WIRE(node[first + 3], node[first + 4]));
    wire.push(new WIRE(node[first + 1], node[first + 5]));
    wire.push(new WIRE(node[first + 5], node[first + 6]));
    wire.push(new WIRE(node[first + 6], node[first + 7]));
    wire.push(new WIRE(node[first + 7], node[first + 8]));
    el.push(new OR(node[first + 4], node[first + 8], node[first + 9]));
    wire.push(new WIRE(node[first + 9], node[first + 10]));
    el.push(new OUTPUT(node[first + 10]));
    last = first + 10;
    return last;
}

/* example 3: JK flip-flop */
node = node.concat(/* 21 */ new X(45, 300), new X(150, 300), new X(45, 360), new X(150, 360));
node = node.concat(/* 25 */ new X(45, 330), new X(150, 330), new X(210, 330), new X(255, 330));

var JKin = [true, false, false, false]; // start levels of input signals

function example3(first, /* arrays */ el, wire, inputs) {
    el.push(new TEXT(75, 255, 'JK-триггер'));
    el.push(new INPUT(node[first], inputs[0])); // J
    wire.push(new WIRE(node[first], node[first + 1]));
    el.push(new INPUT(node[first + 2], inputs[1])); // K
    wire.push(new WIRE(node[first + 2], node[first + 3]));
    el.push(new INPUT(node[first + 4], inputs[2])); // C
    wire.push(new WIRE(node[first + 4], node[first + 5]));
    el.push(new JK(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new WIRE(node[first + 6], node[first + 7]));
    el.push(new OUTPUT(node[first + 7])); // Q
    last = first + 7;
    return last;
}

/* example 4: RS flip-flop */
node = node.concat(/* 29 */ new X(345, 300), new X(450, 300), new X(345, 360), new X(450, 360));
node = node.concat(/* 33 */ new X(345, 330), new X(450, 330), new X(510, 330), new X(555, 330));

var RSin = [true, false, false, false]; // start levels of input signals

function example4(first, /* arrays */ el, wire, inputs) {
    el.push(new TEXT(375, 255, 'RS-триггер'));
    el.push(new INPUT(node[first], inputs[0])); // S
    wire.push(new WIRE(node[first], node[first + 1]));
    el.push(new INPUT(node[first + 2], inputs[1])); // R
    wire.push(new WIRE(node[first + 2], node[first + 3]));
    el.push(new INPUT(node[first + 4], inputs[2])); // C
    wire.push(new WIRE(node[first + 4], node[first + 5]));
    el.push(new RS(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new WIRE(node[first + 6], node[first + 7]));
    el.push(new OUTPUT(node[first + 7])); // Q
    last = first + 7;
    return last;
}

/* example 5: Z-state */
node = node.concat(/* 37 */ new X(720, 315), new X(720, 345), new X(780, 315), new X(795, 345));
node = node.concat(/* 41 */ new X(810, 315), new X(855, 315));

var BTRIin = [true, true];
function example5(first, /* arrays */ el, wire, inputs) {
    el.push(new TEXT(675, 270, 'Пример использования Z-состояния'));
    el.push(new INPUT(node[first], inputs[0]));
    el.push(new INPUT(node[first + 1], inputs[1]));
    wire.push(new WIRE(node[first], node[first + 2]));
    wire.push(new WIRE(node[first + 1], node[first + 3]));
    el.push(new BTRI(node[first + 2], node[first + 3], node[first + 4]));
    wire.push(new WIRE(node[first + 4], node[first + 5]));
    el.push(new OUTPUT(node[first + 5]));
    last = first + 5;
    return last;
}

function reload() {
    var wire = []; var el = [];

    last1 = example1(el, wire, [1, 1]); // calling first example, after this we know which
                                        // node was last in example 1.
                                        // Next example should use 'last1 + 1' node as first
    
    last2 = example2(last1 + 1, el, wire, [1]); // calling second example

    last3 = example3(last2 + 1, el, wire, JKin);// calling third example
    JKin[3] = node[last3].state;                //  changing
    JKin[2] = !JKin[2];                         //   levels
    if (JKin[2]) JKin[1] = !JKin[1];            //  of input
    if (JKin[2] && JKin[1]) JKin[0] = !JKin[0]; //   signals
    
    last4 = example4(last3 + 1, el, wire, RSin);
    RSin[3] = node[last4].state;
    RSin[2] = !RSin[2];
    if (RSin[2]) RSin[1] = !RSin[1];
    if (RSin[2] && RSin[1]) RSin[0] = !RSin[0];
    if (RSin[0] && RSin[1]) RSin[1] = !RSin[1];
    
    last5 = example5(last + 1, el, wire, BTRIin);
    BTRIin[0] = Math.random() * 10 < 5;
    BTRIin[1] = Math.random() * 10 < 5;
    
    /* draw */
    if (arguments[0]) createGrid(15);
    clear(dynamic); // clearing canvas
    for (i in wire) { wire[i].draw(dynamic) }  // drawing all wires below everything else
    for (i in node) { node[i].draw(dynamic) }  // drawing visible nodes
    for (i in el) {
        if (el[i].type == 'dynamic')
            el[i].draw(dynamic);
        else if (arguments[0])
            el[i].draw(static);
    } // drawing other elements of scheme

    setTimeout("reload(false)", 1000); // time to call 'reload();'
}

reload(true);
