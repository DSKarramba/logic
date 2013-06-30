var grid = document.getElementById('grid').getContext('2d');
grid.canvas.width = cts.canvas.width;
grid.canvas.height = cts.canvas.height;

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
