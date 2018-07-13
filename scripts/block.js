function Block(id, currentX, currentY, width, height, flows, rect, icon) {
    this.id = id;
    this.currentX = currentX;
    this.currentY = currentY;
    this.width = width;
    this.height = height;
    this.flows = flows;
    this.rect = rect;
    this.icon = icon;
}

function addBlock(block) {
    logicBlocks.push(block);
}

function drawIcon(block, id) {
    if (block.icon === undefined) {
        block.icon = document.getElementById(id || block.id);

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

function drawBlock(block, id) {

    // Draw main icon image.
    drawIcon(block, id);

    // Draw flow control image.
    for (var key in block.flows) {
        drawFlow(block, key);
    }

    // Draw border.
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