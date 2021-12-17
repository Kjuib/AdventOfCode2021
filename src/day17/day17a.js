import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let maxHeight = 0;

function step(target, state) {
    let xVelNew = state.xVel;
    if (xVelNew > 0) {
        xVelNew--;
    } else if (xVelNew < 0) {
        xVelNew++;
    }

    const newState = {
        x: state.x + state.xVel,
        y: state.y + state.yVel,
        xVel: xVelNew,
        yVel: state.yVel - 1
    };

    if (state.x >= target.x1 && state.x <= target.x2 && state.y >= target.y1 && state.y <= target.y2) {
        newState.status = 'HIT';
    } else if ((state.x > target.x2) || (state.y < target.y2 && state.yVel < 0)) {
        newState.status = 'MISS';
    }
    return newState;
}

function fire(target, xVel, yVel) {

    const initState = { x: 0, y: 0, xVel: xVel, yVel: yVel };
    let state = _.cloneDeep(initState);
    let localMaxHeight = 0;
    while (!state.status) {
        state = step(target, state);
        if (state.y > localMaxHeight) {
            localMaxHeight = state.y;
        }
    }

    if (state.status === 'HIT') {
        maxHeight = localMaxHeight;
    }
    // console.log('state', state);
}

function main() {
    const inputLine = util.loadInput(input)[0];
    let [ ignore, x1, x2, y1, y2 ] = /x=(-?\d+)\.\.(-?\d+).*y=(-?\d+)\.\.(-?\d+)/.exec(inputLine);
    const target = {
        x1: _.parseInt(x1),
        x2: _.parseInt(x2),
        y1: _.parseInt(y1),
        y2: _.parseInt(y2),
    };

    for (let yVel = -500; yVel < 500; yVel++) {
        for (let xVel = 0; xVel < 1000; xVel++) {
            fire(target, xVel, yVel);
        }
    }

    console.log('maxHeight', maxHeight);
}

main();
