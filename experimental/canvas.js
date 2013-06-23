/* using this w/o 'logic.js' is stupid */

var grid = document.getElementById('grid').getContext('2d');
var static = document.getElementById('static').getContext('2d');
var dynamic = document.getElementById('dynamic').getContext('2d');

static.canvas.width = dynamic.canvas.width = grid.canvas.width;
static.canvas.height = dynamic.canvas.height = grid.canvas.height;

var colorTrue = '#f5bb15';
var colorFalse = '#15bbf5';
var colorZ = '#f515bb';
static.font = dynamic.font = '11pt PT Sans';
static.textBaseline = dynamic.textBaseline = 'middle';

function createGrid(dx) {
    grid.lineWidth = 1;
    grid.strokeStyle = "rgba(0, 0, 0, .15)";
    var width = grid.canvas.width, height = grid.canvas.height;
    grid.beginPath();
    for (var i = dx; i < width; i = i + dx) {
          grid.moveTo(i, 0);
          grid.lineTo(i, height);
    }
    for (var i = dx; i < height; i = i + dx) {
          grid.moveTo(0, i);
          grid.lineTo(width, i);
    }
    grid.moveTo(dx, 0);
    grid.closePath();
    grid.stroke();
}

Xdraw = function () {
    if (this.visible) {
        dynamic.beginPath();
        dynamic.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
        dynamic.closePath();
        if (this.state in Z) dynamic.fillStyle = colorZ;
        else dynamic.fillStyle = (this.state) ? colorTrue : colorFalse;
        dynamic.fill();
    }
}

WIREdraw = function () {
    dynamic.beginPath();
    dynamic.moveTo(this.x0.x, this.x0.y);
    dynamic.lineTo(this.x1.x, this.x1.y);
    dynamic.closePath();
    dynamic.lineWidth = 4;
    if (this.x1.state in Z) dynamic.strokeStyle = colorZ;
    else dynamic.strokeStyle = (this.x1.state) ? colorTrue : colorFalse;
    dynamic.stroke();
}

INPUTdraw = function () {
    dynamic.beginPath();
    dynamic.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
    dynamic.closePath();
    if (this.state in Z) dynamic.fillStyle = colorZ;
    else dynamic.fillStyle = (this.state) ? colorTrue : colorFalse;
    dynamic.fill();
    dynamic.beginPath();
    dynamic.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
    dynamic.closePath();
    dynamic.lineWidth = 2;
    dynamic.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    dynamic.stroke();
    dynamic.fillStyle = '#000';
    dynamic.textAlign = 'center';
    var ttext = (this.state in Z) ? 'Z' : this.state + 0;
    dynamic.fillText(ttext, this.x.x, this.x.y);
}

OUTPUTdraw = function () {
    dynamic.beginPath();
    dynamic.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
    dynamic.closePath();
    if (this.state in Z) dynamic.fillStyle = colorZ;
    else dynamic.fillStyle = (this.state) ? colorTrue : colorFalse;
    dynamic.fill();
    dynamic.beginPath();
    dynamic.arc(this.x.x, this.x.y, 11, 0, Math.PI * 2, true);
    dynamic.closePath();
    dynamic.lineWidth = 2;
    dynamic.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    dynamic.stroke();
    dynamic.fillStyle = '#000';
    dynamic.textAlign = 'center';
    var ttext = (this.state in Z) ? 'Z' : this.state + 0;
    dynamic.fillText(ttext, this.x.x, this.x.y);
}

