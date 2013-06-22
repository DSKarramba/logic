var canvas = document.getElementById('test').getContext('2d');
var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
canvas.font = '11pt PT Sans';
canvas.textBaseline = 'middle';
var Z = {Z: '', z: ''};

/* double negative is used to work with boolean variables */
/* logical node */
function X(cx, cy, /* 'true' for connections */ visible, /* optional */ cstate) {
    "use strict";
    this.x = cx;
    this.y = cy;
    this.state = (cstate in Z) ? 'Z' : (!!cstate || false);
    this.visible = (!!visible) || false;
    this.draw = function () {
        if (this.visible) {
            canvas.beginPath();
            canvas.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
            canvas.closePath();
            if (this.state in Z) canvas.fillStyle = colorZ;
            else canvas.fillStyle = this.state ? colorTrue : colorFalse;
            canvas.fill();
        }
    }
}

/* wire between two Xs */
function WIRE(ax0, ax1) {
    "use strict";
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = (this.x0.state in Z) ? 'Z' : !!this.x0.state;
    this.draw = function () {
        canvas.beginPath();
        canvas.moveTo(this.x0.x, this.x0.y);
        canvas.lineTo(this.x1.x, this.x1.y);
        canvas.closePath();
        canvas.lineWidth = 4;
        if (this.x1.state in Z) canvas.strokeStyle = colorZ;
        else canvas.strokeStyle = this.x1.state ? colorTrue : colorFalse;
        canvas.stroke();
    }
}

/* logical input: 1 or 0 */
function INPUT(ax, state) {
    "use strict";
    this.state = (state in Z) ? 'Z' : !!state;
    ax.state = this.state;
    this.x = ax;
    this.draw = function () {
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        if (this.x.state in Z) canvas.fillStyle = colorZ;
        else canvas.fillStyle = this.x.state ? colorTrue : colorFalse;
        canvas.fill();
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        canvas.stroke();
        canvas.fillStyle = '#000';
        canvas.textAlign = 'center';
        var ttext = (this.state in Z) ? 'Z' : this.state + 0;
        canvas.fillText(ttext, this.x.x, this.x.y);
    }
}

/* logical output */
function OUTPUT(ax) {
    "use strict";
    this.x = ax;
    this.state = (ax.state in Z) ? 'Z' : !!ax.state;
    this.draw = function () {
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        if (this.x.state in Z) canvas.fillStyle = colorZ;
        else canvas.fillStyle = this.x.state ? colorTrue : colorFalse;
        canvas.fill();
        canvas.beginPath();
        canvas.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        canvas.stroke();
        canvas.fillStyle = '#000';
        canvas.textAlign = 'center';
        var ttext = (this.state in Z) ? 'Z' : this.state + 0;
        canvas.fillText(ttext, this.x.x, this.x.y);
    }
}

/* logical function: x1 = not x0 */
function NOT(ax0, ax1) {
    "use strict";
    this.x0 = ax0;
    this.x1 = ax1;
    this.x1.state = (this.x0.state in Z) ? 'Z' : !this.x0.state;
    ax1.state = this.x1.state;
    this.draw = function () {
        canvas.beginPath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = '#000';
        canvas.moveTo(this.x0.x, this.x0.y);
        canvas.lineTo(this.x0.x, this.x0.y - 23);
        canvas.lineTo(this.x0.x + 46, this.x0.y);
        canvas.lineTo(this.x0.x, this.x0.y + 23);
        canvas.lineTo(this.x0.x, this.x0.y);
        canvas.closePath();
        canvas.moveTo(this.x0.x + 60, this.x0.y);
        canvas.arc(this.x0.x + 53, this.x0.y, 7, 0, Math.PI * 2, true);
        canvas.stroke();
        canvas.beginPath();
        canvas.arc(this.x0.x + 53, this.x0.y, 6, 0, Math.PI * 2, true);
        canvas.closePath();
        if (this.x1.state in Z) canvas.fillStyle = colorZ;
        else canvas.fillStyle = this.x1.state ? colorTrue : colorFalse;
        canvas.fill();
        this.x0.visible = true; this.x0.draw();
        /* viewable width of block = 60, X'able width of block = 53 */
    }
}

