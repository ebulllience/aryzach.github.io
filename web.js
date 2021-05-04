
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

const drawSnake = snk => {
    snk.forEach(drawPart('black'));
}

const drawScreen = () => {
    clearCanvas();
    drawPart('red')(state.food);
    drawSnake(state.snake);
}


const step = t0 => t1 => {
    if ((t1 - t0) > 100) {
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
        case 'ArrowUp':    state = changeDirection(state)(UP); break
        case 'ArrowDown':  state = changeDirection(state)(DOWN); break
        case 'ArrowLeft':  state = changeDirection(state)(LEFT); break
        case 'ArrowRight': state = changeDirection(state)(RIGHT); break
    }
})