NOTdraw = function () {
    dynamic.beginPath();
    dynamic.lineWidth = 2;
    dynamic.strokeStyle = '#000';
    dynamic.moveTo(this.x0.x, this.x0.y);
    dynamic.lineTo(this.x0.x, this.x0.y - 23);
    dynamic.lineTo(this.x0.x + 46, this.x0.y);
    dynamic.lineTo(this.x0.x, this.x0.y + 23);
    dynamic.lineTo(this.x0.x, this.x0.y);
    dynamic.closePath();
    dynamic.moveTo(this.x0.x + 60, this.x0.y);
    dynamic.arc(this.x0.x + 53, this.x0.y, 7, 0, Math.PI * 2, true);
    dynamic.fillStyle = "#fff";
    dynamic.fill();
    dynamic.stroke();
    dynamic.beginPath();
    dynamic.arc(this.x0.x + 53, this.x0.y, 6, 0, Math.PI * 2, true);
    dynamic.closePath();
    if (this.x1.state in Z) dynamic.fillStyle = colorZ;
    else dynamic.fillStyle = (this.x1.state) ? colorTrue : colorFalse;
    dynamic.fill();
    this.x0.visible = true; this.x0.draw(dynamic);
    /* width of block = 53 */
}

ANDdraw = function () {
    static.strokeStyle = '#000';
    static.lineWidth = 2;
    static.beginPath();
    static.moveTo(this.x00.x, this.x00.y);
    static.lineTo(this.x00.x, this.x00.y - 10);
    static.lineTo(this.x00.x + 35, this.x00.y - 10);
    static.bezierCurveTo(this.x1.x + 8, this.x1.y - 20, this.x1.x + 8,
                         this.x1.y + 20, this.x00.x + 35, this.x01.y + 10);
    static.lineTo(this.x00.x, this.x01.y + 10);
    static.lineTo(this.x00.x, this.x00.y);
    static.closePath();
    static.fillStyle = "#fff";
    static.fill();
    static.stroke();
    this.x00.visible = true; this.x00.draw();
    this.x01.visible = true; this.x01.draw();
    this.x1.visible = true; this.x1.draw();
    /* width of block = 60 */
}

ORdraw = function () {
    static.strokeStyle = '#000';
    static.lineWidth = 2;
    static.beginPath();
    static.moveTo(this.x00.x - 10, this.x00.y - 10);
    static.bezierCurveTo(this.x00.x + 8, this.x1.y - 20, this.x00.x + 8,
                         this.x1.y + 20, this.x00.x - 10, this.x01.y + 10);
    static.bezierCurveTo(this.x00.x + 30, this.x01.y + 10, this.x1.x - 15,
                         this.x1.y + 20, this.x1.x, this.x1.y);
    static.moveTo(this.x00.x - 10, this.x00.y - 10);
    static.bezierCurveTo(this.x00.x + 30, this.x00.y - 10, this.x1.x - 15,
                         this.x1.y - 20, this.x1.x, this.x1.y);
    static.moveTo(this.x00.x - 10, this.x00.y - 10);
    static.closePath();
    static.fillStyle = "#fff";
    static.fill();
    static.stroke();
    
    this.x00.visible = true; this.x00.draw();
    this.x01.visible = true; this.x01.draw();
    this.x1.visible = true; this.x1.draw();
}

function TEXT(x, y, text) {
    this.type = 'static';
//    this.shelf = 'base';
    this.draw = function () {
        static.textBaseline = 'top';
        static.fillStyle = "#000";
        static.textAlign = 'left';
        static.fillText(text, x, y);
        static.textBaseline = 'middle';
    }
}

JKdraw = function () {
    static.strokeStyle = '#000';
    static.fillStyle = "#fff";
    static.lineWidth = 2;
    static.textAlign = 'center';
    static.fillRect(this.J.x, this.J.y - 20, 60, 100);
    static.strokeRect(this.J.x, this.J.y - 20, 60, 100);
    static.fillStyle = "#000";
    static.fillText("J", this.J.x + 10, this.J.y);
    static.fillText("K", this.K.x + 10, this.K.y);
    static.fillText("C", this.C.x + 10, this.C.y);
    static.fillText("Q", this.Q.x - 11, this.Q.y);
    static.fillText("JK", this.J.x + 30, this.C.y);
    static.lineWidth = 0.3;
    static.beginPath();
    static.moveTo(this.J.x + 18, this.J.y - 20);
    static.lineTo(this.J.x + 18, this.K.y + 20);
    static.moveTo(this.Q.x - 18, this.K.y + 20);
    static.lineTo(this.Q.x - 18, this.J.y - 20);
    static.moveTo(this.Q.x - 18, this.K.y - 20);
    static.closePath();
    static.stroke();
    this.J.visible = true; this.J.draw();
    this.K.visible = true; this.K.draw();
    this.C.visible = true; this.C.draw();
    this.Q.visible = true; this.Q.draw();
}

