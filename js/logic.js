var Z = {'Z': '', 'z': ''};

/* BASE ELEMENTS */
/* logical node */
function X(x, y, visible, /* optional */ cstate) {
    "use strict";
    this.x = x;
    this.y = y;
    this.state = (cstate in Z) ? 'Z' : (!!cstate || false);
    this.visible = (!!visible) || false;
    this.draw = Xdraw;
}

/* wire between two Xs */
function WIRE(X0, X1) {
    "use strict";
    this.x0 = X0;
    this.x1 = X1;
    this.x1.state = (this.x0.state in Z) ? 'Z' : !!this.x0.state;
    this.draw = WIREdraw;
}

/* logical input: 1 or 0 */
function INPUT(X, state) {
    "use strict";
    this.x = X;
    this.state = (state in Z) ? 'Z' : !!state;
    X.state = this.state;
    this.type = 'dynamic';
    this.draw = INPUTdraw;
}

/* logical output */
function OUTPUT(X) {
    "use strict";
    this.x = X;
    this.state = (X.state in Z) ? 'Z' : !!X.state;
    this.type = 'dynamic';
    this.draw = OUTPUTdraw;
}

/* logical function: x1 = not x0 */
function NOT(X0, X1) {
    "use strict";
    this.x0 = X0;
    this.x1 = X1;
    this.x1.state = (this.x0.state in Z) ? 'Z' : !this.x0.state;
    X1.state = this.x1.state;
    this.type = 'dynamic';
    this.draw = NOTdraw;
}

/* logical function: x1 = x0_0 and x0_1 */
function AND(X00, X01, X1) {
    "use strict";
    this.x00 = X00;
    this.x01 = X01;
    this.x1 = X1;
    if (this.x00.state in Z || this.x01.state in Z) this.x1.state = false;
    else this.x1.state = (!!this.x00.state) && (!!this.x01.state);
    X1.state = this.x1.state;
    this.type = 'static';
    this.draw = ANDdraw;
}

/* logical function: x1 = x0_0 or x0_1 */
function OR(X00, X01, X1) {
    "use strict";
    this.x00 = X00;
    this.x01 = X01;
    this.x1 = X1;
    if (this.x00.state in Z && this.x01.state in Z)
        this.x1.state = 'Z';
    else if (this.x00.state in Z && !(this.x01.state in Z))
        this.x1.state = !!this.x01.state;
    else if (!(this.x00.state in Z) && this.x01.state in Z)
        this.x1.state = !!this.x00.state;
    else this.x1.state = (!!this.x00.state) + (!!this.x01.state);
    X1.state = this.x1.state;
    this.type = 'static';
    this.draw = ORdraw;
}

/* FLIP-FLOPS */

/* JK flip-flop */
function JK(J, K, C, Q, state) {
    "use strict";
    this.J = J;
    this.K = K;
    this.C = C;
    this.Q = Q;
    this.state = (state in Z) ? 'Z' : (!!state || false);
    if (this.C.state) {
        if (this.J.state in Z || this.K.state in Z) this.state = 'Z';
        else if (!this.J.state &&  this.K.state) this.state = false;
        else if ( this.J.state && !this.K.state) this.state = true;
        else if ( this.J.state &&  this.K.state) this.state = !this.state;
    }
    Q.state = this.state;
    this.type = 'static';
    this.draw = JKdraw;
}

/* RS flip-flop */
function RS(S, R, C, Q, state) {
    "use strict";
    this.R = R;
    this.S = S;
    this.C = C;
    this.Q = Q;
    this.state = (state in Z) ? 'Z' : (!!state || false);
    if (this.C.state) {
        if (this.R.state in Z || this.S.state in Z) this.state = 'Z';
        else if (!this.R.state && this.S.state) this.state = true;
        else if (this.R.state && !this.S.state) this.state = false;
        else if (this.R.state && this.S.state) this.state = 'Z';
    }
    Q.state = this.state;
    this.type = 'static';
    this.draw = RSdraw;
}

/* ADDITIONAL */

/* if (!oen) out = in, else -- out = 'Z' */
/* where oen = output enabled */
function BTRI(inp, oen, out) {
    "use strict";
    this.inp = inp;
    this.oen = oen;
    this.out = out;
    if (this.oen.state == false)
        this.out.state = (this.inp.state in Z) ? 'Z' : !!this.inp.state;
    else this.out.state = 'Z';
    out.state = this.out.state;
    this.type = 'dynamic';
    this.draw = BTRIdraw;
}
