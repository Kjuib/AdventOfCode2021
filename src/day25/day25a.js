import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

function moveEast(grid) {
    const newGrid = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            let currentStr = `[${y}][${x}]`;
            let nextStr = `[${y}][${x+1}]`;

            if (_.has(newGrid, currentStr)) {
                continue;
            }

            const current = _.get(grid, currentStr);
            let next = _.get(grid, nextStr);
            if (_.isNil(next)) {
                nextStr = `[${y}][0]`;
                next = _.get(grid, nextStr);
            }

            if (current === '>' && next === '.') {
                _.set(newGrid, currentStr, '.');
                _.set(newGrid, nextStr, '>');
            } else {
                _.set(newGrid, currentStr, current);
            }
        }
    }

    return newGrid;
}

function moveSouth(grid) {
    const newGrid = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            let currentStr = `[${y}][${x}]`;
            let nextStr = `[${y+1}][${x}]`;

            if (_.get(newGrid, currentStr)) {
                continue;
            }

            const current = _.get(grid, currentStr);
            let next = _.get(grid, nextStr);
            if (_.isNil(next)) {
                nextStr = `[0][${x}]`;
                next = _.get(grid, nextStr);
            }

            if (current === 'v' && next === '.') {
                _.set(newGrid, currentStr, '.');
                _.set(newGrid, nextStr, 'v');
            } else {
                _.set(newGrid, currentStr, current);
            }
        }
    }

    return newGrid;
}


function main() {
    console.time();
    let grid = util.loadInput(input, { split: '' });
    let current = _.flattenDeep(grid).join('');
    let next = null;
    let count = 0;

    while (current !== next) {
        current = next;
        count++;
        grid = moveEast(grid);
        grid = moveSouth(grid);
        next = _.flattenDeep(grid).join('');
    }

    console.log('count', count);

    console.timeEnd();
}

main();
