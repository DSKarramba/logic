
/* example 1: "1" and not "1" */
var node = [], wire = [], el = [], inp = [], out = [];

function example1(first, inputs) {
    var nodes = [new Node(45, 135), new Node(90, 135),
                 new Node(150, 135), new Node(210, 135),
                 new Node(45, 195), new Node(165, 195, 1),
                 new Node(165, 165, 1), new Node(210, 165),
                 new Node(270, 150), new Node(315, 150)];
    transfer(node, nodes, first); // call this function if you're drawing some schemes at once
    inp.push(new Input(node[first + 0], inputs[0]),
             new Input(node[first + 4], inputs[1]));
    el.push(new Text(160, 90, '"1" и не "1"'),
            new Not(node[first + 1], node[first + 2]),
            new And(node[first + 3], node[first + 7], node[first + 8]));
    wire.push(new Wire(node[first + 0], node[first + 1]),
              new Wire(node[first + 2], node[first + 3]),
              new Wire(node[first + 4], node[first + 5]),
              new Wire(node[first + 5], node[first + 6]),
              new Wire(node[first + 6], node[first + 7]),
              new Wire(node[first + 8], node[first + 9]));
    out.push(new Output(node[first + 9]));
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
    transfer(node, nodes, first);
    inp.push(new Input(node[first], inputs[0]));
    el.push(new Text(480, 90, 'Сложение сигнала со своим отрицанием'),
            new Not(node[first + 2], node[first + 3]),
            new Or(node[first + 4], node[first + 8], node[first + 9]));
    wire.push(new Wire(node[first], node[first + 1]),
              new Wire(node[first + 1], node[first + 2]),
              new Wire(node[first + 3], node[first + 4]),
              new Wire(node[first + 1], node[first + 5]),
              new Wire(node[first + 5], node[first + 6]),
              new Wire(node[first + 6], node[first + 7]),
              new Wire(node[first + 7], node[first + 8]),
              new Wire(node[first + 9], node[first + 10]));
    out.push(new Output(node[first + 10]));
    return first + 10;
}

/* example 3: JK flip-flop */
var JKin = [true, false, false, false]; // start levels of input signals

function example3(first, inputs) {
    var nodes = [new Node(45, 300), new Node(150, 300),
                 new Node(45, 360), new Node(150, 360),
                 new Node(45, 330), new Node(150, 330),
                 new Node(210, 330), new Node(255, 330)];
    transfer(node, nodes, first);
    inp.push(new Input(node[first], inputs[0]),
             new Input(node[first + 2], inputs[1]),
             new Input(node[first + 4], inputs[2]));
    el.push(new Text(75, 255, 'JK-триггер'),
            new JK(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new Wire(node[first], node[first + 1]),
              new Wire(node[first + 2], node[first + 3]),
              new Wire(node[first + 4], node[first + 5]),
              new Wire(node[first + 6], node[first + 7]));
    out.push(new Output(node[first + 7]));
    return first + 7;
}

/* example 4: RS flip-flop */

var RSin = [true, false, false, false];
function example4(first, inputs) {
    var nodes = [new Node(345, 300), new Node(450, 300),
                 new Node(345, 360), new Node(450, 360),
                 new Node(345, 330), new Node(450, 330),
                 new Node(510, 330), new Node(555, 330)];
    transfer(node, nodes, first);
    inp.push(new Input(node[first], inputs[0]),
             new Input(node[first + 2], inputs[1]),
             new Input(node[first + 4], inputs[2]));
    el.push(new Text(375, 255, 'RS-триггер'),
            new RS(node[first + 1], node[first + 3], node[first + 5], node[first + 6], inputs[3]));
    wire.push(new Wire(node[first], node[first + 1]),
              new Wire(node[first + 2], node[first + 3]),
              new Wire(node[first + 4], node[first + 5]),
              new Wire(node[first + 6], node[first + 7]));
    out.push(new Output(node[first + 7]));
    return first + 7;
}

/* example 5: Z-state */
var OIn = [true, true, 0];
function example5(first, inputs) {
    var nodes = [new Node(720, 315), new Node(720, 345),
                 new Node(780, 315), new Node(795, 345),
                 new Node(810, 315), new Node(855, 315)];
    transfer(node, nodes, first);
    inp.push(new Input(node[first], inputs[0]),
             new Input(node[first + 1], inputs[1]));
    el.push(new Text(675, 270, 'Пример использования Z-состояния'),
            new Oen(node[first + 2], node[first + 3], node[first + 4]));
    wire.push(new Wire(node[first], node[first + 2]),
              new Wire(node[first + 1], node[first + 3]),
              new Wire(node[first + 4], node[first + 5]));
    out.push(new Output(node[first + 5]));
    return first + 5;
}

function reload(first_time) {
    node = [], wire = [], el = [], inp = [], out = []; // erase arrays
    
    last1 = example1(0, [1, 1]);       //  calling
    last2 = example2(last1 + 1, [1]);  //    all
    last3 = example3(last2 + 1, JKin); //  example
    last4 = example4(last3 + 1, RSin); // functions
    last5 = example5(last4 + 1, OIn);  //
    
    calculate(inp, out); // calculate signal levels
    
    JKin[3] = node[last3].state.value;          //  changing
    JKin[2] = !JKin[2];                         //   levels
    if (JKin[2]) JKin[1] = !JKin[1];            //  of input
    if (JKin[2] && JKin[1]) JKin[0] = !JKin[0]; //   signals
    
    RSin[3] = node[last4].state.value;
    RSin[2] = !RSin[2];
    if (RSin[2]) RSin[1] = !RSin[1];
    if (RSin[2] && RSin[1]) RSin[0] = !RSin[0];
    if (RSin[0] && RSin[1]) RSin[1] = !RSin[1];
    
    OIn[0] = Math.random() * 10 < 5;
    if (OIn[2] === 5) {
        OIn[1] = !OIn[1];
        OIn[2] = 0;
    } else { OIn[2]++; }
    
    /* draw */
    
    clear(ctd); // clearing context
    for (i in wire) { wire[i].draw(); } // drawing all wires below everything else
    for (i in node) { node[i].draw(); } // drawing visible nodes
    for (i in inp) { inp[i].draw(); }   // drawing inputs 
    for (i in out) { out[i].draw(); }   // drawing outputs
    for (i in el) {                     // drawing other elements of scheme
        if (el[i].type === 'dynamic') {
            el[i].draw();
        } else if (first_time) { el[i].draw(); }
    }
    
    setTimeout("reload(false)", 1000); // time to call 'reload();'
}

reload(true);
