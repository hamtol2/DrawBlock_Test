function Block(id, currentX, currentY, width, height, isFlowL, isFlowR, rect, icon, flowL, flowR) {
    this.id = id;
    this.currentX = currentX;
    this.currentY = currentY;
    this.width = width;
    this.height = height;
    this.isFlowL = isFlowL === undefined ? false : isFlowL;
    this.isFlowR = isFlowR === undefined ? true : isFlowR;
    this.rect = rect;
    this.icon = icon;
    this.flowL = flowL;
    this.flowR = flowR;
}

function addBlock(block) {
    logicBlocks.push(block);
}

function drawBlock(block, id) {

    if (block.icon === undefined) {
        block.icon = document.getElementById(id || block.id);
        
        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));    
        }

        block.icon.addEventListener('load', function() {
            context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));
        }, false);
    } else {
        context.drawImage(block.icon, block.currentX - (block.icon.width / 2), block.currentY - (block.icon.height / 2));
    }

    // Draw flow Right.
    if (block.isFlowR === true) {
        if (block.flowR === undefined) {
            block.flowR = document.getElementById('flowR');

            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                context.drawImage(block.flowR, block.currentX + (block.width / 2), block.currentY - 5);
            }
    
            block.flowR.addEventListener('load', function() {
                context.drawImage(block.flowR, block.currentX + (block.width / 2), block.currentY - 5);
            }, false);
        } else {
            context.drawImage(block.flowR, block.currentX + (block.width / 2), block.currentY - 5);
        }
    }

    // testing..
    if (block.isFlowL === true) {
        if (block.flowL === undefined) {
            block.flowL = document.getElementById('flowR');

            if (window.navigator.userAgent.indexOf("Edge") > -1) {
                context.drawImage(block.flowL, block.currentX - (block.width / 2) - block.flowL.width, block.currentY - 5);
            }

            block.flowL.addEventListener('load', function() {
                context.drawImage(block.flowL, block.currentX - (block.width / 2) - block.flowL.width, block.currentY - 5);
            }, false);
        } else {
            context.drawImage(block.flowL, block.currentX - (block.width / 2) - block.flowL.width, block.currentY - 5);
        }
    }

    // Draw Rectangle.
    block.rect = new Path2D();
    block.rect.rect(block.currentX - (block.width / 2), block.currentY - (block.height / 2), block.width, block.height);
    context.stroke(block.rect);
}

function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function setDraggable(block) {
    block.isDraggable = true;
}

function setAllNotDraggble(blocks) {
    for (var ix in blocks) {
        blocks[ix].isDraggable = false;
    }
}

function checkIfDraggable(blocks, mouseX, mouseY) {
    for (var ix in blocks) {
        if (mouseX >= (blocks[ix].currentX - blocks[ix].width / 2) && 
            mouseX <= (blocks[ix].currentX + blocks[ix].width / 2) && 
            mouseY >= (blocks[ix].currentY - blocks[ix].height / 2) && 
            mouseY <= (blocks[ix].currentY + blocks[ix].height / 2)) {
                setDraggable(blocks[ix]);
        }
    }
}

function repaint(blocks) {
    for (var ix in blocks) {
        drawBlock(blocks[ix]);
    }
}

function checkShouldRepaint(blocks) {

    for (var ix in blocks) {
        if (blocks[ix].isDraggable === true) 
            return { shouldPaint : true, block : blocks[ix] };
        // if (blocks[ix].idDrawLine === true)
        //     return { shouldDrawLine : true, block : blocks[ix] };
    }

    return { shouldPaint : false, block : undefined };
}