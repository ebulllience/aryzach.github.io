const base = require('./snake')
Object.getOwnPropertyNames(base).map(p => global[p] = base[p])


const RIGHT = { x: 1 , y: 0 };
const LEFT  = { x:-1 , y: 0 };
const UP    = { x: 0 , y:-1 };
const DOWN  = { x: 0 , y: 1 };

    
const initialState = () => ({
    snake: [{x: 3, y: 3},{x:2,y:3}],
    direction: RIGHT,
    food: { x: 3, y: 4},
    columns: 20,
    rows: 20 
})

let state = initialState(); 


const getX = c => Math.round(c * (canvas.width / state.columns)) 
const getY = r => Math.round(r * (canvas.width / state.rows   ))


const moveSnake = st => {
    const snk = [...(st.snake)];
    const head = snk[0];
    const direction = st.direction;
    if (!isEating(st)) {
        console.log('pop');
        console.log(st);
        snk.pop();
    } else {
        console.log(' no pop');
        console.log(st);
    }
    var p;
    p = addPts(head)(direction); 
    snk.unshift(p);
    return snk; 
}

const changeDirection = st => direction => {
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
    st.direction = newDir;
    return st;
}

const addPts = p1 => p2 => ({x: p1.x + p2.x, y: p1.y + p2.y})
const ptsEq  = p1 => p2 => ((p1.x == p2.x) && (p1.y == p2.y))

const isEating2 = st => {
    const h = st.snake[0];
    const d = st.direction;
    const f = st.food;
    //console.log(h,d,f);
    const v = ptsEq(addPts(h)(d))(f);
    //console.log(v);
    return v;
}

const isEating = st => ptsEq(st.snake[0])(st.food)
const isEating1 = st => ptsEq(st.snake[1])(st.food)

const randFood = st => {
    const food = ({ x: (Math.floor(Math.random() * st.rows)), y: (Math.floor(Math.random() * st.columns)) });
    return food;
}

const next = st => {
    const f = applyObj({
        snake: moveSnake, 
        direction: propertyId('direction'),
        //food: propertyId('food'),
        food: nextFood, 
        columns: propertyId('columns'),
        rows: propertyId('rows') 
    })(st);
    return f;
}

const nextFood = st => {
    if (isEating(st)) { 
        console.log('rand'); 
        console.log(st);
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
