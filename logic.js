var cts = document.getElementById('static').getContext('2d');
var ctd = document.getElementById('dynamic').getContext('2d');

ctd.canvas.width = cts.canvas.width;
ctd.canvas.height = cts.canvas.height;
cts.font = ctd.font = '11pt PT Sans';
cts.textBaseline = ctd.textBaseline = 'middle';

// ------------------------------------

function Text(x, y, t) {
    this.type = 'static';
    this.draw = function () {
        cts.textBaseline = 'top';
        cts.fillStyle = "#000";
        cts.textAlign = 'left';
        cts.fillText(t, x, y);
        cts.textBaseline = 'middle';
    };
}

function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// ------------------------------------

var one = {
    color: '#f5bb15',
    value: 1,
    text: '1'
};

var zero = {
    color: '#15bbf5',
    value: 0,
    text: '0'
};

var z = {
    color: '#f515bb',
    value: -1,
    text: 'Z'
};

function getState(value) {
    if (value > 0) {
        return one;
    } else if (!value) {
        return zero;
    } else {
        return z;
    }
}

// ------------------------------------

function Node(x, y, visible) {
    this.x = x;
    this.y = y;
    this.state = z;
    this.visible = visible || false;
    this.wires = [];
    this.connected = false;
    this.element = false;
    this.draw = function () {
        if (this.visible) {
            ctd.beginPath();
            ctd.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
            ctd.closePath();
            ctd.fillStyle = this.state.color;
            ctd.fill();
        }
    };
}

function Wire(start, end) {
    this.start = start;
    this.end = end;
    start.wires.push(this);
    this.draw = function () {
        ctd.beginPath();
        ctd.moveTo(this.start.x, this.start.y);
        ctd.lineTo(this.end.x, this.end.y);
        ctd.closePath();
        ctd.lineWidth = 4;
        ctd.strokeStyle = this.end.state.color;
        ctd.stroke();
    };
    this.sync = function () {
        this.end.state = this.start.state;
        this.end.connected = true;
    };
}

function Input(node, state) {
    this.node = node;
    this.state = getState(state);
    this.draw = function () {
        ctd.beginPath();
        ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.fillStyle = this.node.state.color;
        ctd.fill();
        ctd.beginPath();
        ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.lineWidth = 2;
        ctd.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctd.stroke();
        ctd.fillStyle = '#000';
        ctd.textAlign = 'center';
        ctd.fillText(this.node.state.text, this.node.x, this.node.y);
        this.node.visible = false;
    };
    this.sync = function () {
        this.node.state = this.state;
        this.node.connected = true;
    };
}

function Output(node) {
    this.node = node;
    this.draw = function () {
        ctd.beginPath();
        ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.fillStyle = this.node.state.color;
        ctd.fill();
        ctd.beginPath();
        ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.lineWidth = 2;
        ctd.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctd.stroke();
        ctd.fillStyle = '#000';
        ctd.textAlign = 'center';
        ctd.fillText(this.node.state.text, this.node.x, this.node.y);
        this.node.visible = false;
    };
    this.sync = function () {
        this.state = this.node.state;
    };
}

