var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gravity = 10;

var blocks = []; // Create an empty array to store the blocks

var colors = [];
colors.push('red');
colors.push('blue');
colors.push('green');
colors.push('yellow');
colors.push('white');
colors.push('purple');
colors.push('orange');
colors.push('pink');
colors.push('brown');
colors.push('cyan');
const blockSize = 50; // Tamaño de cada bloque
const blocksPerRow = Math.floor(canvas.width / blockSize); // Cantidad de bloques por fila
const numberOfRows = Math.floor(canvas.height / blockSize); // Cantidad de filas que caben en el canvas
const maxBlocks= 50; // Cantidad máxima de bloques en pantalla

class block {
    constructor(x, y, width = 50, height = 50, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width-2, this.height-2);
        
            // Set text color to white
            ctx.fillStyle = 'white';
            // Set font size and family
            ctx.font = '14px Arial';
            // Calculate text width to center it
            const textWidth = ctx.measureText(this.color).width;
            // Calculate the x and y position to center the text in the block
            const textX = this.x + (this.width - textWidth) / 2;
            const textY = this.y + this.height / 2 + 7; // Adjust 7 to align text vertically centered
            // Draw the text
            ctx.fillText(this.color, textX, textY);
        
    }
}





function animate() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //random block at top
    if (Math.random() < 0.05) { // Example: 5% chance per frame to spawn a new block
        // Choose a random column for the new block
        const column = Math.floor(Math.random() * blocksPerRow);
        const x = column * blockSize; // Calculate the x position based on the chosen column

        // Create a new block at the top of the chosen column with a random color
        const colorIndex = Math.floor(Math.random() * colors.length);
        blocks.push(new block(x, 0, blockSize, blockSize, colors[colorIndex]));
    }
    
    blocks.forEach(block => {
        block.draw();
    });
    blocks.forEach(block => {
        block.y += gravity;
        
        if (block.y + block.height > canvas.height) {
            block.y = canvas.height - block.height;
        }
        if (block.x + block.width > canvas.width) {
            block.x = canvas.width - block.width;
        }
        //block collision with themselves
        blocks.forEach(block2 => {
            if (block === block2) return;
            if (block.x < block2.x + block2.width &&
                block.x + block.width > block2.x &&
                block.y < block2.y + block2.height &&
                block.y + block.height > block2.y) {
                block.y = block2.y - block.height;
            }
        });
    });

    if (blocks.length > maxBlocks) {
        blocks.splice(0, blocks.length - maxBlocks);
    }
}

function loop() {
    animate();
    setTimeout(loop, 16); // Delay of 16 milliseconds (approximately 60 frames per second)
}


loop();

