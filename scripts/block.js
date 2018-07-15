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
        isDrawLine : false
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

function setDrawLineState(block) {
    block.state.isDrawLine = true;
    block.state.isDrawLine = !block.state.isDraggable;

    console.log('setDrawLineState: ' + block.id + ' : ' + block.flows[0].id);
}

function setAllNotDraggble(blocks) {
    for (var ix in blocks) {
        blocks[ix].state.isDraggable = blocks[ix].state.isDrawLine = false;
    }
}

function checkIfDraggable(blocks, mouseX, mouseY) {
    for (var ix in blocks) {
        // if (mouseX >= (blocks[ix].currentX - blocks[ix].width / 2) && 
        //     mouseX <= (blocks[ix].currentX + blocks[ix].width / 2) && 
        //     mouseY >= (blocks[ix].currentY - blocks[ix].height / 2) && 
        //     mouseY <= (blocks[ix].currentY + blocks[ix].height / 2)) {
        //         setDraggable(blocks[ix]);
        // }
        if (pointInBlock(blocks[ix], mouseX, mouseY) === true) {
            setDraggable(blocks[ix]);
            break;
        }
        else if (pointInFlow(blocks[ix], mouseX, mouseY).state === true) {
            setDrawLineState(blocks[ix]);
            break;
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
        //console.log('width: ' + block.flows[key].element.width + ' ,height: ' + block.flows[key].element.height);
        if (mouseX >= (block.currentX + (block.width / 2 - block.flows[key].element.width / 2)) &&
            mouseX >= (block.currentX + (block.width / 2 + block.flows[key].element.width / 2)) &&
            mouseY >= (block.currentY - (block.flows[key].element.height / 2 - block.flows[key].element.height / 2)) &&
            mouseY >= (block.currentY + (block.flows[key].element.height / 2 + block.flows[key].element.height / 2))) {
                return { state : true, flow : block.flows[key] };
        }

        // if (block.flows[key].id === 'flowL' || block.flows[key].id === 'flowR') {
        //     ret = { state : true, flow : block.flows[key] };
        //     break;
        // }
    }

    return { state : false, flow : undefined };

    // if (ret.state === false)
    //     return { state : false, flow : undefined };

    // posX = block.currentX + (block.width / 2);
    // posY = block.currentY - (block.flows[key].element.height / 2);
    // if (mouseX >= (block.currentX + (block.width / 2) - (block.flows[key].element.width / 2)) &&
    //     mouseX >= (block.currentX + (block.width / 2) + (block.flows[key].element.width / 2)) &&
    //     mouseY >= (block.currentY - (block.flows[key].element.height / 2) - (block.flows[key].element.height / 2)) &&
    //     mouseY >= (block.currentY - (block.flows[key].element.height / 2) + (block.flows[key].element.height / 2))) {
    //         return { state : true, flow : block.flows[key] };
    // } else {
    //     return { state : false, flow : undefined };
    // }
}

function repaint(blocks) {
    for (var ix in blocks) {
        drawBlock(blocks[ix]);
    }
}

function checkShouldRepaint(blocks) {

    for (var ix in blocks) {
        if (blocks[ix].state.isDraggable === true) 
            return { shouldPaint : true, block : blocks[ix] };
        // if (blocks[ix].idDrawLine === true)
        //     return { shouldDrawLine : true, block : blocks[ix] };
    }

    return { shouldPaint : false, block : undefined };
}