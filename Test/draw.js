(function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var context = canvas.getContext('2d');
  
      // Quadratric curves example
      context.beginPath();
      context.moveTo(50, 50);
      context.bezierCurveTo(100, 100, 0, 150, 50, 200);
      context.stroke();
    }
})();