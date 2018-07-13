// main.
(function start() {
    
    // set block and array.
    addBlock(new Block('eventIcon', 60, 60, 60, 60, [ { id : 'flowR' } ]));
    addBlock(new Block('hearingIcon', 60, 60 * 2, 60, 60, [ { id : 'flowR' }, { id : 'flowL'} ]));
    addBlock(new Block('ifIcon', 60, 60 * 3, 60, 60, [ { id : 'flowR' }, { id : 'flowL'} ]));
    addBlock(new Block('moduleIcon', 60, 60 * 4, 60, 60, [ { id : 'flowR' }]));
    addBlock(new Block('sayIcon', 60, 60 * 5, 60, 60, [ { id : 'flowL' }]));
    
    // first draw.
    repaint(logicBlocks);

    // mouse event binding.
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
    canvas.onmouseout = onMouseUp;
    canvas.onmousemove = onMouseMove;
    
})();