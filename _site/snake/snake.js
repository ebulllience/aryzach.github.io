const base = require('./snake')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])


const RIGHT = { x: 1 , y: 0 };
const LEFT  = { x:-1 , y: 0 };
const UP    = { x: 0 , y:-1 };
const DOWN  = { x: 0 , y: 1 };

const initialSnakeA = {direction: RIGHT, parts: [{x: 4, y: 4},{x:3,y:4}]}
const initialSnakeB = {direction: LEFT,  parts: [{x: 2, y: 2},{x:1,y:2}]}

    
const initialState = () => ({
    snakes: [initialSnakeA, initialSnakeB], 
    food: { x: 3, y: 4},
    columns: 40,
    rows: 40 
})

let state = initialState(); 


const getX = c => Math.round(c * (canvas.height / state.columns)) 
const getY = r => Math.round(r * (canvas.height/ state.rows))

// state => [snake]
const moveSnakes = st => st.snakes.map(s => moveSnake(s)(st.rows)(st.columns)(st.food));

// snake => snake
const moveSnake = snk => r => c => food => {
    const parts = snk.parts
    const head = parts[0];
    console.log(head,food);
    const direction = snk.direction;
    if (!isEating(parts)(food)) {
        parts.pop();
    }; 
    var p = addPts(head)(direction); 
    parts.unshift(p);
    return {direction : snk.direction, parts : wrapSnake(parts)(r)(c)}; 
}

// parts, r, c => parts 
const wrapSnake = snk => r => c => {
    return snk.map(p => wrapPoint(p)(r)(c));
}

// point, row, col => point
const wrapPoint = p => r => c => {
    return {x: adjCoord(p.x)(r), y: adjCoord(p.y)(c)};
}
        

const adjCoord = coord => max => {
    if (coord >= max) {
        return 0;
    } else if (coord < 0) {
        return max;
    } else {
        return coord;
    }
}

const changeDirection = st => direction => num => {
    let curDir = st.direction;
    let newDir = st.direction;
    if (direction == LEFT && curDir != RIGHT) {
        newDir = LEFT;
    };
    if (direction == RIGHT && curDir != LEFT) {
        newDir = RIGHT;
    };
    if (direction == DOWN && curDir != UP) {
        newDir = DOWN;
    };
    if (direction == UP && curDir != DOWN) {
        newDir = UP;
    };
    st.snakes[num].direction = newDir;
    return st;
}

const addPts = p1 => p2 => ({x: p1.x + p2.x, y: p1.y + p2.y})
const ptsEq  = p1 => p2 => ((p1.x == p2.x) && (p1.y == p2.y))


const isEating = parts => food => ptsEq(parts[0])(food)

const randFood = st => {
    const food = ({ x: (Math.floor(Math.random() * st.rows)), y: (Math.floor(Math.random() * st.columns)) });
    return food;
}

const next = st => {
    const f = applyObj({
        snakes: moveSnakes, 
        //direction: propertyId('direction'),
        //directionB: propertyId('direction'),
        food: nextFood, 
        columns: propertyId('columns'),
        rows: propertyId('rows') 
    })(st);
    return f;
}

const nextFood = st => {
    if (st.snakes.some(s => isEating(s.parts)(st.food))) { 
        return randFood(st);  
    } else {
        return st.food;
    }
}

const propertyId = p => obj => obj[p] 

const applyObj = funcObj => obj => Object.keys(funcObj).map(k => ({ [k] : (funcObj[k])(obj) }) ).reduce((acc,o) => Object.assign(acc,o))

const testState = {
    snake: [{x: 3, y: 3},{x:2,y:3}],
    direction: RIGHT,
    food: { x: 4, y: 3},
    columns: 20,
    rows: 20 
}

   
module.exports = { RIGHT, LEFT, UP, DOWN, initialState, next, state, testState}