RSdraw = function () {
    static.strokeStyle = '#000';
    static.fillStyle = "#fff";
    static.lineWidth = 2;
    static.textAlign = 'center';
    static.fillRect(this.S.x, this.S.y - 20, 60, 100);
    static.strokeRect(this.S.x, this.S.y - 20, 60, 100);
    static.fillStyle = "#000";
    static.fillText("S", this.S.x + 10, this.S.y);
    static.fillText("R", this.R.x + 10, this.R.y);
    static.fillText("C", this.C.x + 10, this.C.y);
    static.fillText("Q", this.Q.x - 11, this.Q.y);
    static.fillText("RS", this.S.x + 30, this.C.y);
    static.lineWidth = 0.3;
    static.beginPath();
    static.moveTo(this.S.x + 18, this.S.y - 20);
    static.lineTo(this.S.x + 18, this.R.y + 20);
    static.moveTo(this.Q.x - 18, this.R.y + 20);
    static.lineTo(this.Q.x - 18, this.S.y - 20);
    static.moveTo(this.Q.x - 18, this.R.y - 20);
    static.closePath();
    static.stroke();
    this.S.visible = true; this.S.draw();
    this.R.visible = true; this.R.draw();
    this.C.visible = true; this.C.draw();
    this.Q.visible = true; this.Q.draw();
}

BTRIdraw = function () {
    if (this.oen.state in Z) dynamic.strokeStyle = colorTrue;
    else dynamic.strokeStyle = (this.oen.state) ? colorTrue : colorFalse;
    dynamic.beginPath();
    dynamic.lineWidth = 4;
    dynamic.moveTo(this.oen.x, this.oen.y);
    dynamic.lineTo(this.inp.x + 15, this.inp.y + 10);
    dynamic.closePath();
    dynamic.stroke();
    
    dynamic.beginPath();
    dynamic.lineWidth = 2;
    dynamic.strokeStyle = '#000';
    dynamic.moveTo(this.inp.x, this.inp.y);
    dynamic.lineTo(this.inp.x, this.inp.y - 16);
    dynamic.lineTo(this.inp.x + 30, this.inp.y);
    dynamic.lineTo(this.inp.x, this.inp.y + 16);
    dynamic.lineTo(this.inp.x, this.inp.y);
    dynamic.closePath();
    dynamic.fillStyle = "#fff";
    dynamic.fill();
    dynamic.stroke();
    
    dynamic.moveTo(this.inp.x + 15, this.inp.y + 10);
    dynamic.arc(this.inp.x + 15, this.inp.y + 10, 5, 0, Math.PI * 2, true);
    dynamic.stroke();
    
    if (this.oen.state in Z) dynamic.fillStyle = colorTrue;
    else dynamic.fillStyle = (!this.oen.state) ? colorTrue : colorFalse;
    dynamic.beginPath();
    dynamic.arc(this.inp.x + 15, this.inp.y + 10, 4, 0, Math.PI * 2, true);
    dynamic.closePath();
    dynamic.fill();
    this.inp.visible = true; this.inp.draw();
    this.out.visible = true; this.out.draw();        
    this.oen.visible = true; this.oen.draw();   
}

function clear(canv) {
    canv.clearRect(0, 0, canv.canvas.width, canv.canvas.height);
}