/* logical function: x1 = x0_0 and x0_1 */
function AND(ax0_0, ax0_1, ax1) {
    "use strict";
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    if (this.x00.state in Z || this.x01.state in Z) this.x1.state = 'Z';
    else this.x1.state = (!!this.x00.state) && (!!this.x01.state);
    ax1.state = this.x1.state;
    this.draw = function () {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(this.x00.x, this.x00.y);
        canvas.lineTo(this.x00.x, this.x00.y - 10);
        canvas.lineTo(this.x00.x + 35, this.x00.y - 10);
        canvas.bezierCurveTo(this.x1.x + 8, this.x1.y - 20, this.x1.x + 8,
                             this.x1.y + 20, this.x00.x + 35, this.x01.y + 10);
        canvas.lineTo(this.x00.x, this.x01.y + 10);
        canvas.lineTo(this.x00.x, this.x00.y);
        canvas.closePath();
        canvas.stroke();
        this.x00.visible = true; this.x00.draw();
        this.x01.visible = true; this.x01.draw();
        this.x1.visible = true; this.x1.draw();
        /* width of block = 60 */
    }
}

/* logical function: x1 = x0_0 or x0_1 */
function OR(ax0_0, ax0_1, ax1) {
    "use strict";
    this.x00 = ax0_0;
    this.x01 = ax0_1;
    this.x1 = ax1;
    if (this.x00.state in Z && this.x01.state in Z) this.x1.state = 'Z';
    else if (this.x00.state in Z && !(this.x01.state in Z)) this.x1.state = !!this.x01.state;
    else if (!(this.x00.state in Z) && this.x01.state in Z) this.x1.state = !!this.x00.state;
    else this.x1.state = (!!this.x00.state) + (!!this.x01.state);
    ax1.state = (this.x1.state in Z) ? 'Z' : !!this.x1.state;
    this.draw = function () {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(this.x00.x - 10, this.x00.y - 10);
        canvas.bezierCurveTo(this.x00.x + 8, this.x1.y - 20, this.x00.x + 8,
                             this.x1.y + 20, this.x00.x - 10, this.x01.y + 10);
        canvas.bezierCurveTo(this.x00.x + 30, this.x01.y + 10, this.x1.x - 15,
                             this.x1.y + 20, this.x1.x, this.x1.y);
        canvas.moveTo(this.x00.x - 10, this.x00.y - 10);
        canvas.bezierCurveTo(this.x00.x + 30, this.x00.y - 10, this.x1.x - 15,
                             this.x1.y - 20, this.x1.x, this.x1.y);
        canvas.moveTo(this.x00.x - 10, this.x00.y - 10);
        canvas.closePath();
        canvas.stroke();
        
        this.x00.visible = true; this.x00.draw();
        this.x01.visible = true; this.x01.draw();
        this.x1.visible = true; this.x1.draw();
        /* viewable width of block ~ 70, X'able width of block = 60 */
    }
}

/* JK flip-flop */
function JK(aJ, aK, aC, aQ, astate) {
    "use strict";
    this.J = aJ;
    this.K = aK;
    this.C = aC;
    this.Q = aQ;
    this.state = (astate in Z) ? 'Z' : (!!astate || false);
    if (this.C.state) {
        if (this.J.state in Z || this.K.state in Z) this.state = 'Z';
        else if (!this.J.state && this.K.state) this.state = false;
        else if (this.J.state && !this.K.state) this.state = true;
        else if (!this.J.state && !this.K.state) this.state = (this.state in Z) ? 'Z' : (!!this.state || false);
        else this.state = !this.state;
    }
    aQ.state = this.state;
    this.draw = function () {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.textAlign = 'center';
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
        canvas.stroke();
        this.J.visible = true; this.J.draw();
        this.K.visible = true; this.K.draw();
        this.C.visible = true; this.C.draw();
        this.Q.visible = true; this.Q.draw();
    }
}

