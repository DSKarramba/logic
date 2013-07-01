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
    this.draw = drawNode;
}

function Wire(start, end) {
    this.start = start;
    this.end = end;
    start.wires.push(this);
    this.draw = drawWire;
    this.sync = function () {
        this.end.state = this.start.state;
        this.end.connected = true;
    };
}

function Input(node, state) {
    this.node = node;
    this.state = getState(state);
    this.draw = drawPin;
    this.sync = function () {
        this.node.state = this.state;
        this.node.connected = true;
    };
}

function Output(node) {
    this.node = node;
    this.draw = drawPin;
    this.sync = function () {
        this.state = this.node.state;
    };
}

function Not(inp, out) {
    this.inp = inp;
    this.out = out;
    this.inp.element = this;
    this.type = 'dynamic';
    this.name = 'not';
    this.draw = drawNot;
    this.sync = function () {
        this.out.state = (getState(this.inp.state.value) == z) ? z : getState(!this.inp.state.value);
        this.out.connected = true;
    };
    this.isReady = function () { return this.inp.connected; };
}

function And(inp0, inp1, out) {
    this.inp0 = inp0;
    this.inp1 = inp1;
    this.out = out;
    this.inp0.element = this;
    this.inp1.element = this;
    this.type = 'static';
    this.name = 'and';
    this.draw = drawAnd;
    this.sync = function () {
        this.out.state = getState(Math.min(this.inp0.state.value, this.inp1.state.value));
        this.out.connected = true;
    };
    this.isReady = function () { return this.inp0.connected && this.inp1.connected; };
}

function Or(inp0, inp1, out) {
    this.inp0 = inp0;
    this.inp1 = inp1;
    this.out = out;
    this.inp0.element = this;
    this.inp1.element = this;
    this.type = 'static';
    this.name = 'or';
    this.draw = drawOr;
    this.sync = function () {
        this.out.state = getState(Math.max(this.inp0.state.value, this.inp1.state.value));
        this.out.connected = true;
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
    this.draw = drawJK;
    
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
    this.draw = drawRS;
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
                //console.log(n.element.out)
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

function transfer(node, nodes, first) {
    for (i = 0; i < nodes.length; i++) {
        if (node[i + first] != undefined) {
            v = node[i + first].visible;
            node[i + first] = nodes[i];
            node[i + first].visible = v;
        } else { node[i + first] = nodes[i]; }
    }
}