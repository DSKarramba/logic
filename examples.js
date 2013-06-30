
/* example 1: "1" and not "1" */
var node = [], wire = [], el = [], inp = [], out = [];

function example1(first, inputs) {
    var nodes = [new Node(45, 135), new Node(90, 135),
                 new Node(150, 135), new Node(210, 135),
                 new Node(45, 195), new Node(165, 195, 1),
                 new Node(165, 165, 1), new Node(210, 165),
                 new Node(270, 150), new Node(315, 150)];
    for (i = 0; i < nodes.length; i++) {
        v = node[i + first].visible;
        node[i + first] = nodes[i];
        node[i + first].visible = v;
    }
    el.push(new Text(160, 90, '"1" и не "1"'));
    inp.push(new Input(node[0], inputs[0]));
    wire.push(new Wire(node[0], node[1]));
    el.push(new Not(node[1], node[2]));
    wire.push(new Wire(node[2], node[3]));
    inp.push(new Input(node[4], inputs[1]));
    wire.push(new Wire(node[4], node[5]));
    wire.push(new Wire(node[5], node[6]));
    wire.push(new Wire(node[6], node[7]));
    el.push(new And(node[3], node[7], node[8]));
    wire.push(new Wire(node[8], node[9]));
    out.push(new Output(node[9]));
    return 9;
}

/* example 2: a + not a */
function example2(first, inputs) {
    var nodes = [new Node(450, 135), new Node(480, 135, 1),
                 new Node(510, 135), new Node(570, 135),
                 new Node(630, 135), new Node(480, 180, 1),
                 new Node(570, 180, 1), new Node(570, 165, 1),
                 new Node(630, 165), new Node(690, 150),
                 new Node(735, 150)];
    for (i = 0; i < nodes.length; i++) {
        v = node[i + first].visible;
        node[i + first] = nodes[i];
        node[i + first].visible = v;
    }
    el.push(new Text(480, 90, 'Сложение сигнала со своим отрицанием'));
    inp.push(new Input(node[first], inputs[0]));
    wire.push(new Wire(node[first], node[first + 1]));
    wire.push(new Wire(node[first + 1], node[first + 2]));
    el.push(new Not(node[first + 2], node[first + 3]));
    wire.push(new Wire(node[first + 3], node[first + 4]));
    wire.push(new Wire(node[first + 1], node[first + 5]));
    wire.push(new Wire(node[first + 5], node[first + 6]));
    wire.push(new Wire(node[first + 6], node[first + 7]));
    wire.push(new Wire(node[first + 7], node[first + 8]));
    el.push(new Or(node[first + 4], node[first + 8], node[first + 9]));
    wire.push(new Wire(node[first + 9], node[first + 10]));
    out.push(new Output(node[first + 10]));
    return first + 10;
}

/* example 3: JK flip-flop */
node = node.concat(new Node(45, 300), new Node(150, 300), new Node(45, 360), new Node(150, 360));
node = node.concat(new Node(45, 330), new Node(150, 330), new Node(210, 330), new Node(255, 330));

var JKin = [true, false, false, false]; // start levels of input signals

function example3(first, inputs) {
    el.push(new Text(75, 255, 'JK-триггер'));
    inp.push(new Input(node[first], inputs[0])); // J
    wire.push(new Wire(node[first], node[first + 1]));
    inp.push(new Input(node[first + 2], inputs[1])); // K
    wire.push(new Wire(node[first + 2], node[first + 3]));
    inp.push(new Input(node[first + 4], inputs[2])); // C
    wire.push(new Wire(node[first + 4], node[first + 5]));
    el.push(new JK(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new Wire(node[first + 6], node[first + 7]));
    out.push(new Output(node[first + 7])); // Q
    return first + 7;
}

/* example 4: RS flip-flop */
/*
node = node.concat(new Node(345, 300), new Node(450, 300), new Node(345, 360), new Node(450, 360));
node = node.concat(new Node(345, 330), new Node(450, 330), new Node(510, 330), new Node(555, 330));

var RSin = [true, false, false, false]; // start levels of input signals

function example4(first, inputs) {
    el.push(new Text(375, 255, 'RS-триггер'));
    el.push(new Input(node[first], inputs[0])); // S
    wire.push(new Wire(node[first], node[first + 1]));
    el.push(new Input(node[first + 2], inputs[1])); // R
    wire.push(new Wire(node[first + 2], node[first + 3]));
    el.push(new Input(node[first + 4], inputs[2])); // C
    wire.push(new Wire(node[first + 4], node[first + 5]));
    el.push(new RS(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new Wire(node[first + 6], node[first + 7]));
    el.push(new Output(node[first + 7])); // Q
    last = first + 7;
    return last;
}
*/

/* example 5: Z-state */
/*
node = node.concat(new Node(720, 315), new Node(720, 345), new Node(780, 315), new Node(795, 345));
node = node.concat(new Node(810, 315), new Node(855, 315));

var OIn = [true, true];
function example5(first, inputs) {
    el.push(new Text(675, 270, 'Пример использования Z-состояния'));
    el.push(new Input(node[first], inputs[0]));
    el.push(new Input(node[first + 1], inputs[1]));
    wire.push(new Wire(node[first], node[first + 2]));
    wire.push(new Wire(node[first + 1], node[first + 3]));
    el.push(new Oen(node[first + 2], node[first + 3], node[first + 4]));
    wire.push(new Wire(node[first + 4], node[first + 5]));
    el.push(new Output(node[first + 5]));
    last = first + 5;
    return last;
}
*/

function reload(first_time) {
    var last;
    last = example1(0, [1, 1]); // calling first example, after this we know which
                              // node was last in example 1.
                              // Next example should use 'last + 1' node as first
    
    //last = example2(last + 1, [1]); // calling second example
/*
    last = example3(last + 1, JKin);// calling third example
    JKin[3] = node[last].state.value;           //  changing
    JKin[2] = !JKin[2];                         //   levels
    if (JKin[2]) JKin[1] = !JKin[1];            //  of input
    if (JKin[2] && JKin[1]) JKin[0] = !JKin[0]; //   signals
    console.log(el[1]);
    
    last = example4(last + 1, RSin);
    RSin[3] = node[last].state;
    RSin[2] = !RSin[2];
    if (RSin[2]) RSin[1] = !RSin[1];
    if (RSin[2] && RSin[1]) RSin[0] = !RSin[0];
    if (RSin[0] && RSin[1]) RSin[1] = !RSin[1];
    
    last = example5(last + 1, OIn);
    OIn[0] = Math.random() * 10 < 5;
    if (Oa == 10) {
        OIn[1] = !OIn[1];
        Oa = 0;
    } else { Oa++; }
    
    if (first_time) { Oa = 0; }
    */
    
    calculate(inp, out);
    
    /* draw */
    // if (first_time) { createGrid(15); }
    
    clear(ctd); // clearing canvas
    for (i in wire) { wire[i].draw(); }  // drawing all wires below everything else
    for (i in node) { node[i].draw(); }  // drawing visible nodes
    for (i in inp) { inp[i].draw(); }
    for (i in out) { out[i].draw(); }
    for (i in el) {
        if (el[i].type == 'dynamic') {
            el[i].draw();
        } else if (first_time) { el[i].draw(); }
    } // drawing other elements of scheme
    if (first_time) {
        ctd.strokeStyle = "#000";
        ctd.beginPath();
        ctd.moveTo(0, 0);
        ctd.lineTo(600, 200);
        ctd.closePath();
        ctd.stroke();
    }

    setTimeout("reload(false)", 1000); // time to call 'reload();'
}

var b = true;
reload(true);

function stop () { b = !b; }
