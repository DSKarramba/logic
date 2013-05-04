var canvas = document.getElementById('test').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
canvas.font = '11pt PT Sans';
canvas.textAlign = 'center';
canvas.textBaseline = 'middle';

/* double negative is used to work with boolean variables */
/* logical node */
function X(cx, cy, /* 'true' for connections */ visible, /* optional */ cstate) {
    this.x = cx;
    this.y = cy;
    this.state = (!!cstate) || false;
    this.visible = (!!visible) || false;
    this.draw = function() {
        if (this.visible) {
            canvas.beginPath();
            canvas.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
            canvas.closePath();
            canvas.fillStyle = this.state ? colorTrue : colorFalse;
            canvas.fill();
        }
    }
}

/* wire between two Xs */
function WIRE(ax0, ax1) {
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = !!this.x0.state;
    this.draw = function() {
        canvas.beginPath();
        canvas.moveTo(this.x0.x, this.x0.y);
        canvas.lineTo(this.x1.x, this.x1.y);
        canvas.closePath();
        canvas.lineWidth = 4;
        canvas.strokeStyle = this.x1.state ? colorTrue : colorFalse;
        canvas.stroke();
    }
}

/* logical input: 1 or 0 */
function INPUT(ax, state) {
    this.state = !!state;
    ax.state = this.state;
    this.x = ax;
    this.draw = function() {
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = this.x.state ? colorTrue : colorFalse;
        canvas.fill();
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        canvas.stroke();
        canvas.fillStyle = '#000';
        canvas.fillText(this.state + 0, this.x.x, this.x.y);
    }
}

/* logical output */
function OUTPUT(ax) {
    this.x = ax;
    this.state = !!ax.state;
    this.draw = function() {
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = this.x.state ? colorTrue : colorFalse;
        canvas.fill();
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        canvas.stroke();
        canvas.fillStyle = '#000';
        canvas.fillText(this.state + 0, this.x.x, this.x.y);
    }
}

