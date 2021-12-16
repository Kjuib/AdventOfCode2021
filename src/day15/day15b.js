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
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {

            for (let y2 = 0; y2 < 5; y2++) {
                for (let x2 = 0; x2 < 5; x2++) {
                    const newX = x + (x2 * size);
                    const newY = y + (y2 * size);
                    const key = `${newX},${newY}`;
                    let value = grid[y][x] + x2 + y2;
                    if (value > 9) {
                        value = value - 9;
                    }
                    nodes.set(key, {
                        key: key,
                        x: newX,
                        y: newY,
                        value: value,
                        lowest: 9999999999999,
                        isTarget: false
                    });
                }
            }
        }
    }
    const first = nodes.get('0,0');
    first.value = 0;
    first.lowest = 0;
    const last = nodes.get(`${(size * 5) - 1},${(size * 5) - 1}`);
    last.isTarget = true;

    for (let i = 0; i < 30; i++) {
        nodes.forEach((node) => {
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
