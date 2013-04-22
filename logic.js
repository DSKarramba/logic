/* LOGIC PART */

/* double negative is used to work with boolean variables */
/* logical node */
function X(cx, cy, /* optional */ cstate) {
    this.x = cx;
    this.y = cy;
    this.state = (!!cstate) || false;
}

/* wire between two Xs */
function WIRE(ax0, ax1) {
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = !!this.x0.state;
}

/* logical input: 1 or 0 */
function INPUT(ax, state) {
    this.x = ax;
    this.state = !!state;
    ax.state = this.state;
}

/* logical output */
function OUTPUT(ax) {
    this.x = ax;
    this.state = !!ax.state;
}

/* logical function: x1 = not x0 */
function NOT(ax0, ax1) {
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = !this.x0.state;
    ax1.state = this.x1.state;
}

/* logical function: x1 = x0_0 and x0_1 */
function AND(ax0_0, ax0_1, ax1) {
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    this.x1.state = (!!this.x00.state) && (!!this.x01.state);
    ax1.state = this.x1.state;
}

/* logical function: x1 = x0_0 or x0_1 */
function OR(ax0_0, ax0_1, ax1) {
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    this.x1.state = (!!this.x00.state) + (!!this.x01.state);
    ax1.state = !!this.x1.state;
}

/* TEST PART */

/* для теста: массив узлов */
var nodes = [new X(0, 0), new X(3, 0), new X(7, 0), new X(10, 0)];
nodes = nodes.concat(new X(0, 8), new X(10, 8), new X(14, 4), new X(17, 4));

/* тест: умножение 1 на инверсию другой 1 */
var in_0 = new INPUT(nodes[0], 1);
new WIRE(nodes[0], nodes[1]);
new NOT(nodes[1], nodes[2]);
new WIRE(nodes[2], nodes[3]);
// -------------------------------------
var in_1 = new INPUT(nodes[4], 1);
new WIRE(nodes[4], nodes[5]);
new AND(nodes[3], nodes[5], nodes[6]);
// -------------------------------------
new WIRE(nodes[6], nodes[7]);
var out_0 = new OUTPUT(nodes[7]);

/* вывод результатов */
s = 'Inputs: first = ' + in_0.state + ', second = ' + in_1.state;
s += '. Output = ' + out_0.state + '.';

alert(s);
