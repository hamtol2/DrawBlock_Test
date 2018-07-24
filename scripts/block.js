function Block(src, currentX, currentY, width, height, flows, rect, icon, id) {
    this.src = src;
    this.id = id;
    this.currentX = currentX;
    this.currentY = currentY;
    this.width = width;
    this.height = height;
    this.flows = flows;
    this.rect = rect;
    this.icon = icon;
    this.state = {
        isDraggable : false,
        isDrawLine : false,
        drawInfo : undefined
    };
}

function addBlock(block) {
    block.id = logicBlocks.length;
    logicBlocks.push(block);
}

function drawIcon(block, src) {
    if (block.icon === undefined) {
        block.icon = document.getElementById(src || block.src);

        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));
        } else {
            block.icon.addEventListener('load', function() {
                context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));
            }, false);
        }
    } else {
        context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));
    }
}

function drawFlowL(block, key) {
    var posX;
    var posY;

    if (block.flows[key].element === undefined) {
        block.flows[key].element = document.getElementById('flowR');

        posX = block.currentX - (block.width / 2) - block.flows[key].element.width;
        posY = block.currentY - block.flows[key].element.height / 2;

        if (window.navigator.userAgent.indexOf('Edge') > -1) {
            context.drawImage(block.flows[key].element, posX, posY);
        } else {
            block.flows[key].element.addEventListener('load', function() {
                posX = block.currentX - (block.width / 2) - block.flows[key].element.width;
                posY = block.currentY - block.flows[key].element.height / 2;

                context.drawImage(block.flows[key].element, posX, posY);
            }, false);
        }
    } else {

        posX = block.currentX - (block.width / 2) - block.flows[key].element.width;
        posY = block.currentY - block.flows[key].element.height / 2;

        context.drawImage(block.flows[key].element, posX, posY);
    }
}

function drawFlowR(block, key) {
    
    var posX;
    var posY;

    if (block.flows[key].element === undefined) {
        block.flows[key].element = document.getElementById('flowR');

        posX = block.currentX + (block.width / 2);
        posY = block.currentY - (block.flows[key].element.height / 2);

        if (window.navigator.userAgent.indexOf('Edge') > -1) {
            context.drawImage(block.flows[key].element, posX, posY);
        } else {
            block.flows[key].element.addEventListener('load', function() {

                posX = block.currentX + (block.width / 2);
                posY = block.currentY - (block.flows[key].element.height / 2);

                context.drawImage(block.flows[key].element, posX, posY);
            }, false);
        }
    } else {

        posX = block.currentX + (block.width / 2);
        posY = block.currentY - (block.flows[key].element.height / 2);

        context.drawImage(block.flows[key].element, posX, posY);
    }
}

function drawFlow(block, key) {

    if (block.flows[key].id === 'flowL') {
        drawFlowL(block, key);
    } else if (block.flows[key].id === 'flowR') {
        drawFlowR(block, key);
    } else {
        console.log('flow control draw error: ' + key);
    }
}

function drawBlock(block, src) {

    // Draw main icon image.
    drawIcon(block, src);

    // Draw flow control image.
    for (var key in block.flows) {
        drawFlow(block, key);
    }

    // Draw border.
    block.rect = new Path2D();
    block.rect.rect(block.currentX - (block.width / 2), block.currentY - (block.height / 2), block.width, block.height);
    context.fillText('id: ' + block.id, block.currentX, block.currentY + (block.height / 3));
    context.stroke(block.rect);
}

function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function setDraggable(block) {
    //block.isDraggable = true;
    block.state.isDraggable = true;
    block.state.isDrawLine = !block.state.isDraggable;
}

function setDrawLineState(block, drawInfo) {
    block.state.isDrawLine = true;
    block.state.drawInfo = drawInfo;
    block.state.isDraggable = !block.state.isDrawLine;
}

function setAllNotDraggble(blocks) {
    for (var ix in blocks) {
        blocks[ix].state.isDraggable = blocks[ix].state.isDrawLine = false;
    }
}

function checkIfDraggable(blocks, mouseX, mouseY) {
    for (var ix in blocks) {
        
        var poinstInBlockResult = pointInBlock(blocks[ix], mouseX, mouseY);
        var pointInFlowResult = pointInFlow(blocks[ix], mouseX, mouseY);

        if (poinstInBlockResult === true) {
            setDraggable(blocks[ix]);
        } else if (pointInFlowResult.state === true) {
            setDrawLineState(blocks[ix], pointInFlowResult);
        }
    }
}

function pointInBlock(block, mouseX, mouseY) {
    if (mouseX >= (block.currentX - block.width / 2) && 
        mouseX <= (block.currentX + block.width / 2) && 
        mouseY >= (block.currentY - block.height / 2) && 
        mouseY <= (block.currentY + block.height / 2)) {
        return true;
    } else {
        return false;
    }
}

function pointInFlow(block, mouseX, mouseY) {

    for (var key in block.flows) {
        if (block.flows[key].id === 'flowR' && 
            mouseX >= (block.currentX + (block.width / 2)) &&
            mouseX <= (block.currentX + (block.width / 2 + block.flows[key].element.width)) &&
            mouseY >= (block.currentY - (block.flows[key].element.height / 2)) &&
            mouseY <= (block.currentY + (block.flows[key].element.height / 2))) {

                return { 
                    state : true, 
                    flow : block.flows[key], 
                    startPos : {
                        x : (block.currentX + (block.width / 2 + block.flows[key].element.width / 2)),
                        y : block.currentY
                    }
                };

        } else if (block.flows !== undefined && block.flows[key] !== undefined && block.flows[key].id === 'flowL' && 
            mouseX >= (block.currentX - (block.width / 2 + block.flows[key].element.width)) &&
            mouseX <= (block.currentX - block.width /2) &&
            mouseY >= (block.currentY - (block.flows[key].element.height / 2)) &&
            mouseY <= (block.currentY + (block.flows[key].element.height / 2))) {

                return { 
                    state : true, 
                    flow : block.flows[key],
                    startPos : {
                        x : (block.currentX - (block.width / 2 + block.flows[key].element.width/2)),
                        y : block.currentY
                    } 
                };
        }
    }

    return { state : false, flow : undefined };
}

function repaint(blocks) {
    for (var ix in blocks) {
        drawBlock(blocks[ix]);
    }
}

function drawLine(startPos, endPos) {
    // context.bezierCurveTo(100, 100, 0, 150, 50, 200);

    context.beginPath();
    context.moveTo(startPos.x, startPos.y);
    context.lineTo(endPos.x, endPos.y);
    context.stroke();
}

function checkShouldRepaint(blocks) {

    for (var ix in blocks) {
        if (blocks[ix].state.isDraggable === true) 
            return { shouldPaint : true, block : blocks[ix] };
        else if (blocks[ix].state.isDrawLine === true) {
            return { shouldDrawLine : true, block : blocks[ix] };
        }
    }

    return { shouldPaint : false, block : undefined };
}