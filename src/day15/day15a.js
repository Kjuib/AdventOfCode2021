import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let lowest = new Map();
lowest.set('score', 9999999)

function updateNode(current, xMod, yMod, nodes) {
    const nextNode = nodes.get(`${current.x + xMod},${current.y + yMod}`);
    if (!nextNode) {
        return;
    }
    const currentValue = nextNode.value + current.lowest;
    if (currentValue < nextNode.lowest) {
        nextNode.lowest = currentValue;
    }
}

function main() {
    console.time();
    const grid = util.loadInput(input, { split: '', isIntegers: true });
    const size = grid.length;
    const nodes = new Map;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const key = `${x},${y}`;
            nodes.set(key, {
                key: key,
                x: x,
                y: y,
                value: grid[y][x],
                lowest: 9999999,
                isTarget: ((y === grid.length - 1) && (x === grid[0].length - 1))
            });
        }
    }
    const first = nodes.get('0,0');
    first.value = 0;
    first.lowest = 0;
    const last = nodes.get(`${size - 1},${size - 1}`);
    last.isTarget = true;

    for (let i = 0; i < 10; i++) {
        nodes.forEach( (node) => {
            updateNode(node,  0, -1, nodes);
            updateNode(node,  1,  0, nodes);
            updateNode(node,  0,  1, nodes);
            updateNode(node, -1,  0, nodes);
        });
        console.log('last', last);
    }

    console.timeEnd();
}

main();
