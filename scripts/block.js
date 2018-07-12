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

function drawBlock(block, id) {

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

    for (var key in block.flows) {
        if (block.flows[key].id === 'flowL') {
            if (block.flows[key].element === undefined) {
                block.flows[key].element = document.getElementById('flowR');

                if (window.navigator.userAgent.indexOf('Edge') > -1) {
                    context.drawImage(block.flows[key].element, block.currentX - (block.width / 2) - block.flows[key].element.width, block.currentY - block.flows[key].element.height / 2);        
                } else {
                    block.flows[key].element.addEventListener('load', function() {
                        context.drawImage(block.flows[key].element, block.currentX - (block.width / 2) - block.flows[key].element.width, block.currentY - block.flows[key].element.height / 2);        
                    }, false);
                }
            } else {
                context.drawImage(block.flows[key].element, block.currentX - (block.width / 2) - block.flows[key].element.width, block.currentY - block.flows[key].element.height / 2);
            }
            
        } else if (block.flows[key].id === 'flowR') {
            if (block.flows[key].element === undefined) {
                block.flows[key].element = document.getElementById('flowR');

                if (window.navigator.userAgent.indexOf('Edge') > -1) {
                    context.drawImage(block.flows[key].element, block.currentX + (block.width / 2), block.currentY - block.flows[key].element.height / 2);
                } else {
                    block.flows[key].element.addEventListener('load', function() {
                        context.drawImage(block.flows[key].element, block.currentX + (block.width / 2), block.currentY - block.flows[key].element.height / 2);
                    }, false);
                }
            } else {
                context.drawImage(block.flows[key].element, block.currentX + (block.width / 2), block.currentY - block.flows[key].element.height / 2);
            }
            
            
        } else {
            console.log('flow control draw error: ' + key);
        }
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