/* RS flip-flop */
function RS(aS, aR, aC, aQ, astate) {
    "use strict";
    this.R = aR;
    this.S = aS;
    this.C = aC;
    this.Q = aQ;
    this.state = (astate in Z) ? 'Z' : (!!astate || false);
    if (this.C.state) {
        if (this.R.state in Z || this.S.state in Z) this.state = 'Z';
        else if (!this.R.state && this.S.state) this.state = true;
        else if (this.R.state && !this.S.state) this.state = false;
        else if (this.R.state && this.S.state) this.state = 'Z';
        else this.state = (this.state in Z) ? 'Z' : (!!this.state || false);
    }
    aQ.state = this.state;
    this.draw = function () {
        canvas.strokeStyle = '#000';
        canvas.lineWidth = 2;
        canvas.textAlign = 'center';
        canvas.strokeRect(this.S.x, this.S.y - 20, 60, 100);
        canvas.fillStyle = "#000";
        canvas.fillText("S", this.S.x + 10, this.S.y);
        canvas.fillText("R", this.R.x + 10, this.R.y);
        canvas.fillText("C", this.C.x + 10, this.C.y);
        canvas.fillText("Q", this.Q.x - 11, this.Q.y);
        canvas.fillText("RS", this.S.x + 30, this.C.y);
        canvas.lineWidth = 0.3;
        canvas.beginPath();
        canvas.moveTo(this.S.x + 18, this.S.y - 20);
        canvas.lineTo(this.S.x + 18, this.R.y + 20);
        canvas.moveTo(this.Q.x - 18, this.R.y + 20);
        canvas.lineTo(this.Q.x - 18, this.S.y - 20);
        canvas.moveTo(this.Q.x - 18, this.R.y - 20);
        canvas.closePath();
        canvas.stroke();
        this.S.visible = true; this.S.draw();
        this.R.visible = true; this.R.draw();
        this.C.visible = true; this.C.draw();
        this.Q.visible = true; this.Q.draw();
    }
}

/* logical element: if (!oen) out = in, else -- out = 'Z' */
function BTRI(In, oen, out) {
    "use strict";
    this.din = In;
    this.oen = oen;
    this.dout = out;
    if (this.oen.state == false || this.oen.state in Z)
        this.dout.state = (this.din.state in Z) ? 'Z' : !!this.din.state;
    else this.dout.state = 'Z';
    out.state = this.dout.state;
    this.draw = function () {
        if (this.oen.state in Z) canvas.fillStyle = colorTrue;
        else canvas.fillStyle = !this.oen.state ? colorTrue : colorFalse;
        if (oen.state in Z) canvas.strokeStyle = colorZ;
        else canvas.strokeStyle = oen.state ? colorTrue : colorFalse;
        canvas.beginPath();
        canvas.lineWidth = 4;
        canvas.moveTo(this.oen.x, this.oen.y);
        canvas.lineTo(this.din.x + 15, this.din.y + 10);
        canvas.closePath();
        canvas.stroke();
        canvas.beginPath();
        canvas.lineWidth = 2;
        canvas.strokeStyle = '#000';
        canvas.moveTo(this.din.x, this.din.y);
        canvas.lineTo(this.din.x, this.din.y - 16);
        canvas.lineTo(this.din.x + 30, this.din.y);
        canvas.lineTo(this.din.x, this.din.y + 16);
        canvas.lineTo(this.din.x, this.din.y);
        canvas.closePath();
        canvas.moveTo(this.din.x + 15, this.din.y + 10);
        canvas.arc(this.din.x + 15, this.din.y + 10, 5, 0, Math.PI * 2, true);
        canvas.stroke();
        canvas.beginPath();
        canvas.arc(this.din.x + 15, this.din.y + 10, 4, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
        this.din.visible = true; this.din.draw();
        this.dout.visible = true; this.dout.draw();        
        this.oen.visible = true; this.oen.draw();        
        /* width of block = 30 */
    }
}

/* outputs text on canvas */
function TEXT(x, y, text) {
    "use strict";
    this.draw = function () {
        canvas.fillStyle = "#000";
        canvas.textAlign = 'left';
        canvas.fillText(text, x, y);
    }
}

/* clears canvas */
function clear() {
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
}
