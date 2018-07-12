var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var logicBlocks = [];
var lines = [];

// block = { id, currentX, currentY, width, height, isFlowL, rect, icon, flowL, flowR }
// line = { startPos, endPos }