/* logical function: x1 = not x0 */
function NOT(ax0, ax1) {
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = !this.x0.state;
    ax1.state = this.x1.state;
    this.draw = function() {
        canvas.beginPath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = '#000';
        canvas.moveTo(this.x0.x, this.x0.y);
        canvas.lineTo(this.x0.x, this.x0.y - 25);
        canvas.lineTo(this.x0.x + 50, this.x0.y);
        canvas.lineTo(this.x0.x, this.x0.y + 25);
        canvas.lineTo(this.x0.x, this.x0.y);
        canvas.closePath();
        canvas.moveTo(this.x0.x + 64, this.x0.y);
        canvas.arc(this.x0.x + 57, this.x0.y, 7, 0, Math.PI * 2, true);
        canvas.stroke();
        canvas.beginPath();
        canvas.arc(this.x0.x + 57, this.x0.y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = this.x1.state ? colorTrue : colorFalse;
        canvas.fill();
        this.x0.visible = true;
        this.x0.draw();
    }
}

/* logical function: x1 = x0_0 and x0_1 */
function AND(ax0_0, ax0_1, ax1) {
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    this.x1.state = (!!this.x00.state) && (!!this.x01.state);
    ax1.state = this.x1.state;
    this.draw = function() {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.strokeRect(this.x00.x, this.x00.y - 20, 60, 100);
        canvas.fillStyle = "#000";
        canvas.fillText("&", this.x00.x + 30, this.x1.y);
        this.x00.visible = true;
        this.x00.draw();
        this.x01.visible = true;
        this.x01.draw();
        this.x1.visible = true;
        this.x1.draw();
    }
}

/* logical function: x1 = x0_0 or x0_1 */
function OR(ax0_0, ax0_1, ax1) {
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    this.x1.state = (!!this.x00.state) + (!!this.x01.state);
    ax1.state = !!this.x1.state;
    this.draw = function() {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.strokeRect(this.x00.x, this.x00.y - 20, 60, 100);
        canvas.fillStyle = "#000";
        canvas.fillText("1", this.x00.x + 30, this.x1.y);
        this.x00.visible = true;
        this.x00.draw();
        this.x01.visible = true;
        this.x01.draw();
        this.x1.visible = true;
        this.x1.draw();
    }
}

/* JK flip-flop */
function JK(aJ, aK, aC, aQ) {
    this.J = aJ;
    this.K = aK;
    this.C = aC;
    this.Q = aQ;
    if (this.C.state) {
        if (!this.J.state && this.K.state) this.state = false;
        if (this.J.state && !this.K.state) this.state = true;
        if (!this.J.state && !this.K.state) this.state = (!!this.state) || false;
        if (this.J.state && this.K.state) this.state = !this.state;
    }
    aQ.state = this.state;
    this.draw = function() {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.strokeRect(this.J.x, this.J.y - 20, 60, 100);
        canvas.fillStyle = "#000";
        canvas.fillText("J", this.J.x + 10, this.J.y);
        canvas.fillText("K", this.K.x + 10, this.K.y);
        canvas.fillText("C", this.C.x + 10, this.C.y);
        canvas.fillText("Q", this.Q.x - 11, this.Q.y);
        canvas.fillText("JK", this.J.x + 30, this.C.y);
        canvas.lineWidth = 0.3;
        canvas.beginPath();
        canvas.moveTo(this.J.x + 18, this.J.y - 20);
        canvas.lineTo(this.J.x + 18, this.K.y + 20);
        canvas.moveTo(this.Q.x - 18, this.K.y + 20);
        canvas.lineTo(this.Q.x - 18, this.J.y - 20);
        canvas.moveTo(this.Q.x - 18, this.K.y - 20);
        canvas.closePath();
        canvas.strokeStyle = '#000';
        canvas.stroke();
        this.J.visible = true;
        this.J.draw();
        this.K.visible = true;
        this.K.draw();
        this.C.visible = true;
        this.C.draw();
        this.Q.visible = true;
        this.Q.draw();
    }
}

/* TEST PART */

var wire = []; var el = [];

/* тест 1: умножение "1" на инверсию другой "1" */
var node = [new X(50, 40), new X(100, 40), new X(157, 40), new X(210, 40)];
node = node.concat(/* 4 */ new X(50, 100), new X(210, 100), new X(270, 70), new X(320, 70));
/* тест 2: сложение сигнала со своей инверсией */
node = node.concat(/* 8 */ new X(50, 200), new X(100, 200, 1), new X(150, 200), new X(207, 200));
node = node.concat(/* 12 */ new X(260, 200), new X(100, 260, 1), new X(260, 260), new X(320, 230));
node = node.concat(/* 16 */ new X(370, 230));
/* тест 3: JK-триггер */
node = node.concat(/* 17 */ new X(50, 360), new X(150, 360), new X(50, 420), new X(150, 420));
node = node.concat(/* 21 */ new X(50, 390), new X(150, 390), new X(210, 390), new X(260, 390));

// -------------- тест 1 -----------------
el.push(new INPUT(node[0], 1));
wire.push(new WIRE(node[0], node[1]));
el.push(new NOT(node[1], node[2]));
wire.push(new WIRE(node[2], node[3]));
el.push(new INPUT(node[4], 1));
wire.push(new WIRE(node[4], node[5]));
el.push(new AND(node[3], node[5], node[6]));
wire.push(new WIRE(node[6], node[7]));
el.push(new OUTPUT(node[7]));
// ---------------------------------------

// -------------- тест 2 -----------------
el.push(new INPUT(node[8], 0));
wire.push(new WIRE(node[8], node[9]));
wire.push(new WIRE(node[9], node[10]));
el.push(new NOT(node[10], node[11]));
wire.push(new WIRE(node[11], node[12]));
wire.push(new WIRE(node[9], node[13]));
wire.push(new WIRE(node[13], node[14]));
el.push(new OR(node[12], node[14], node[15]));
wire.push(new WIRE(node[15], node[16]));
el.push(new OUTPUT(node[16]));
// ---------------------------------------

// -------------- тест 3 -----------------
el.push(new INPUT(node[17], 1)); // J
wire.push(new WIRE(node[17], node[18]));
el.push(new INPUT(node[19], 0)); // K
wire.push(new WIRE(node[19], node[20]));
el.push(new INPUT(node[21], 1)); // C
wire.push(new WIRE(node[21], node[22]));
el.push(new JK(node[18], node[20], node[22], node[23]));
wire.push(new WIRE(node[23], node[24]));
el.push(new OUTPUT(node[24])); // Q
// -------------------------------------

/* отрисовка */
for (i in wire) { wire[i].draw() }
for (i in node) { node[i].draw() }
for (i in el) { el[i].draw() }
