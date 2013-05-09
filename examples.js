/* simple examples */

/* example 1: "1" and not "1" */
node = [];
node = node.concat(/* 0 */ new X(50, 40), new X(100, 40), new X(153, 40), new X(210, 40));
node = node.concat(/* 4 */ new X(50, 85), new X(170, 85, 1), new X(170, 70, 1), new X(210, 70));
node = node.concat(/* 8 */ new X(270, 55), new X(320, 55));

function example1(/* arrays */ el, wire, inputs) {
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
node = node.concat(/* 10 */ new X(50, 200), new X(100, 200, 1), new X(150, 200), new X(203, 200));
node = node.concat(/* 14 */ new X(260, 200), new X(100, 245, 1), new X(170, 245, 1));
node = node.concat(/* 17 */ new X(170, 230, 1), new X(260, 230), new X(320, 215), new X(370, 215));

function example2(first, /* arrays */ el, wire, inputs) {
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
node = node.concat(/* 21 */ new X(50, 360), new X(150, 360), new X(50, 420), new X(150, 420));
node = node.concat(/* 25 */ new X(50, 390), new X(150, 390), new X(210, 390), new X(260, 390));

var JKin = [true, false, false, false]; // start levels of input signals

function example3(first, /* arrays */ el, wire, inputs) {
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
node = node.concat(/* 29 */ new X(350, 360), new X(450, 360), new X(350, 420), new X(450, 420));
node = node.concat(/* 33 */ new X(350, 390), new X(450, 390), new X(510, 390), new X(560, 390));

var RSin = [true, false, false, false]; // start levels of input signals

function example4(first, /* arrays */ el, wire, inputs) {
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
node = node.concat(/* 37 */ new X(50, 500), new X(50, 530), new X(100, 500), new X(115, 530));
node = node.concat(/* 41 */ new X(130, 500), new X(180, 500));

var BTRIin = [true, true];
function example5(first, /* arrays */ el, wire, inputs) {
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
    clear(); // clearing canvas
    for (i in wire) { wire[i].draw() }  // drawing all wires below everything else
    for (i in node) { node[i].draw() }  // drawing visible nodes
    for (i in el) { el[i].draw() }      // drawing other elements of scheme

    setTimeout("reload()", 1000); // time to call 'reload();'
}

reload();