function Not(inp, out) {
    this.inp = inp;
    this.out = out;
    this.type = 'dynamic';
    this.name = 'not';
    this.draw = function () {
        ctd.beginPath();
        ctd.lineWidth = 2;
        ctd.strokeStyle = '#000';
        ctd.moveTo(this.inp.x, this.inp.y);
        ctd.lineTo(this.inp.x, this.inp.y - 23);
        ctd.lineTo(this.inp.x + 46, this.inp.y);
        ctd.lineTo(this.inp.x, this.inp.y + 23);
        ctd.lineTo(this.inp.x, this.inp.y);
        ctd.closePath();
        ctd.moveTo(this.inp.x + 60, this.inp.y);
        ctd.arc(this.inp.x + 53, this.inp.y, 7, 0, Math.PI * 2, true);
        ctd.fillStyle = "#fff";
        ctd.fill();
        ctd.stroke();
        ctd.beginPath();
        ctd.arc(this.inp.x + 53, this.inp.y, 6, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.fillStyle = this.out.state.color;
        ctd.fill();
        this.inp.visible = true;
        this.inp.draw();
        this.out.visible = false;
    };
    
    this.inp.element = this;
    this.sync = function () {
        this.out.state = (getState(this.inp.state.value) == z) ? z : getState(!this.inp.state.value);
        this.out.connected = true;
        //this.out.element = this;
        //this.inp.connected = true;
    };
    this.isReady = function () { return this.inp.connected; };
}

function And(inp0, inp1, out) {
    this.inp0 = inp0;
    this.inp1 = inp1;
    this.out = out;
    this.type = 'static';
    this.name = 'and';
    this.draw = function () {
        cts.strokeStyle = '#000';
        cts.lineWidth = 2;
        cts.beginPath();
        cts.moveTo(this.inp0.x, this.inp0.y);
        cts.lineTo(this.inp0.x, this.inp0.y - 10);
        cts.lineTo(this.inp0.x + 35, this.inp0.y - 10);
        cts.bezierCurveTo(this.out.x + 8, this.out.y - 20, this.out.x + 8,
                             this.out.y + 20, this.inp0.x + 35, this.inp1.y + 10);
        cts.lineTo(this.inp0.x, this.inp1.y + 10);
        cts.lineTo(this.inp0.x, this.inp0.y);
        cts.closePath();
        cts.fillStyle = "#fff";
        cts.fill();
        cts.stroke();
        this.inp0.visible = true;
        this.inp0.draw();
        this.inp1.visible = true;
        this.inp1.draw();
        this.out.visible = true;
        this.out.draw();
    };
    
    this.inp0.element = this;
    this.inp1.element = this;
    this.sync = function () {
        this.out.state = getState(Math.min(this.inp0.state.value, this.inp1.state.value));
        this.out.connected = true;
        //this.out.element = this;
        //this.inp0.connected = true;
        //this.inp1.connected = true;
    };
    this.isReady = function () { return this.inp0.connected && this.inp1.connected; };
}

function Or(inp0, inp1, out) {
    this.inp0 = inp0;
    this.inp1 = inp1;
    this.out = out;
    this.type = 'static';
    this.name = 'or';
    this.draw = function () {
        cts.strokeStyle = '#000';
        cts.lineWidth = 2;
        cts.beginPath();
        cts.moveTo(this.inp0.x - 10, this.inp0.y - 10);
        cts.bezierCurveTo(this.inp0.x + 8, this.out.y - 20, this.inp0.x + 8,
                             this.out.y + 20, this.inp0.x - 10, this.inp1.y + 10);
        cts.bezierCurveTo(this.inp0.x + 30, this.inp1.y + 10, this.out.x - 15,
                             this.out.y + 20, this.out.x, this.out.y);
        cts.moveTo(this.inp0.x - 10, this.inp0.y - 10);
        cts.bezierCurveTo(this.inp0.x + 30, this.inp0.y - 10, this.out.x - 15,
                             this.out.y - 20, this.out.x, this.out.y);
        cts.moveTo(this.inp0.x - 10, this.inp0.y - 10);
        cts.closePath();
        cts.fillStyle = "#fff";
        cts.fill();
        cts.stroke();
        this.inp0.visible = true;
        this.inp0.draw();
        this.inp1.visible = true;
        this.inp1.draw();
        this.out.visible = true;
        this.out.draw();
    };
    
    this.inp0.element = this;
    this.inp1.element = this;
    this.sync = function () {
        this.out.state = getState(Math.max(this.inp0.state.value, this.inp1.state.value));
        this.out.connected = true;
        //this.out.element = this;
        //this.inp0.connected = true;
        //this.inp1.connected = true;
    };
    this.isReady = function () { return this.inp0.connected && this.inp1.connected; };
}

// ------------------------------------

function JK(J, K, C, Q, Qb) {
    this.J = J;
    this.K = K;
    this.C = C;
    this.out = Q;
    this.type = 'static';
    this.name = 'JK';
    this.draw = function () {
        cts.strokeStyle = '#000';
        cts.fillStyle = "#fff";
        cts.lineWidth = 2;
        cts.textAlign = 'center';
        cts.fillRect(this.J.x, this.J.y - 20, 60, 100);
        cts.strokeRect(this.J.x, this.J.y - 20, 60, 100);
        cts.fillStyle = "#000";
        cts.fillText("J", this.J.x + 10, this.J.y);
        cts.fillText("K", this.K.x + 10, this.K.y);
        cts.fillText("C", this.C.x + 10, this.C.y);
        cts.fillText("Q", this.out.x - 11, this.out.y);
        cts.fillText("JK", this.J.x + 30, this.C.y);
        cts.lineWidth = 0.3;
        cts.beginPath();
        cts.moveTo(this.J.x + 18, this.J.y - 20);
        cts.lineTo(this.J.x + 18, this.K.y + 20);
        cts.moveTo(this.out.x - 18, this.K.y + 20);
        cts.lineTo(this.out.x - 18, this.J.y - 20);
        cts.moveTo(this.out.x - 18, this.K.y - 20);
        cts.closePath();
        cts.stroke();
        this.J.visible = true;
        this.J.draw();
        this.K.visible = true;
        this.K.draw();
        this.C.visible = true;
        this.C.draw();
        this.out.visible = true;
        this.out.draw();
    };
    
    this.J.element = this;
    this.C.element = this;
    this.K.element = this;
    this.sync = function () {
        if (arguments.length == 4) {
            this.state = Qb;
        } else { this.state = z; }
        if (this.C.state == one) {
            if (this.J.state == z || this.K.state == z) {
                this.state = z;
            } else if (!this.J.state.value &&  this.K.state.value) {
                this.state = zero;
            } else if (this.J.state.value  && !this.K.state.value) {
                this.state = one;
            } else if (this.J.state.value  &&  this.K.state.value) {
                this.state.value = !this.state.value;
            }
        }
        this.out.state = this.state;
        this.out.connected = true;
    };
    this.isReady = function () { return this.J.connected && this.K.connected && this.C.connected; };
}

function RS(S, R, C, Q, Qb) {
    this.R = R;
    this.S = S;
    this.C = C;
    this.Q = Q;
    this.type = 'static';
    this.draw = function () {
        cts.strokeStyle = '#000';
        cts.fillStyle = "#fff";
        cts.lineWidth = 2;
        cts.textAlign = 'center';
        cts.fillRect(this.S.x, this.S.y - 20, 60, 100);
        cts.strokeRect(this.S.x, this.S.y - 20, 60, 100);
        cts.fillStyle = "#000";
        cts.fillText("S", this.S.x + 10, this.S.y);
        cts.fillText("R", this.R.x + 10, this.R.y);
        cts.fillText("C", this.C.x + 10, this.C.y);
        cts.fillText("Q", this.Q.x - 11, this.Q.y);
        cts.fillText("RS", this.S.x + 30, this.C.y);
        cts.lineWidth = 0.3;
        cts.beginPath();
        cts.moveTo(this.S.x + 18, this.S.y - 20);
        cts.lineTo(this.S.x + 18, this.R.y + 20);
        cts.moveTo(this.Q.x - 18, this.R.y + 20);
        cts.lineTo(this.Q.x - 18, this.S.y - 20);
        cts.moveTo(this.Q.x - 18, this.R.y - 20);
        cts.closePath();
        cts.stroke();
        this.S.visible = true;
        this.S.draw();
        this.R.visible = true;
        this.R.draw();
        this.C.visible = true;
        this.C.draw();
        this.Q.visible = true;
        this.Q.draw();
    };
    this.sync = function () {
        this.state = Qb || z;
        if (this.C.state == one) {
            if (this.R.state == z || this.S.state == z) {
                this.state = z;
            } else if (!this.R.state.value &&  this.S.state.value) {
                this.state = one;
            } else if (this.R.state.value  && !this.S.state.value) {
                this.state = zero;
            } else if (this.R.state.value  &&  this.S.state.value) {
                this.state = z;
            }
        }
        this.Q.state = this.state;
        this.Q.connected = true;
        //this.Q.element = this;
        //this.R.connected = true;
        this.R.element = this;
        //this.C.connected = true;
        this.C.element = this;
        //this.S.connected = true;
        this.S.element = this;
    };
    this.isReady = function () { return this.R.connected && this.S.connected && this.C.connected; };
}

// ------------------------------------

/* if (!oen) out = in, else -- out = 'Z' */
/* oen = output enabled */
function Oen(inp, oen, out) {
    this.inp = inp;
    this.oen = oen;
    this.out = out;
    this.type = 'dynamic';
    this.draw = function () {
        if (this.oen.state.value <= 0) {
            ctd.strokeStyle = one.color;
        } else { ctd.strokeStyle = zero.color; }
        ctd.beginPath();
        ctd.lineWidth = 4;
        ctd.moveTo(this.oen.x, this.oen.y);
        ctd.lineTo(this.inp.x + 15, this.inp.y + 10);
        ctd.closePath();
        ctd.stroke();
        
        ctd.beginPath();
        ctd.lineWidth = 2;
        ctd.strokeStyle = '#000';
        ctd.moveTo(this.inp.x, this.inp.y);
        ctd.lineTo(this.inp.x, this.inp.y - 16);
        ctd.lineTo(this.inp.x + 30, this.inp.y);
        ctd.lineTo(this.inp.x, this.inp.y + 16);
        ctd.lineTo(this.inp.x, this.inp.y);
        ctd.closePath();
        ctd.fillStyle = "#fff";
        ctd.fill();
        ctd.stroke();
        
        ctd.moveTo(this.inp.x + 15, this.inp.y + 10);
        ctd.arc(this.inp.x + 15, this.inp.y + 10, 5, 0, Math.PI * 2, true);
        ctd.stroke();
        
        if (this.oen.state.value <= 0) {
            ctd.fillStyle = one.color;
        } else { ctd.fillStyle = zero.color; }
        ctd.beginPath();
        ctd.arc(this.inp.x + 15, this.inp.y + 10, 4, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.fill();
        this.inp.visible = true;
        this.inp.draw();
        this.out.visible = true;
        this.out.draw();
        this.oen.visible = true;
        this.oen.draw();
    };
    
    this.oen.element = this;
    this.inp.element = this;
    this.sync = function () {
        if (this.oen.state == zero) {
            this.out.state = this.inp.state;
        } else { this.out.state = z; }
        this.out.connected = true;
    };
    this.isReady = this.inp.connected && this.oen.connected;
}

// ------------------------------------

function calculate(inp, out) {
    var connected_nodes = [];
    for (i in inp) {
        inp[i].sync();
        connected_nodes.push(inp[i].node);
    }
    
    for (i = 0;  i < connected_nodes.length; i++) {
        n = connected_nodes[i];
        //console.log(i, connected_nodes, n);
        if (n.element) {
            //console.log(n.element.name, n.element.isReady());
            if (n.element.isReady()) {
                n.element.sync();
                console.log(n.element.out)
                connected_nodes.push(n.element.out);
            };
        } else {
            for (w in n.wires) {
                if (!n.wires[w].end.connected) {
                    n.wires[w].sync();
                    connected_nodes.push(n.wires[w].end);
                };
            }
        }
    }
    for (i in out) { out[i].sync(); }
}
