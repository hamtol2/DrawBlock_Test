var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var logicBlocks = [];
var lines = [];

// block = { src, currentX, currentY, width, height, isFlowL, rect, icon, flowL, flowR, id }
// line = { start{ id, , end }
// state = { isDraggable : false, isDrawLine : false }
// area = { x : 0, y : 0, width : 0, height : 0 };