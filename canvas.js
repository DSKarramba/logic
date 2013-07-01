var cts = document.getElementById('static').getContext('2d');
var ctd = document.getElementById('dynamic').getContext('2d');

ctd.canvas.width = cts.canvas.width;
ctd.canvas.height = cts.canvas.height;
cts.font = ctd.font = '11pt PT Sans';
cts.textBaseline = ctd.textBaseline = 'middle';

// ------------------------------------

var grid = document.getElementById('grid').getContext('2d');
grid.canvas.width = cts.canvas.width;
grid.canvas.height = cts.canvas.height;

function createGrid(dx) {
    grid.lineWidth = 1;
    grid.strokeStyle = "rgba(0, 0, 0, .15)";
    var width = grid.canvas.width, height = grid.canvas.height;
    grid.beginPath();
    for (i = dx; i < width; i = i + dx) {
        grid.moveTo(i, 0);
        grid.lineTo(i, height);
    }
    for (i = dx; i < height; i = i + dx) {
        grid.moveTo(0, i);
        grid.lineTo(width, i);
    }
    grid.moveTo(dx, 0);
    grid.closePath();
    grid.stroke();
}

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

drawNode = function () {
    if (this.visible) {
        ctd.beginPath();
        ctd.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
        ctd.closePath();
        ctd.fillStyle = this.state.color;
        ctd.fill();
    }
};

drawWire = function () {
    ctd.beginPath();
    ctd.moveTo(this.start.x, this.start.y);
    ctd.lineTo(this.end.x, this.end.y);
    ctd.closePath();
    ctd.lineWidth = 4;
    ctd.strokeStyle = this.end.state.color;
    ctd.stroke();
};

drawPin = function () {
    ctd.fillStyle = this.node.state.color;
    ctd.beginPath();
    ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
    ctd.closePath();
    ctd.fill();
    ctd.lineWidth = 2;
    ctd.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctd.beginPath();
    ctd.arc(this.node.x, this.node.y, 11, 0, Math.PI * 2, true);
    ctd.closePath();
    ctd.stroke();
    ctd.fillStyle = '#000';
    ctd.textAlign = 'center';
    ctd.fillText(this.node.state.text, this.node.x, this.node.y);
    this.node.visible = false;
};

drawNot = function () {
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

drawAnd = function () {
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

drawOr = function () {
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

drawJK = function () {
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

drawRS = function () {
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
