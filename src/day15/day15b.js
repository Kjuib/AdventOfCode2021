import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let lowest = new Map();
lowest.set('score', 99999999999)

function step(current, nodes, history) {
    if (!current || history.get(current.key)) {
        return;
    }

    const newHistory = new Map(history);
    newHistory.set(current.key, true);
    newHistory.set('score', history.get('score') + current.value);

    if (current.lowest > newHistory.get('score')) {
        current.lowest = newHistory.get('score');
    } else {
        // we got here faster before
        return;
    }

    // if (newHistory.get('score') > lowest.get('score')) {
    // shortcut (saved progress)
    if (newHistory.get('score') > lowest.get('score') || newHistory.get('score') > 2820) {
        return;
    } else if (current.isTarget) {
        lowest = newHistory;
        console.log('FOUND', lowest.get('score'));
        return;
    }

    step(nodes.get(`${current.x},${current.y - 1}`), nodes, newHistory);
    step(nodes.get(`${current.x + 1},${current.y}`), nodes, newHistory);
    step(nodes.get(`${current.x},${current.y + 1}`), nodes, newHistory);
    step(nodes.get(`${current.x - 1},${current.y}`), nodes, newHistory);
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
    const last = nodes.get(`${(size * 5) - 1},${(size * 5) - 1}`);
    last.isTarget = true;
    console.log('last', last);

    const history = new Map();
    history.set('score', 0);
    step(first, nodes, history);

    console.log('lowest', lowest.get('score'));
    console.timeEnd();
}

main();
