
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.style = 'border:10px solid red';

const clearCanvas = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


const drawPart = color => part => {
    ctx.fillStyle = color; 
    ctx.fillRect(getX(part.x), getY(part.y), getX(1), getX(1));
}

const drawSnake = parts => color => {
    parts.forEach(drawPart(color));
}

const drawScreen = () => {
    clearCanvas();
    drawPart('red')(state.food);
    const snakeA = state.snakes[0].parts;
    const snakeB = state.snakes[1].parts;
    drawSnake(snakeA)('black');
    drawSnake(snakeB)('green');
}


const step = t0 => t1 => {
    if ((t1 - t0) > 40) {
        state = next(state);
        drawScreen();
        window.requestAnimationFrame(step(t1));
    } else {
        window.requestAnimationFrame(step(t0));
    }
}

window.requestAnimationFrame(step(0));

window.addEventListener('keydown', event => {
    switch(event.key) {
        case 'ArrowUp':    state = changeDirection(state)(UP)(0); break
        case 'ArrowDown':  state = changeDirection(state)(DOWN)(0); break
        case 'ArrowLeft':  state = changeDirection(state)(LEFT)(0); break
        case 'ArrowRight': state = changeDirection(state)(RIGHT)(0); break
        case 'w':          state = changeDirection(state)(UP)(1); break
        case 's':          state = changeDirection(state)(DOWN)(1); break
        case 'a':          state = changeDirection(state)(LEFT)(1); break
        case 'd':          state = changeDirection(state)(RIGHT)(1); break

    }
})


