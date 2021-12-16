import * as util from '../util.js';
import _ from 'lodash';

// const input = 'input.test.txt';
const input = 'input.txt';

let lowest = new Map();
lowest.set('score', 9999999)

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
    if (newHistory.get('score') > lowest.get('score') || newHistory.get('score') > 891) {
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
    const nodes = new Map;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const key = `${x},${y}`;
            nodes.set(key, {
                key: key,
                x: x,
                y: y,
                value: ((y === 0) && (x === 0)) ? 0 : grid[y][x],
                lowest: 9999999,
                isTarget: ((y === grid.length - 1) && (x === grid[0].length - 1))
            });
        }
    }

    const history = new Map();
    history.set('score', 0);
    step(nodes.get('0,0'), nodes, history);

    console.log('lowest', lowest.get('score'));
    console.timeEnd();
}

main();
